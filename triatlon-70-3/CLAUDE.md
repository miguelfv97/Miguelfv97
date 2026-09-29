# Proyecto: preparación Ironman 70.3 Valencia 2027

Sistema para diseñar, programar y revisar el entrenamiento de un triatlón de
media distancia usando Claude Code. El agente **propone**; el atleta **decide
y ejecuta** en la app de COROS.

## Modo de operación (decidido el 2026-09-18/29, actualizado 2026-09-29)

- **Escritura en COROS: manual, sin cambios.** COROS tiene un MCP oficial
  (endpoint europeo `https://mcpeu.coros.com/mcp` desde el 2026-09-29, ver `.mcp.json` en la raíz del repo) con
  autenticación OAuth, pero su función de "elaborar planes de
  entrenamiento" (crear/programar sesiones) sigue marcada como
  **"próximamente"** en la propia app de COROS a fecha 2026-09-29 — no
  está activa todavía. Hasta que lo esté, Claude entrega cada semana una
  tabla de sesiones (fecha, disciplina, objetivo, duración/estructura) y
  el atleta las crea a mano en la app o web de COROS.
- **Lectura de datos**: el MCP oficial de COROS (`.mcp.json`) ya tiene
  lectura activa (actividades, sueño, HRV, FC en reposo, evaluación de
  forma/carga) vía OAuth — más seguro que la API no oficial porque nunca
  se comparte email/contraseña. Requiere que el atleta autorice el acceso
  la primera vez que una sesión intente usarlo (flujo OAuth en el
  navegador). El repo también tiene un script de solo lectura
  (`scripts/coros-analysis.js`, API no oficial, **no validado aún**) como
  alternativa si el MCP oficial no estuviera disponible.
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
