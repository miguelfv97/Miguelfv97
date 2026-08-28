# Biwenger daily analysis

Script que consulta la API no oficial de Biwenger y genera un analisis diario
de la liga (clasificacion y mercado).

## Configuracion

En el entorno de Claude Code on the web, define estas variables de entorno:

- `BIWENGER_EMAIL`: email de la cuenta de Biwenger.
- `BIWENGER_PASSWORD`: contraseña de la cuenta de Biwenger.
- `BIWENGER_LEAGUE_ID` (opcional): id de la liga a analizar, si la cuenta
  pertenece a varias. Si no se indica, se usa la primera liga con mercado
  activo (`marketMode` distinto de `fantasy`); si ninguna lo tiene, la primera
  de la cuenta.
- `BIWENGER_WATCHED_PLAYERS` (opcional): lista separada por comas de jugadores
  a vigilar en el mercado de agentes libres (por defecto `Mbappé,Bellingham`).
  El script avisa si alguno aparece disponible ese dia.
- `BIWENGER_SIGNINGS_WINDOW_HOURS` (opcional, por defecto `26`): ventana en
  horas para el resumen de fichajes recientes de todos los managers (el
  mercado rota cada 24h, asi que el margen extra absorbe el jitter de a que
  hora se ejecuta el script cada dia).
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

El script tambien muestra el saldo actual de la cuenta (avisando si esta en
negativo, lo que en muchas ligas hace que no puntues la jornada), una seccion
de vigilancia para los jugadores en `BIWENGER_WATCHED_PLAYERS`, y un resumen
de los fichajes recientes de **todos** los managers de la liga (no solo el
usuario). Biwenger no tiene un endpoint de "movimientos"/historial de
transferencias, asi que esto se aproxima recorriendo la plantilla de cada
manager (`/user/{id}`, funciona para cualquiera) y usando la fecha de compra
(`owner.date`) de cada jugador para detectar altas dentro de la ventana de
`BIWENGER_SIGNINGS_WINDOW_HOURS`.

Este script es de solo lectura: consulta clasificacion, mercado y saldo, pero
nunca puja, ficha, vende ni cambia la alineacion.
