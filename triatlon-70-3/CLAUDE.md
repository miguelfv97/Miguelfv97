# Proyecto: preparación Ironman 70.3 Valencia 2027

Sistema para diseñar, programar y revisar el entrenamiento de un triatlón de
media distancia usando Claude Code. El agente **propone**; el atleta **decide
y ejecuta** en la app de COROS.

## Modo de operación (decidido el 2026-09-18/29, actualizado 2026-09-30)

- **Conector de COROS: activo y confirmado (2026-09-30).** El atleta lo
  conectó en https://claude.ai/customize/connectors (nivel de cuenta,
  OAuth, todos los permisos). Nunca se ha compartido usuario/contraseña
  en el chat ni en ningún fichero — ver `atleta/zonas-y-metricas.md` para
  el historial completo de cómo se llegó hasta aquí (incluye un bug real
  de COROS con el endpoint genérico `mcp.coros.com`, resuelto apuntando
  `.mcp.json` a `https://mcpeu.coros.com/mcp`).
- **Lectura**: en uso activo — actividades y su detalle, splits, carga de
  entreno, FC en reposo, HRV de sueño, recuperación, evaluación de forma
  (VO2max, ritmo umbral). Esta es ahora la fuente preferente sobre lo que
  el atleta reporte a mano, salvo para lo que COROS no puede saber
  (fatiga percibida, molestias, contexto). El script antiguo
  (`scripts/coros-analysis.js`, API no oficial) queda obsoleto como
  alternativa, ya no hace falta.
- **Escritura en COROS: sigue siendo manual, por decisión explícita del
  atleta — aunque el conector SÍ expone herramientas de escritura**
  (crear/editar entrenos sueltos, programar en el calendario, crear
  planes completos con fases) — más de lo que mostraba la app como
  "próximamente" cuando se miró por última vez. **No se usa ninguna sin
  que el atleta lo apruebe explícitamente primero**, sesión a sesión.
  Claude sigue entregando cada semana una tabla de sesiones (fecha,
  disciplina, objetivo, duración/estructura) para que el atleta las cree
  a mano, salvo que decida lo contrario.
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
8. `rutinas/fuerza.md`, `rutinas/sesiones-triatlon.md` y
   `rutinas/tecnica-ejercicios.md` (rutinas de gimnasio, biblioteca de
   sesiones tipo con ritmos/potencias reales, y cómo ejecutar cada
   ejercicio de fuerza)

Todos estos ficheros están vacíos/con plantilla a fecha de creación de este
proyecto. No inventar valores: si un dato falta, preguntar antes de asumirlo.

## Principios

1. Planifica por fases: base, construcción, pico y taper, con la fecha de
   carrera como ancla.
2. Mantén la especificidad de un 70.3: natación, bicicleta, carrera, fuerza y
   transiciones/brick.
3. Antes de subir carga, revisa tendencia de carga, sueño, HRV, FC en reposo,
   recuperación y cumplimiento reciente — desde el 2026-09-30 estos datos se
   pueden consultar directamente en COROS (ver más arriba); el cumplimiento
   real y el contexto (fatiga, molestias) los sigue aportando el atleta en
   `plan/revisiones-semanales.md`.
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
