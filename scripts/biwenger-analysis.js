#!/usr/bin/env node
// Analisis diario de una liga de Biwenger.
// Requiere BIWENGER_EMAIL y BIWENGER_PASSWORD como variables de entorno.
// Opcional: BIWENGER_LEAGUE_ID para elegir liga si la cuenta tiene varias.
// Opcional: BIWENGER_DEBUG=1 para volcar las respuestas JSON crudas.

import { ProxyAgent, setGlobalDispatcher } from "undici";

// Node's built-in fetch no respeta HTTPS_PROXY salvo con NODE_USE_ENV_PROXY=1
// al arrancar el proceso; como no siempre podemos controlar como se invoca el
// script (p.ej. desde una Routine), forzamos el dispatcher explicitamente.
const PROXY_URL = process.env.HTTPS_PROXY || process.env.https_proxy;
if (PROXY_URL) setGlobalDispatcher(new ProxyAgent(PROXY_URL));

const API = "https://biwenger.as.com/api/v2";

const EMAIL = process.env.BIWENGER_EMAIL;
const PASSWORD = process.env.BIWENGER_PASSWORD;
const LEAGUE_ID = process.env.BIWENGER_LEAGUE_ID;
const DEBUG = process.env.BIWENGER_DEBUG === "1";
const WATCHED_PLAYERS = (process.env.BIWENGER_WATCHED_PLAYERS || "Mbappé,Bellingham")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
// El mercado rota cada 24h; una ventana algo mayor absorbe el jitter de cuando
// se ejecuta el script cada dia sin dejar de capturar los fichajes del ultimo ciclo.
const SIGNINGS_WINDOW_HOURS = Number(process.env.BIWENGER_SIGNINGS_WINDOW_HOURS || 26);

if (!EMAIL || !PASSWORD) {
  console.error(
    "Faltan credenciales: define BIWENGER_EMAIL y BIWENGER_PASSWORD como variables de entorno."
  );
  process.exit(1);
}

function debugDump(label, data) {
  if (DEBUG) {
    console.error(`\n--- DEBUG ${label} ---`);
    console.error(JSON.stringify(data, null, 2));
  }
}

async function apiFetch(path, { token, leagueId, userId, method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (leagueId) headers["X-League"] = leagueId;
  if (userId) headers["X-User"] = userId;

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${method} ${path} -> HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

async function login() {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: { email: EMAIL, password: PASSWORD },
  });
  debugDump("login", data);
  const token = data.token ?? data.data?.token;
  if (!token) throw new Error("Login sin token en la respuesta de Biwenger.");
  return token;
}

async function getAccount(token) {
  const data = await apiFetch("/account", { token });
  debugDump("account", data);
  return data.data ?? data;
}

async function getLeague(token, leagueId, userId) {
  const data = await apiFetch("/league?fields=*,standings,group", {
    token,
    leagueId,
    userId,
  });
  debugDump("league", data);
  return data.data ?? data;
}

async function getMarket(token, leagueId, userId) {
  try {
    const data = await apiFetch("/market", { token, leagueId, userId });
    debugDump("market", data);
    return data.data ?? data;
  } catch (err) {
    console.error(`(no se pudo obtener el mercado: ${err.message})`);
    return null;
  }
}

// Biwenger no incluye el nombre del jugador en /market ni /league, solo su id;
// hay que resolverlo aparte contra el listado de jugadores de la competicion.
async function getPlayersMap(token, leagueSummary) {
  const competition = leagueSummary.competition;
  const slug = typeof competition === "string" ? competition : competition?.slug;
  if (!slug) return {};
  try {
    const data = await apiFetch(`/competitions/${slug}/data?lang=es&score=${leagueSummary.scoreID}`, { token });
    debugDump("players", data);
    return data.data?.players ?? {};
  } catch (err) {
    console.error(`(no se pudieron resolver los nombres de jugadores: ${err.message})`);
    return {};
  }
}

// El tablon de la liga (/league/{id}/board) es la unica fuente de un
// historial de movimientos real. Cada item de un evento "transfer" con
// "from" y "to" trae un campo "type": si es "clause" fue una clausula
// ejecutada unilateralmente; si no tiene "type" es un traspaso pactado
// directamente entre managers (raro, requiere acuerdo mutuo). Un "transfer"
// con solo "from" es una venta instantanea al sistema (50% del valor). Un
// evento "market" es un fichaje del mercado de agentes libres.
async function getRecentMoves(token, leagueId, leagueUserId, playersMap, hoursWindow) {
  const cutoff = Date.now() / 1000 - hoursWindow * 3600;
  let board;
  try {
    const data = await apiFetch(`/league/${leagueId}/board?limit=200&offset=0`, {
      token,
      leagueId,
      userId: leagueUserId,
    });
    board = (data.data ?? data) || [];
  } catch (err) {
    console.error(`(no se pudo consultar el tablon de la liga: ${err.message})`);
    return [];
  }

  const moves = [];
  for (const event of board) {
    if (event.date < cutoff) continue;
    if (event.type === "market") {
      for (const item of event.content) {
        moves.push({
          date: event.date,
          manager: item.to.name,
          action: "fichaje libre",
          player: playersMap[item.player]?.name ?? `jugador #${item.player}`,
          price: item.amount,
        });
      }
    } else if (event.type === "transfer") {
      for (const item of event.content) {
        const player = playersMap[item.player]?.name ?? `jugador #${item.player}`;
        if (item.to) {
          const action = item.type === "clause" ? "clausula ejecutada a" : "traspaso pactado con";
          moves.push({
            date: event.date,
            manager: item.to.name,
            action,
            counterpart: item.from.name,
            player,
            price: item.amount,
          });
        } else {
          moves.push({
            date: event.date,
            manager: item.from.name,
            action: "venta instantanea",
            player,
            price: item.amount,
          });
        }
      }
    }
  }
  return moves.sort((a, b) => b.date - a.date);
}

function formatRecentMoves(moves, hoursWindow) {
  if (moves.length === 0) {
    return `Sin movimientos detectados en las ultimas ${hoursWindow}h.`;
  }
  return moves
    .map(({ manager, action, counterpart, player, price, date }) => {
      const hoursAgo = ((Date.now() / 1000 - date) / 3600).toFixed(1);
      const counterpartStr = counterpart ? ` ${counterpart}` : "";
      return `- ${manager}: ${action}${counterpartStr} - ${player} por ${formatPrice(price)} (hace ${hoursAgo}h)`;
    })
    .join("\n");
}

function pickLeague(account) {
  const leagues = account.leagues ?? [];
  if (leagues.length === 0) throw new Error("La cuenta no tiene ligas.");
  if (LEAGUE_ID) {
    const found = leagues.find((l) => String(l.id) === String(LEAGUE_ID));
    if (!found) throw new Error(`No se encontro la liga con id ${LEAGUE_ID}.`);
    return found;
  }
  // Por defecto, la liga con mercado activo (marketMode "normal") es la
  // relevante; las ligas "fantasy" no tienen mercado ni interesan aqui.
  return leagues.find((l) => l.marketMode !== "fantasy") ?? leagues[0];
}

function normalize(str) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function formatPrice(price) {
  return typeof price === "number" ? price.toLocaleString("es-ES") : String(price ?? "?");
}

function formatBalance(market) {
  const balance = market?.status?.balance;
  if (typeof balance !== "number") return null;
  const warning = balance < 0 ? " -- SALDO NEGATIVO: no puntuas la jornada entera si sigue asi." : "";
  return `Saldo actual: ${formatPrice(balance)} €${warning}`;
}

function findWatchedInMarket(sales, playersMap) {
  const normalizedWatch = WATCHED_PLAYERS.map(normalize);
  return sales
    .map((sale) => ({ sale, name: playersMap[sale.player?.id]?.name }))
    .filter(({ name }) => name && normalizedWatch.some((w) => normalize(name).includes(w)));
}

function formatStandings(league, leagueUserId) {
  const standings = league.standings ?? [];
  const sorted = [...standings].sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
  const lines = sorted.map((entry, i) => {
    const name = entry.name ?? "?";
    const points = entry.points ?? 0;
    const isMe = String(entry.id) === String(leagueUserId);
    const marker = isMe ? " <- tu" : "";
    return `${i + 1}. ${name} - ${points} pts${marker}`;
  });
  return lines.join("\n");
}

function formatMarket(market, playersMap) {
  if (!market) return "Sin datos de mercado disponibles.";
  const sales = market.sales ?? [];
  if (sales.length === 0) return "No hay jugadores en el mercado ahora mismo.";
  const lines = sales.slice(0, 10).map((sale) => {
    const player = playersMap[sale.player?.id]?.name ?? `jugador #${sale.player?.id ?? "?"}`;
    const seller = sale.user?.name ?? "mercado (agente libre)";
    return `- ${player}: ${formatPrice(sale.price)} (${seller})`;
  });
  return lines.join("\n");
}

async function main() {
  const token = await login();
  const accountData = await getAccount(token);
  const leagueSummary = pickLeague(accountData);
  const leagueUserId = leagueSummary.user.id;
  const league = await getLeague(token, leagueSummary.id, leagueUserId);
  const market = await getMarket(token, leagueSummary.id, leagueUserId);
  const playersMap = await getPlayersMap(token, leagueSummary);

  console.log(`\n=== Analisis diario - ${leagueSummary.name} ===`);
  console.log(`Fecha: ${new Date().toLocaleString("es-ES")}\n`);

  console.log("Clasificacion:");
  console.log(formatStandings(league, leagueUserId));

  console.log("\nMercado (top 10):");
  console.log(formatMarket(market, playersMap));

  if (market) {
    const balanceLine = formatBalance(market);
    if (balanceLine) console.log(`\n${balanceLine}`);

    const watched = findWatchedInMarket(market.sales ?? [], playersMap);
    console.log(`\nVigilancia (${WATCHED_PLAYERS.join(", ")}):`);
    console.log(
      watched.length
        ? watched.map(({ name, sale }) => `- ¡${name} disponible! Precio: ${formatPrice(sale.price)}`).join("\n")
        : "Ninguno de los jugadores vigilados esta en el mercado ahora mismo."
    );
  }

  const moves = await getRecentMoves(token, leagueSummary.id, leagueUserId, playersMap, SIGNINGS_WINDOW_HOURS);
  console.log(`\nMovimientos recientes (ultimas ${SIGNINGS_WINDOW_HOURS}h, todos los managers):`);
  console.log(formatRecentMoves(moves, SIGNINGS_WINDOW_HOURS));
}

main().catch((err) => {
  console.error("Error ejecutando el analisis:", err.message);
  process.exit(1);
});
