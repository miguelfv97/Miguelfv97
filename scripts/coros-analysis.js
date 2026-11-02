import { CorosApi, STSConfigs } from "@nyt87/crs-connect";

const email = process.env.COROS_EMAIL;
const password = process.env.COROS_PASSWORD;
const region = (process.env.COROS_REGION || "EU").toUpperCase();
const activitiesCount = Number(process.env.COROS_ACTIVITIES_COUNT || 10);
const debug = process.env.COROS_DEBUG === "1";

if (!email || !password) {
  console.error(
    "Faltan COROS_EMAIL y/o COROS_PASSWORD en las variables de entorno."
  );
  process.exit(1);
}

const regionConfig = STSConfigs[region] ?? STSConfigs.EU;

function dump(label, data) {
  if (debug) {
    console.error(`\n--- DEBUG ${label} ---`);
    console.error(JSON.stringify(data, null, 2));
  }
}

async function main() {
  const coros = new CorosApi({ email, password });
  coros.config({ stsConfig: regionConfig });

  await coros.login(email, password);

  const account = await coros.getAccount().catch((err) => {
    console.error("No se pudo obtener la cuenta:", err.message);
    return null;
  });
  dump("account", account);

  if (account) {
    const name = account.name ?? account.nickname ?? account.userName ?? "desconocido";
    console.log(`Cuenta conectada: ${name}`);
  }

  const activitiesResponse = await coros.getActivitiesList({
    page: 1,
    size: activitiesCount,
  });
  dump("activitiesList", activitiesResponse);

  const activities =
    activitiesResponse?.dataList ??
    activitiesResponse?.data ??
    activitiesResponse?.list ??
    (Array.isArray(activitiesResponse) ? activitiesResponse : []);

  if (!activities.length) {
    console.log("No se encontraron actividades recientes.");
    return;
  }

  console.log(`\nUltimas ${activities.length} actividades:\n`);

  let totalDistance = 0;
  let totalDuration = 0;

  for (const activity of activities) {
    const name =
      activity.name ?? activity.sportName ?? activity.sportType ?? "Actividad";
    const date = activity.date ?? activity.startTime ?? activity.startDate ?? "";
    const distanceMeters = Number(activity.distance ?? activity.totalDistance ?? 0);
    const durationSeconds = Number(activity.duration ?? activity.totalTime ?? 0);

    totalDistance += distanceMeters;
    totalDuration += durationSeconds;

    const distanceKm = (distanceMeters / 1000).toFixed(2);
    const durationMin = (durationSeconds / 60).toFixed(0);

    console.log(`- [${date}] ${name}: ${distanceKm} km, ${durationMin} min`);
  }

  console.log(
    `\nTotal: ${(totalDistance / 1000).toFixed(2)} km, ${(totalDuration / 60).toFixed(
      0
    )} min en ${activities.length} actividades.`
  );
}

main().catch((err) => {
  console.error("Error ejecutando el analisis de Coros:", err);
  process.exit(1);
});
