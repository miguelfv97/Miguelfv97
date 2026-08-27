import fs from "fs";
const entries = JSON.parse(fs.readFileSync("/tmp/claude-0/-home-user-Miguelfv97/97fe8956-6e00-5dc4-906c-1fde538d245c/scratchpad/all_entries.json", "utf8"));

const now = Date.now();
const myName = "Gordo Leónidas";

const mine = entries.filter(e => e.mgrName === myName);
const rivals = entries.filter(e => e.mgrName !== myName);

console.log("=== MI PLANTILLA ===");
for (const e of mine) {
  console.log(`${e.name} (${e.position}) - precio actual: ${e.seasonPrice} - clausula: ${e.clause} - bloqueada hasta: ${e.clauseLockedUntil ? new Date(e.clauseLockedUntil*1000).toISOString() : "no"} - puntos temporada: ${e.seasonPoints} - fitness: ${e.fitness}`);
}

console.log("\n=== RIVALES: jugadores con clausula DISPONIBLE (no bloqueada) ordenados por puntos desc ===");
const available = rivals.filter(e => {
  if (!e.clauseLockedUntil) return true;
  return e.clauseLockedUntil*1000 < now;
});
available.sort((a,b) => (b.seasonPoints||0) - (a.seasonPoints||0));
for (const e of available.slice(0, 60)) {
  console.log(`${e.name} (${e.position}, equipo ${e.teamID}) - manager: ${e.mgrName} - clausula: ${e.clause} - precio mercado: ${e.seasonPrice} - puntos temp: ${e.seasonPoints} - fitness: ${e.fitness}`);
}

console.log("\n=== RIVALES: jugadores BLOQUEADOS (no clausulables ahora) top por puntos ===");
const locked = rivals.filter(e => e.clauseLockedUntil && e.clauseLockedUntil*1000 >= now);
locked.sort((a,b) => (b.seasonPoints||0) - (a.seasonPoints||0));
for (const e of locked.slice(0, 30)) {
  console.log(`${e.name} (${e.position}) - manager: ${e.mgrName} - clausula: ${e.clause} - bloqueada hasta: ${new Date(e.clauseLockedUntil*1000).toISOString()} - puntos temp: ${e.seasonPoints}`);
}
