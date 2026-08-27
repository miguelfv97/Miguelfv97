#!/usr/bin/env node
// Analisis diario de una liga de Biwenger.
// Requiere BIWENGER_EMAIL y BIWENGER_PASSWORD como variables de entorno.
// Opcional: BIWENGER_LEAGUE_ID para elegir liga si la cuenta tiene varias.
// Opcional: BIWENGER_DEBUG=1 para volcar las respuestas JSON crudas.

const API = "https://biwenger.as.com/api/v2";

const EMAIL = process.env.BIWENGER_EMAIL;
const PASSWORD = process.env.BIWENGER_PASSWORD;
const LEAGUE_ID = process.env.BIWENGER_LEAGUE_ID;
const DEBUG = process.env.BIWENGER_DEBUG === "1";

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

function pickLeague(account) {
  const leagues = account.leagues ?? [];
  if (leagues.length === 0) throw new Error("La cuenta no tiene ligas.");
  if (LEAGUE_ID) {
    const found = leagues.find((l) => String(l.id) === String(LEAGUE_ID));
    if (!found) throw new Error(`No se encontro la liga con id ${LEAGUE_ID}.`);
    return found;
  }
  return leagues[0];
}

function formatStandings(league, accountUserId) {
  const standings = league.standings ?? [];
  const sorted = [...standings].sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
  const lines = sorted.map((entry, i) => {
    const name = entry.name ?? entry.user?.name ?? "?";
    const points = entry.points ?? 0;
    const teamValue = entry.teamValue ?? entry.value ?? null;
    const isMe = String(entry.id ?? entry.user?.id) === String(accountUserId);
    const marker = isMe ? " <- tu" : "";
    const valueStr = teamValue ? `, valor equipo: ${teamValue.toLocaleString("es-ES")}` : "";
    return `${i + 1}. ${name} - ${points} pts${valueStr}${marker}`;
  });
  return lines.join("\n");
}

function formatMarket(market) {
  if (!market) return "Sin datos de mercado disponibles.";
  const sales = market.sales ?? [];
  if (sales.length === 0) return "No hay jugadores en el mercado ahora mismo.";
  const lines = sales.slice(0, 10).map((sale) => {
    const player = sale.player?.name ?? sale.name ?? "?";
    const price = sale.price ?? sale.value ?? "?";
    const seller = sale.user?.name ?? sale.from?.name ?? "mercado";
    return `- ${player}: ${price} (vendedor: ${seller})`;
  });
  return lines.join("\n");
}

async function main() {
  const token = await login();
  const account = await getAccount(token);
  const leagueSummary = pickLeague(account);
  const league = await getLeague(token, leagueSummary.id, account.id);
  const market = await getMarket(token, leagueSummary.id, account.id);

  console.log(`\n=== Analisis diario - ${leagueSummary.name} ===`);
  console.log(`Fecha: ${new Date().toLocaleString("es-ES")}\n`);

  console.log("Clasificacion:");
  console.log(formatStandings(league, account.id));

  console.log("\nMercado (top 10):");
  console.log(formatMarket(market));
}

main().catch((err) => {
  console.error("Error ejecutando el analisis:", err.message);
  process.exit(1);
});
