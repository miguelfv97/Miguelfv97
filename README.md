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
No ha sido probado todavia contra una cuenta real: la primera ejecucion en un
entorno con las variables configuradas puede requerir ajustes en el nombre de
los campos de las respuestas (usar `BIWENGER_DEBUG=1` para inspeccionarlas).
