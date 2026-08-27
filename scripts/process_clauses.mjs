import fs from "fs";
const raw = JSON.parse(fs.readFileSync("/tmp/claude-0/-home-user-Miguelfv97/97fe8956-6e00-5dc4-906c-1fde538d245c/scratchpad/clauses_out.json", "utf8"));
const { standings, players, rosters } = raw;

const myId = Object.entries(rosters).find(([id, r]) => true); // will filter later by name match
// find "tu" manager - we know from previous script "Gordo Leónidas" is user
const myManagerName = "Gordo Leónidas";

const now = Date.now();

const posMap = {1:"POR",2:"DEF",3:"MED",4:"DEL"};

const allEntries = [];
for (const [mgrId, roster] of Object.entries(rosters)) {
  for (const p of roster.players) {
    const info = players[p.id];
    if (!info) continue;
    const owner = p.owner || {};
    allEntries.push({
      mgrId,
      mgrName: roster.name,
      playerId: p.id,
      name: info.name,
      teamID: info.teamID,
      position: posMap[info.position] || info.position,
      seasonPoints: info.points,
      seasonPrice: info.price,
      fitness: info.fitness,
      clause: owner.clause,
      clauseLockedUntil: owner.clauseLockedUntil,
      ownerPrice: owner.price,
    });
  }
}

fs.writeFileSync("/tmp/claude-0/-home-user-Miguelfv97/97fe8956-6e00-5dc4-906c-1fde538d245c/scratchpad/all_entries.json", JSON.stringify(allEntries, null, 2));
console.log("Total entries:", allEntries.length);
console.log("Managers:", standings.map(s=>`${s.id}:${s.name}`).join(" | "));
