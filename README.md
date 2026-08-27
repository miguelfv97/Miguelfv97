# Biwenger daily analysis

Script que consulta la API no oficial de Biwenger y genera un analisis diario
de la liga (clasificacion y mercado).

## Configuracion

En el entorno de Claude Code on the web, define estas variables de entorno:

- `BIWENGER_EMAIL`: email de la cuenta de Biwenger.
- `BIWENGER_PASSWORD`: contraseña de la cuenta de Biwenger.
- `BIWENGER_LEAGUE_ID` (opcional): id de la liga a analizar, si la cuenta
  pertenece a varias. Si no se indica, se usa la primera liga de la cuenta.
- `BIWENGER_DEBUG=1` (opcional): vuelca las respuestas JSON crudas de la API
  para depurar.

## Uso

```
node scripts/biwenger-analysis.js
```

## Nota

Este script usa la API no oficial de Biwenger (`biwenger.as.com/api/v2`),
que no esta documentada publicamente por Biwenger y puede cambiar sin aviso.
Ya ha sido probado contra una cuenta real (login, clasificacion y mercado);
si Biwenger cambia el formato de sus respuestas en el futuro, usar
`BIWENGER_DEBUG=1` para inspeccionarlas y ajustar el parseo.

Los headers `X-League` y `X-User` que exige la API usan el id de liga y el id
de **manager dentro de esa liga** (el campo `user.id` de cada liga en
`/account`), no el id global de la cuenta.

El mercado solo esta disponible en ligas con `marketMode: "normal"`; las
ligas de tipo `fantasy` no tienen mercado y el script lo indica sin fallar.
