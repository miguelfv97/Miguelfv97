import fs from "fs";
const entries = JSON.parse(fs.readFileSync("/tmp/claude-0/-home-user-Miguelfv97/97fe8956-6e00-5dc4-906c-1fde538d245c/scratchpad/all_entries.json", "utf8"));
const raw = JSON.parse(fs.readFileSync("/tmp/claude-0/-home-user-Miguelfv97/97fe8956-6e00-5dc4-906c-1fde538d245c/scratchpad/clauses_out.json", "utf8"));
const playersFull = raw.players;

const myName = "Gordo Leónidas";
const rivals = entries.filter(e => e.mgrName !== myName);

const weekendCutoff = new Date("2026-09-01T00:00:00Z").getTime();

rivals.forEach(e => {
  const full = playersFull[e.playerId];
  e.fitness = full.fitness; // [home, away] recent per-match points
  e.pointsPerMillion = e.seasonPoints ? (e.seasonPoints / (e.clause/1e6)).toFixed(2) : "0";
  e.unlocksThisWeekend = e.clauseLockedUntil ? (e.clauseLockedUntil*1000 <= weekendCutoff) : true;
});

rivals.sort((a,b) => (b.seasonPoints||0) - (a.seasonPoints||0));

console.log("=== TODOS los rivales, jugadores que SE DESBLOQUEAN este fin de semana (hasta 31/08), ordenados por puntos ===");
for (const e of rivals.filter(e=>e.unlocksThisWeekend)) {
  console.log(`${e.name} | ${e.position} | eq:${e.teamID} | mgr:${e.mgrName} | clausula:${e.clause} | pts:${e.seasonPoints} | pts/M:${e.pointsPerMillion} | fitness(ult2):${JSON.stringify(e.fitness)} | desbloquea:${e.clauseLockedUntil ? new Date(e.clauseLockedUntil*1000).toISOString() : "YA"}`);
}
