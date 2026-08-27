import fs from "fs";
const raw = JSON.parse(fs.readFileSync("/tmp/claude-0/-home-user-Miguelfv97/97fe8956-6e00-5dc4-906c-1fde538d245c/scratchpad/clauses_out.json", "utf8"));
const { players } = raw;
const sample = players[Object.keys(players)[0]];
console.log(JSON.stringify(sample, null, 2));
// find Raphinha
const raphinha = Object.values(players).find(p => p.name === "Raphinha");
console.log("RAPHINHA:", JSON.stringify(raphinha, null, 2));
