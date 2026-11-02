# Coros: analisis de actividad reciente

Script que consulta la API no oficial de Coros Training Hub y genera un
resumen de tus ultimas actividades (nombre, fecha, distancia y duracion).

## Como se conecta con Coros

Coros no tiene un conector nativo en Claude Code ni un "login con Coros"
directo. Hay dos caminos posibles para hablar con sus datos:

1. **API oficial de partners (Coros Open Platform)**: requiere que una
   empresa/desarrollador solicite acceso formal (formulario de partner,
   OAuth2, revision de caso de uso por parte de Coros). No esta pensada
   para un usuario individual conectando su propia cuenta desde un script.
2. **API no oficial de Coros Training Hub** (la que usan la web
   `training.coros.com` y la app movil por debajo): no esta documentada
   publicamente, pero varios proyectos open source la han vuelto a
   implementar (igual que se hizo aqui con la API no oficial de Biwenger).
   Este proyecto usa la libreria npm `@nyt87/crs-connect` (MIT,
   https://github.com/jmn8718/coros-connect), que envuelve esa API: login
   con email/contraseña, listado de actividades, detalle de actividad,
   perfil, subida/descarga de archivos, etc.

Se ha optado por la opcion 2 por ser la unica viable para conectar tu
cuenta personal sin pasar por un proceso de partner de Coros.

## Configuracion

En el entorno de Claude Code on the web, define estas variables de entorno:

- `COROS_EMAIL`: email de tu cuenta de Coros.
- `COROS_PASSWORD`: contraseña de tu cuenta de Coros.
- `COROS_REGION` (opcional, por defecto `EU`): region de la cuenta
  (`EU`, `EN` o `CN`, segun donde este registrada la cuenta).
- `COROS_ACTIVITIES_COUNT` (opcional, por defecto `10`): numero de
  actividades recientes a mostrar.
- `COROS_DEBUG=1` (opcional): vuelca las respuestas JSON crudas de la API
  para depurar.

## Uso

```
npm install
node scripts/coros-analysis.js
```

## Nota importante

Este script usa una API no oficial de Coros que no esta documentada
publicamente y puede cambiar sin aviso. **Aun no se ha probado contra una
cuenta real** (a diferencia del script de Biwenger, que si se valido con
una cuenta), asi que la primera vez que lo ejecutes conviene correrlo con
`COROS_DEBUG=1` para comprobar que los nombres de campo (`name`,
`distance`, `duration`, etc.) coinciden con lo que devuelve tu cuenta, y
ajustar el parseo en `scripts/coros-analysis.js` si hace falta — igual que
se hizo con Biwenger tras las primeras pruebas reales.

Iniciar sesion con esta libreria puede cerrar tu sesion en la app movil de
Coros (comportamiento del propio backend no oficial, no de este script).

El script es de solo lectura: consulta cuenta y actividades, pero nunca
sube, borra ni modifica datos en Coros.

## Siguientes pasos posibles

Una vez validado el parseo con datos reales, se podria anadir (como se
hizo con `biwenger-scout` para Biwenger) un subagente especializado en
entrenamiento (carga, recuperacion, calendario de carreras) que use este
script como fuente de datos en vivo.
