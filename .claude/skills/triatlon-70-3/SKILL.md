---
name: triatlon-70-3
description: Planifica, revisa y ajusta la preparación del Ironman 70.3 de Valencia 2027 a partir del perfil del atleta y de los datos que este reporte (carga, sueño, HRV, FC en reposo, recuperación, cumplimiento). Nunca escribe en COROS: entrega tablas de sesiones para que el atleta las cree a mano.
---

# Skill: triatlon-70-3

Antes de proponer cualquier cambio, lee en este orden:
- `triatlon-70-3/atleta/perfil.md`
- `triatlon-70-3/atleta/objetivos.md`
- `triatlon-70-3/atleta/disponibilidad-semanal.md`
- `triatlon-70-3/atleta/zonas-y-metricas.md`
- `triatlon-70-3/atleta/historial-y-limitaciones.md`
- `triatlon-70-3/plan/plan-maestro.md`
- `triatlon-70-3/plan/semana-actual.md`

Si alguno de estos ficheros está vacío o incompleto para lo que se necesita,
pregunta al atleta en vez de asumir o inventar el dato.

## Modo de operación actual: escritura manual

No hay ningún MCP ni script con permiso de escritura sobre el calendario de
COROS conectado a este proyecto (decisión del atleta, 2026-09-29). Por tanto:

- Nunca digas que una sesión "se ha programado" o "se ha creado" en COROS.
  Lo único que puedes hacer es entregar una tabla propuesta.
- El formato de entrega de cada sesión/semana propuesta es siempre una tabla
  con columnas: fecha, disciplina, objetivo, duración/estructura. El atleta
  la usa para crear las sesiones a mano en la app o web de COROS.
- Los datos de carga, sueño, HRV, FC en reposo y recuperación los aporta el
  atleta (o, si en el futuro se valida `scripts/coros-analysis.js` contra su
  cuenta real, se podrá usar como fuente — actualizar esta Skill si eso
  cambia). No los descargues ni los inventes por tu cuenta.

## Principios

1. Diseña por fases: base, construcción, pico y taper, ancladas a la fecha
   real de la carrera (`atleta/objetivos.md`).
2. Mantén la especificidad de un 70.3: natación, bicicleta, carrera, fuerza
   y transiciones/brick.
3. Antes de subir carga, revisa tendencia de carga, sueño, HRV, FC en reposo,
   recuperación y cumplimiento reciente (`plan/revisiones-semanales.md`).
4. Natación: siempre como nota/evento con objetivo y estructura en texto, no
   como sesión "estructurada" nativa — ninguna vía disponible hoy lo soporta
   de forma equivalente a carrera/bici.
5. Si hay dolor, lesión, enfermedad, síntomas cardíacos, fatiga persistente o
   valores anómalos: no prescribas intensidad. Recomienda reducir/cancelar y
   consultar a un profesional adecuado.
6. No inventes métricas ni supongas objetivos de potencia, ritmo o frecuencia
   cardiaca no confirmados.
7. Tras cada revisión, añade una entrada a `atleta/registro-decisiones.md`
   con: qué cambió, por qué, y con qué datos se justificó.
8. Antes de dar por buena una semana como "cumplida", pregunta si las
   sesiones se crearon realmente en COROS — no lo asumas por haberlas
   propuesto.
