# Proyecto: preparación Ironman 70.3 Valencia 2027

Sistema para diseñar, programar y revisar el entrenamiento de un triatlón de
media distancia usando Claude Code. El agente **propone**; el atleta **decide
y ejecuta** en la app de COROS.

## Modo de operación (decidido el 2026-09-18/29)

- **Escritura en COROS: manual.** No hay ningún MCP ni script con permiso de
  escritura conectado. Claude entrega cada semana una tabla de sesiones
  (fecha, disciplina, objetivo, duración/estructura) y el atleta las crea a
  mano en la app o web de COROS. Cero credenciales de escritura, cero riesgo
  de que una API no oficial rompa el calendario.
- **Lectura de datos**: por ahora, manual (el atleta reporta cifras clave:
  carga, sueño, HRV, FC en reposo, cumplimiento). El repo ya tiene un script
  de solo lectura (`scripts/coros-analysis.js`, ver raíz del repo) que usa la
  API no oficial de COROS Training Hub; **no se ha validado aún contra una
  cuenta real**. Si en el futuro se valida y se decide usarlo como fuente
  automática, actualizar esta sección y `atleta/zonas-y-metricas.md`.
- Natación: siempre como nota/evento de calendario con objetivo y estructura
  en texto, nunca como sesión estructurada nativa (ninguna vía disponible hoy
  lo soporta).

## Antes de proponer cualquier cambio de entrenamiento

Lee, en este orden:
1. `atleta/perfil.md`
2. `atleta/objetivos.md`
3. `atleta/disponibilidad-semanal.md`
4. `atleta/zonas-y-metricas.md`
5. `atleta/historial-y-limitaciones.md`
6. `plan/plan-maestro.md`
7. `plan/semana-actual.md`
8. `rutinas/fuerza.md` y `rutinas/sesiones-triatlon.md` (rutinas de gimnasio
   y biblioteca de sesiones tipo — ambas propuestas, pendientes de
   confirmación del atleta a fecha de creación)

Todos estos ficheros están vacíos/con plantilla a fecha de creación de este
proyecto. No inventar valores: si un dato falta, preguntar antes de asumirlo.

## Principios

1. Planifica por fases: base, construcción, pico y taper, con la fecha de
   carrera como ancla.
2. Mantén la especificidad de un 70.3: natación, bicicleta, carrera, fuerza y
   transiciones/brick.
3. Antes de subir carga, revisa tendencia de carga, sueño, HRV, FC en reposo,
   recuperación y cumplimiento reciente — usando los datos que el atleta
   aporte en `plan/revisiones-semanales.md`.
4. Nunca asumas que una sesión se ha programado en COROS: solo se considera
   "programada" cuando el atleta confirma que la creó manualmente.
5. Si hay dolor, lesión, enfermedad, síntomas cardíacos, fatiga persistente o
   valores anómalos: no prescribas intensidad. Recomienda reducir/cancelar y
   consultar a un profesional adecuado.
6. No inventes métricas ni supongas objetivos de potencia, ritmo o frecuencia
   cardiaca no confirmados por el atleta.
7. Tras cada revisión, registra en `atleta/registro-decisiones.md`: qué
   cambió, por qué, y en qué fecha.

Ver también la Skill `.claude/skills/triatlon-70-3/SKILL.md` (mismas reglas,
formato invocable).
