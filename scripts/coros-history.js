import { CorosApi, STSConfigs } from "@nyt87/crs-connect";
import { writeFileSync } from "node:fs";

const email = process.env.COROS_EMAIL;
const password = process.env.COROS_PASSWORD;
const region = (process.env.COROS_REGION || "EU").toUpperCase();
const pageSize = Number(process.env.COROS_PAGE_SIZE || 50);
const outputPath = process.env.COROS_HISTORY_OUTPUT || "coros-history.json";
const debug = process.env.COROS_DEBUG === "1";

if (!email || !password) {
  console.error(
    "Faltan COROS_EMAIL y/o COROS_PASSWORD en las variables de entorno."
  );
  process.exit(1);
}

const regionConfig = STSConfigs[region] ?? STSConfigs.EU;

const SPORT_TYPE_LABELS = {
  100: "Carrera",
  101: "Carrera (interior)",
  102: "Trail running",
  103: "Carrera en pista",
  104: "Senderismo",
  200: "Ciclismo (carretera)",
  201: "Ciclismo (interior)",
  202: "Ciclismo (montaña)",
  299: "Ciclismo",
  300: "Natación (piscina)",
  301: "Natación (aguas abiertas)",
  400: "Cardio (gimnasio)",
  401: "Cardio (GPS)",
  402: "Fuerza",
  900: "Caminar",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const coros = new CorosApi({ email, password });
  coros.config({ stsConfig: regionConfig });

  await coros.login(email, password);

  const allActivities = [];
  let page = 1;
  let totalPage = 1;

  do {
    const response = await coros.getActivitiesList({ page, size: pageSize });
    totalPage = response?.totalPage ?? 1;
    const items = response?.dataList ?? [];
    allActivities.push(...items);

    if (debug) {
      console.error(`Pagina ${page}/${totalPage}: ${items.length} actividades`);
    }

    page += 1;
    if (page <= totalPage) {
      await sleep(300);
    }
  } while (page <= totalPage);

  writeFileSync(outputPath, JSON.stringify(allActivities, null, 2));

  const bySportType = {};
  let totalDistance = 0;
  let totalTime = 0;

  for (const activity of allActivities) {
    const sportType = activity.sportType ?? "desconocido";
    bySportType[sportType] = (bySportType[sportType] || 0) + 1;
    totalDistance += Number(activity.distance ?? 0);
    totalTime += Number(activity.totalTime ?? 0);
  }

  const dates = allActivities
    .map((a) => a.date)
    .filter(Boolean)
    .sort((a, b) => a - b);

  console.log(`\nTotal actividades descargadas: ${allActivities.length}`);
  console.log(`Guardadas en: ${outputPath}`);
  if (dates.length) {
    console.log(`Rango de fechas: ${dates[0]} - ${dates[dates.length - 1]}`);
  }
  console.log(`Distancia total: ${(totalDistance / 1000).toFixed(2)} km`);
  console.log(`Tiempo total: ${(totalTime / 3600).toFixed(1)} horas`);

  console.log("\nActividades por tipo:");
  const sorted = Object.entries(bySportType).sort((a, b) => b[1] - a[1]);
  for (const [sportType, count] of sorted) {
    const label = SPORT_TYPE_LABELS[sportType] ?? `sportType ${sportType}`;
    console.log(`  - ${label}: ${count}`);
  }
}

main().catch((err) => {
  console.error("Error obteniendo el historico de Coros:", err);
  process.exit(1);
});
