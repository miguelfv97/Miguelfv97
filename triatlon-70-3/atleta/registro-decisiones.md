# Registro de decisiones

> Un apunte por cada cambio relevante en el plan: qué cambió, por qué, y con
> qué datos se justificó. Orden cronológico, más reciente arriba.

## 2026-09-30 — Natación: se revierte la 3ª sesión, se prioriza calidad sobre frecuencia
- El atleta aclara el diagnóstico real: nunca ha hecho series ni estructura en el agua, siempre nadado continuo al ritmo que sale. No necesita más frecuencia, necesita calidad/estructura en las sesiones que ya tiene.
- Se revierte la sesión extra de natación del miércoles: `rutinas/fuerza.md` vuelve a la rutina completa de ese día (sin recortar), y se elimina la referencia a natación ahí.
- Investigación: estructura estándar de sesión de natación (calentamiento con técnica → serie principal específica → vuelta a la calma), USMS y 220 Triathlon; y cómo calcular y usar el CSS (Critical Swim Speed) para pasar de RPE a ritmos reales, TrainingPeaks y MyProCoach.
- Se reescribe la natación de `rutinas/sesiones-triatlon.md` (v3): martes pasa a ser el día aeróbico (series largas, 4x200m con poco descanso) y viernes el día de calidad/velocidad (series cortas, 8-10x50m con más descanso e intensidad) — un objetivo por sesión, no mezclados. Los 4 drills (catch-up, fingertip drag, 6-1-6, respiración bilateral) se integran en el calentamiento de cada sesión en vez de ser una sesión aparte.
- El test CSS pasa a ser prioritario (antes era "cuando quieras") porque ahora las series ya tienen sentido con ritmo real en vez de RPE.
- Se actualiza `plan-maestro.md`: natación vuelve a 2x/semana (martes, viernes), reformulado como "calidad, no frecuencia".

## 2026-09-30 — Check-in de las 6:30 actualizado para dar el entreno con detalle completo
- El atleta pide que la rutina diaria también detalle el entreno específico del día, no una descripción genérica.
- Se actualiza el trigger (trig_01Fmm3YvQ1hbSoGpiie7YxJX) para que, en el paso "qué toca hoy", saque la estructura exacta de `rutinas/sesiones-triatlon.md` (con ritmo/potencia real) y, si hay gimnasio, cada ejercicio con series/reps de `rutinas/fuerza.md` más el cue de ejecución de `rutinas/tecnica-ejercicios.md`. El objetivo: que el mensaje de las 6:30 se pueda ejecutar directamente sin tener que abrir los ficheros.

## 2026-09-30 — Técnica de ejercicios y sesiones con ritmos/potencias reales
- El atleta pide el detalle específico que faltaba: qué ejercicios, cómo hacerlos, series/reps, y sesiones concretas de triatlón, investigando con expertos.
- Investigación: técnica de sentadilla/peso muerto rumano/zancada búlgara/remo/dominadas/press (PowerliftingTechnique, TrainHeroic, Coachway, BarBend), ejecución de Y-T-W/rotación externa/dynamic hug para cuidado de hombro (NeckHump, ACE Fitness, E3 Rehab, HSS, Physitrack), sesiones de bici de 70.3 con potencia (Best Bike Split, Roadman Cycling), sesiones de carrera con ritmo (MyProCoach), drills de natación (THEMAGIC5, USMS).
- Se crea `rutinas/tecnica-ejercicios.md`: postura, ejecución y error más común de cada ejercicio de `rutinas/fuerza.md`, con fuentes.
- Se reescribe `rutinas/sesiones-triatlon.md` (v2): las sesiones de carrera y bici ya llevan ritmo/potencia real (usando las zonas confirmadas), se añaden sesiones nuevas (umbral específico de 70.3 en carrera y bici, fartlek progresivo, ritmo de carrera en bici al 70-78% FTP), y los drills de natación (catch-up, fingertip drag, 6-1-6, respiración bilateral) quedan explicados paso a paso en vez de solo nombrados.
- Natación sigue sin ritmo real — pendiente de un test CSS cuando el atleta quiera hacerlo.

## 2026-09-30 — Página de fases y check-in diario a las 6:30
- Se publica una página (Artifact) con las 5 fases del plan, semana tipo, ciclo de fin de semana y zonas de referencia: https://claude.ai/artifact/MWTK7WAevaquj7PuXn4WfL — generada a partir de `plan-maestro.md`, `rutinas/fuerza.md` y `rutinas/sesiones-triatlon.md`. Hay que regenerarla si esos ficheros cambian de forma relevante.
- Se crea una Routine diaria a las 6:30 hora de España (trig_01Fmm3YvQ1hbSoGpiie7YxJX, cron `30 4 * * *` UTC) que revisa lo entrenado el día anterior (vía COROS), da el entreno detallado del día, recomendaciones si hace falta, pregunta por sensaciones solo si hay una señal real, y un resumen de avance una vez al mes (no a diario). Vinculada a esta misma sesión para mantener contexto e historial.
- Se programan dos recordatorios propios para ajustar el cron cuando cambie la hora en España (25 oct 2026 y 28 mar 2027), para que el aviso siga cayendo a las 6:30 hora local y no se desincronice con el cambio de horario.

## 2026-09-30 — Periodización de fuerza por fases (v3)
- El atleta pide redistribuir el gimnasio apoyándose en expertos de entrenamiento para 70.3.
- Investigación: periodización de fuerza en triatlón (Triathlete, MyProCoach — la fuerza baja a mantenimiento cuando sube el volumen de resistencia, casi se para en el taper) y ciencia de entrenamiento concurrente/efecto de interferencia (Frontiers 2025, TrainingPeaks — fuerza antes que resistencia si van el mismo día para maximizar fuerza, aunque el efecto es menor de lo que se pensaba con sesiones ya separadas).
- Se liga la fuerza a las fases ya fijadas en `plan-maestro.md`: Base (2 nov–10 ene) mantiene las 3 sesiones/semana ya diseñadas (pico de volumen de fuerza de la temporada); Construcción (11 ene–7 mar) baja a 2 sesiones/semana (se funden lunes+miércoles); Pico (8 mar–4 abr) mínimo, 1 sesión corta/semana de mantenimiento; Taper (5 abr–18 abr) se para la carga.
- Se explica el orden fuerza→natación de martes (ya correcto según la ciencia) y se justifica por qué miércoles va natación primero (prioridad a la técnica, no a maximizar fuerza ese día, efecto de interferencia menor de lo esperado con sesiones separadas).
- `rutinas/fuerza.md` pasa a v3. Reparto semanal ya cerrado; la periodización por fases queda como propuesta pendiente de que el atleta la vea aplicada semana a semana y confirme que funciona.

## 2026-09-30 — Corrección: nadar antes de trabajar no es viable
- El atleta descarta la propuesta de natación antes de trabajar (lunes/miércoles 7-8h) — no es viable para él.
- Se pregunta directamente por huecos reales. Respuesta: puede recortar el gimnasio (normalmente 1h15) y meter una sesión rápida de natación un día de baloncesto, prefiriendo miércoles (llega menos cargado que el lunes).
- Se ajusta la frecuencia de natación de 4x a **3x/semana** (martes, miércoles, viernes). Se reescribe la rutina del miércoles en `rutinas/fuerza.md`: natación primero, gimnasio Rutina B recortado a ~45-50 min después (se quita volumen de bíceps/tríceps y el core opcional, se mantiene la rotación externa de hombro), baloncesto a las 22:00.
- Se actualiza la "semana tipo" de `plan-maestro.md`, que tenía referencias antiguas a nadar por la mañana, para que sea coherente con esto.

## 2026-09-30 — Plan por fases cerrado, recuperación post-maratón y checkpoint sub-6:30
- El atleta pide investigar con fuentes externas y fijar el plan por fases completo, con el objetivo del Ironman 70.3 Valencia y el objetivo secundario de bajar de 6:30h.
- Investigación: recuperación de maratón (McMillan Running, Brooks Running, Strength Running), estructura de fases de un 70.3 (búsqueda general de planes 20 semanas base/construcción/pico/taper), enfoque de limitador/disciplina más floja y regla 80/20 (TrainingPeaks).
- Se fijan fechas de fase: Transición post-maratón (3 oct–1 nov 2026), Base (2 nov–10 ene, 10 sem), Construcción (11 ene–7 mar, 8 sem, incluye el 21K de Murcia como control), Pico (8 mar–4 abr, 4 sem, incluye la ventana de aguas abiertas), Taper (5 abr–18 abr).
- Se escribe un plan de recuperación día a día para la semana post-maratón en `plan/semana-actual.md` (el atleta pidió una sesión de baja intensidad para el día después y dejó el resto a mi criterio) — nada de esto se sube a COROS sin confirmación.
- Se sube la frecuencia de natación de 1-2x a 4x/semana (lunes y miércoles por la mañana, más martes y viernes ya existentes) sin quitar tiempo a nada más, por ser el limitador claro tras 14 meses sin mejora de ritmo. Bici y carrera mantienen su estructura ya acordada.
- Se añade una estimación orientativa de tiempo total de carrera (≈6:36 con el nivel actual, ≈5:48 con mejora realista) para mostrar por qué la natación es la palanca más rentable para el sub-6:30 — marcada explícitamente como estimación, no promesa.
- Fuentes citadas en `plan-maestro.md`.

## 2026-09-30 — Correcciones de material y estacionalidad

## 2026-09-30 — Correcciones de material y estacionalidad
- Rodillo: es del gimnasio, sin conexión con COROS (por eso esas sesiones solo tienen FC/duración, nunca distancia/potencia). El atleta reporta los datos a mano cuando lo usa; más probable en invierno, siempre prioriza exterior. Corregido en `atleta/perfil.md` y `atleta/evolucion-coros.md`.
- Cinta: era su método inicial para series, ahora las hace en exterior siempre que puede; la cinta queda como alternativa de mal tiempo, no como sesión habitual. Corregido en los mismos ficheros.
- Aguas abiertas: de octubre a finales de marzo no hay mar abierto disponible, todo pasa a piscina. Deja una ventana corta (~3-4 semanas) antes del 18 de abril de 2027 para practicar en aguas abiertas — aviso añadido a `plan/plan-maestro.md` para tenerlo en cuenta al diseñar la fase de pico/taper.

## 2026-09-30 — Histórico completo de COROS leído (~14 meses) y corrección del triatlón de Blanca
- El atleta pide revisar toda la natación (piscina y aguas abiertas) y el histórico completo de todas las disciplinas (~14 meses de cuenta COROS) para tener su evolución completa.
- Se leen 65 sesiones de piscina + 1 de aguas abiertas, 100+ de carrera y 51 de bici desde julio de 2025. Resumen y lectura en `atleta/evolucion-coros.md` (nuevo fichero).
- **Corrección importante**: el atleta indica que la natación de "el triatlón de Blanca" fue en río, a favor de corriente, y ese tiempo no es esfuerzo real. Por coordenadas GPS, el registro de COROS que probablemente corresponde es el etiquetado "Murcia Triatlón" (18/07/2026) — coincide con el pueblo de Blanca casi al metro (no confirmado explícitamente por el atleta, alta confianza). Se marca esa natación (633m/6:04) como **inválida para referencia de esfuerzo** en `zonas-y-metricas.md` y `perfil.md`; bici y carrera de esa prueba se mantienen como válidas.
- Hallazgos nuevos no mencionados antes por el atleta: usa cinta de correr ("Cinta") con regularidad y tiene acceso a ciclismo indoor/rodillo (uso regular desde jul. 2025) — se añaden a `atleta/perfil.md`. Se resuelven los pendientes de `plan-maestro.md` sobre rodillo y zonas.
- Lectura clave de la evolución: la bici solo lleva volumen serio desde junio de 2026 (antes era indoor corto de mantenimiento) — mucho menos asentada que la carrera. La natación lleva 14 meses sin mejora de ritmo clara, refuerza la prioridad de técnica sobre volumen.

## 2026-09-30 — Conector de COROS activo: zonas confirmadas, datos reales leídos
- El atleta conecta COROS en https://claude.ai/customize/connectors (todos los permisos, OAuth). Se verifica con una llamada de solo lectura (`queryUserInfo`): perfil correcto (177cm/73kg/29 años), conector activo y autenticado.
- **Ritmo umbral de carrera confirmado**: `queryFitnessAssessmentOverview` de COROS devuelve 4:32/km, idéntico al de las capturas de pantalla — ya no es un valor provisional, es la evaluación en vivo de COROS (VO2max 58, Running Level 84).
- Se leen los splits reales de los dos triatlones sprint (Murcia 18/07: 1:13:04; Cullera 19/09: 1:28:27) — natación, bici y carrera desglosados, con FC. Lectura de mejora: bici más rápida (26.3→29.7 km/h) y menos FC máxima en carrera pese a ritmo similar entre julio y septiembre.
- Se leen FC en reposo, HRV de sueño, recuperación y carga de entreno de los últimos 7-14 días: todo normal, sin señales de alarma de cara al maratón del sábado 3 de octubre. Se añade un snapshot en `plan/revisiones-semanales.md`.
- **Importante**: el conector expone también herramientas de escritura (crear/editar/programar entrenos y planes completos) — más de lo que la app mostraba como "próximamente". No se ha usado ninguna. La escritura en COROS sigue siendo manual, solo cambiaría con aprobación explícita del atleta.
- Se actualizan `atleta/zonas-y-metricas.md`, `atleta/perfil.md`, `triatlon-70-3/CLAUDE.md` y `plan/revisiones-semanales.md` con los datos confirmados.

## 2026-09-29 — Cómo autorizar el MCP de COROS: vía conectores de claude.ai, no solo `.mcp.json`
- Se confirma la vía oficial para que una sesión de Claude Code en la nube (no interactiva) tenga el MCP de COROS ya autenticado: conectarlo en https://claude.ai/customize/connectors (a nivel de cuenta), y después abrir una sesión nueva — los conectores se leen al arrancar la sesión, no en caliente. Esto es más robusto que depender solo de `.mcp.json`, que sirvió para sortear el bug de endpoint regional pero no resuelve el paso de autorización interactiva por sí solo.
- Pendiente de que el atleta lo conecte ahí. En cuanto lo haga, se abre una sesión nueva para retomar el cálculo de zonas reales a partir de los dos triatlones sprint y entrenos recientes.

## 2026-09-29 — Primera sesión con `mcpeu.coros.com`: el error de recurso desaparece, falta la autorización OAuth (zonas siguen provisionales)
- Se buscan las herramientas de COROS antes de asumir nada. Resultado: el servidor `coros` **ya no da el error** `Protected resource ... does not match expected ...`. Ahora el cliente lo reporta como "requiere autenticación". Es decir, el cambio a `mcpeu` ha resuelto el desajuste de endpoint.
- Nuevo bloqueo: esta sesión es **no interactiva** (Claude Code en la nube) y no puede ejecutar el flujo OAuth en el navegador. No se ha expuesto ninguna herramienta de COROS, así que **no se ha podido comprobar** que la cuenta sea la del atleta (29 años, 73 kg, 177 cm) ni que la cuenta esté en la región EU. Tampoco hay ninguna señal de que no lo esté. No se reintenta en bucle.
- **Qué NO cambia**: no se ha leído ninguna actividad, así que no hay zonas calculadas ni respuesta sobre si 4'32"/km, 171 ppm y 180 W están al día. Siguen siendo la referencia **provisional** (fuente: capturas de la app). Tampoco hay ritmo de natación por 100 m. `.mcp.json` no se ha tocado.
- **Propuesta al atleta (no aplicada)**:
  1. Autorizar `mcpeu.coros.com` desde una sesión **interactiva** (Claude Code en local con `/mcp` → `coros` → autenticar, o desde los ajustes de conectores de claude.ai si se añade allí como conector) y repetir el análisis.
  2. Si tras autorizar no aparece la cuenta o no devuelve actividades → probar `https://mcpus.coros.com/mcp` (cuenta en región EE.UU.), con su aprobación previa.
  3. Alternativa sin esperar: exportar desde COROS (FIT/TCX) los dos triatlones sprint y 4-6 entrenos recientes (carrera, bici con potencia, natación) y subirlos al repo.
- Para natación, venga por donde venga el dato, lo que hace falta es un **test CSS** (400 m y 200 m a tope, con descanso completo entre ambos). Los largos continuos sin estructura no bastan para fijar un ritmo de referencia fiable.

## 2026-09-29 — `.mcp.json` apuntado al endpoint europeo de COROS
- El atleta aprueba la propuesta: `.mcp.json` pasa de `https://mcp.coros.com/mcp` a `https://mcpeu.coros.com/mcp` (endpoint regional europeo, coherente en sus metadatos OAuth).
- Motivo: el host genérico anuncia el recurso de EE.UU. y el cliente MCP lo rechaza siempre (ver entrada siguiente y `atleta/zonas-y-metricas.md`). La región EU es la más probable para una cuenta creada en España, pero no está confirmada.
- Pendiente de verificar en la próxima sesión nueva (el MCP solo se carga al arrancar): si conecta, puede pedir repetir la autorización OAuth. Si falla o no devuelve datos de la cuenta, probar `mcpus.coros.com` o volver a la exportación manual.
- Las zonas siguen provisionales hasta analizar actividades reales.

## 2026-09-29 — Tercer intento con el MCP de COROS: mismo error, causa identificada (zonas siguen provisionales)
- En una sesión nueva se buscan las herramientas de COROS antes de asumir nada: el servidor falla al conectar con el mismo error exacto (`Protected resource https://mcpus.coros.com/mcp does not match expected https://mcp.coros.com (or origin)`). No se reintenta en bucle.
- Diagnóstico hecho consultando los metadatos OAuth públicos de COROS (sin credenciales): `mcp.coros.com` anuncia como recurso `mcpus.coros.com/mcp` (no coincide consigo mismo), mientras que los endpoints regionales `mcpus`, `mcpeu` y `mcpcn.coros.com` sí son coherentes consigo mismos. Es un fallo fijo de configuración del lado de COROS en el host genérico, no algo puntual. Detalle en `atleta/zonas-y-metricas.md`.
- **Qué NO cambia**: no se ha podido leer ninguna actividad (ni los dos triatlones sprint ni entrenos recientes), así que no se han calculado zonas reales ni se puede responder todavía si 4'32"/km, 171 ppm y 180 W están al día. Las zonas de `zonas-y-metricas.md` siguen marcadas como provisionales (fuente: captura de la app). Hasta tener datos, **se siguen usando esos valores de la app como referencia provisional**, no como zonas cerradas.
- **Propuesta al atleta (no aplicada)**: cambiar `.mcp.json` a `https://mcpeu.coros.com/mcp` (lo más probable para una cuenta creada en España) y abrir una sesión nueva; si la cuenta resultara estar en EE.UU., usar `mcpus.coros.com`. Puede requerir repetir la autorización OAuth. Alternativa sin esperar: exportar las actividades (FIT/TCX) de los dos sprint y de 4-6 entrenos recientes y subirlas al repo.

## 2026-09-29 — Zonas de carrera/bici/FC rellenadas a partir de capturas de la app COROS (provisional, pendiente de confirmar origen)
- El MCP oficial de COROS sigue sin conectar (mismo error de endpoint regional, reintentado en esta misma sesión). Como alternativa, el atleta comparte 5 capturas de pantalla de su app COROS: configuración de zonas de ritmo de carrera, zonas de FC (basadas en Umbral de Lactato = 171 ppm), zonas de potencia de ciclismo (UPF/FTP = 180 W) e información personal (peso 73.0 kg, altura 177 cm, nacido 5/4/1997). Una quinta captura de "grado de escalada a vista" es de otra sección de la app, no relevante para triatlón, y no se usa.
- Se registran estas zonas en `atleta/zonas-y-metricas.md` con la fuente explícita (captura de la app, no MCP) y se actualiza `atleta/perfil.md` con edad/peso/altura.
- **No se da por cerrado**: queda pendiente de confirmar con el atleta si estos valores base (ritmo umbral 4'32"/km, FC umbral de lactato 171 ppm, FTP 180 W) son cálculo automático de COROS a partir de sus dos triatlones sprint y entrenos recientes, o si los introdujo él a mano hace tiempo (y podrían no reflejar su nivel actual). Hasta confirmarlo, se tratan como provisionales.
- Sigue sin resolverse la parte original de la petición: analizar los dos triatlones sprint y los entrenos recientes en sí (splits, tendencia de mejora), que requiere el MCP funcionando o una exportación manual de actividades — las capturas solo daban la configuración de zonas ya guardada en la app.
- Natación sigue sin zonas: COROS no muestra una pantalla de zonas de natación equivalente y no se ha aportado ningún test de CSS.

## 2026-09-29 — Autorización OAuth completada, pero el MCP de COROS falla al conectar (error técnico, no de permisos)
- El atleta confirma haber autorizado el acceso OAuth desde la app de COROS. Al abrir una sesión nueva para usar el MCP (`.mcp.json` → `https://mcp.coros.com/mcp`), la conexión falla con: `Protected resource https://mcpus.coros.com/mcp does not match expected https://mcp.coros.com (or origin)`.
- Interpretación: el servidor de COROS devuelve metadatos OAuth apuntando a un endpoint regional (`mcpus.coros.com`, aparenta ser EE.UU.) distinto de la URL configurada (`mcp.coros.com`), y el cliente MCP rechaza la conexión por ese desajuste. No es un problema de que falte autorizar — la autorización ya está hecha por parte del atleta.
- No se ha modificado `.mcp.json` (no se quiere apuntar a ciegas al endpoint regional sin confirmar que es correcto y estable). Detalle completo y alternativas en `atleta/zonas-y-metricas.md`.
- Las zonas de ritmo/FC/potencia siguen sin calcular — no se ha inventado ningún valor. Se propone al atleta: reintentar en una sesión nueva (puede ser puntual), o si persiste, decidir juntos si apuntar `.mcp.json` a `mcpus.coros.com` o usar la vía manual (exportar actividades o pasar splits a mano).

## 2026-09-29 — Conector MCP oficial de COROS añadido al proyecto
- Investigación inicial (blogs) sugería que el MCP oficial de COROS ya tenía escritura activa (crear/programar planes). El atleta comparte una captura de su propia app: "Elaborar planes de entrenamiento" sigue marcado como "próximamente" — se corrige el error, la escritura oficial NO está activa todavía. La decisión de escritura manual se mantiene sin cambios.
- La lectura (actividades, salud, HRV, evaluación de forma) sí está activa vía OAuth. Se añade `.mcp.json` en la raíz del repo apuntando a `https://mcp.coros.com/mcp` (opción URL de la propia app de COROS, sin instalar paquetes de terceros).
- Pendiente: el atleta debe autorizar el acceso OAuth la primera vez que una sesión intente usar las herramientas de COROS. Con eso desbloqueado, se puede calcular zonas reales de ritmo/FC/potencia a partir de sus dos triatlones sprint y entrenos recientes sin exportar nada a mano.
- Se actualizan `CLAUDE.md` y `atleta/zonas-y-metricas.md` con el nuevo estado.

## 2026-09-29 — Excepción del jueves confirmada; rutina de fuerza cerrada
- El atleta confirma que el jueves (calidad de carrera/bici + baloncesto el mismo día) es diferente del gimnasio de pierna: ya lo hace así habitualmente y no lo identifica como problema.
- Se registra la excepción en `atleta/historial-y-limitaciones.md` y se cierra la pregunta abierta en `rutinas/fuerza.md`. La restricción de "nada de pierna intensa en día de baloncesto" queda acotada al gimnasio de pierna (sentadilla, peso muerto, etc.) en lunes/miércoles, no a la sesión de calidad del jueves.

## 2026-09-29 — Corrección de la rutina de fuerza: pierna nunca en día de baloncesto
- El atleta aporta un dato clave que faltaba: historial de varios esguinces/lesiones de tobillo (sin lesión activa hoy). Por eso nunca mete pierna intensa (gimnasio, bici o carrera) el mismo día que baloncesto — sube el riesgo de recaída y baja el rendimiento en pista.
- Se actualiza `atleta/historial-y-limitaciones.md` con esta restricción funcional.
- Se reescribe `rutinas/fuerza.md` (v2): pierna se concentra en el martes (con natación, como ya hacía el atleta), lunes y miércoles quedan solo con tren superior sin pierna, con el trabajo de rotación externa/escápula integrado en esos mismos días en vez de un día aparte.
- Queda abierta la pregunta de si el mismo criterio debería aplicar también al jueves (sesión de calidad de carrera/bici + baloncesto el mismo día, ya existente en la rutina del atleta) — pendiente de respuesta.

## 2026-09-29 — Propuesta de rutinas de fuerza y biblioteca de sesiones
- El atleta pide crear rutinas antes de seguir con zonas/decisión del 24 de octubre/recuperación del maratón.
- Se crea `rutinas/fuerza.md`: propuesta de sustituir el split actual (pecho/espalda, pierna, brazo/hombro) por 2 sesiones full-body (lunes/miércoles) + 1 sesión corta de cuidado de hombro (martes), basada en guías de USA Triathlon y literatura de prevención de hombro de nadador. Pendiente de confirmación del atleta.
- Se crea `rutinas/sesiones-triatlon.md`: estructura de sesiones tipo (natación técnica/continua, carrera fácil/larga/series, bici rodaje/calidad/larga, brick) en términos de esfuerzo percibido (RPE), sin ritmos exactos porque las zonas siguen sin confirmar. Ninguna se sube a COROS sin aprobación.
- Se reitera al atleta la limitación de acceso a COROS para las zonas (sin credenciales en esta sesión, se ofrece subir ficheros exportados o dar el ok explícito para pasar credenciales, no recomendado).

## 2026-09-29 — Calendario de baloncesto completo (13 de 13 jornadas)
- Se añaden las jornadas 11 (16/01/2027), 12 (31/01/2027) y 13 (06/02/2027, DESCANSA — jornada libre, sin partido).
- Coincidencia relevante: la jornada 13 (sin partido) cae el mismo fin de semana que la carrera de 21km de Murcia (domingo 7 de febrero de 2027) — ese finde no hay ningún choque con baloncesto.
- Con la temporada completa, la asignación semana A/B/C del ciclo de 3 semanas ya se puede planificar de un tirón en cuanto se fijen las fases.

## 2026-09-29 — Calendario de baloncesto ampliado (10 de 13 jornadas)
- Se añaden las jornadas 6 a 9 (21/11, 28/11, 12/12, 19/12/2026) y una jornada más el 10/01/2027, a falta de 3 jornadas por confirmar.
- Se detecta un parón sin partido conocido entre el 19/12/2026 y el 10/01/2027 (~3 semanas), coherente con lo ya anotado sobre diciembre. En ese tramo se puede recuperar bici larga y carrera larga en días separados sin forzar el ciclo de 3 semanas.

## 2026-09-29 — Carreras de preparación y calendario de baloncesto (parcial)
- Carreras confirmadas: maratón Mula–Caravaca 3 oct 2026 (ya comprometida, esta semana, sin margen de taper), social ride 70km/700m D+ 24 oct 2026, 21km Murcia 7 feb 2027.
- Se avisa: la fase Base del plan no arranca oficialmente hasta pasar la recuperación del maratón; se fija fecha de inicio una vez se sepa cómo llega el atleta.
- Se detecta y se traslada al atleta (sin decidir por él) un conflicto real: el social ride del 24 de octubre coincide con un partido de baloncesto (Infante vs Bar de las Artes, 17:00) esa misma jornada.
- Calendario de baloncesto: 5 de 13 jornadas recibidas (10/10, 18/10, 24/10, 07/11, 14/11 — todas con Infante jugando). Horarios marcados como orientativos por el propio atleta. Pendientes 8 jornadas más.
- El atleta pide calcular zonas de ritmo/FC/potencia a partir de sus datos de COROS (dos triatlones sprint completados + entrenos + mejora del año). Esta sesión no tiene credenciales de COROS ni forma de acceder a esos datos; se le pide al atleta exportar esas actividades y subirlas, o pasar los splits a mano. Zonas siguen en blanco.

## 2026-09-29 — Regla del día de partido confirmada
- El atleta confirma: el día de partido queda a cero, sin ningún entreno.
- Investigación externa (Purple Patch Fitness, Roadman Cycling, TrainingPeaks) sobre cómo repartir la única sesión larga de fin de semana disponible. Se adopta un ciclo de 3 semanas en el único día libre: semana A bici larga, semana B carrera larga, semana C brick (bici moderada-larga + carrera corta), con más frecuencia de brick en fase de pico. Detalle y fuentes en `plan-maestro.md`.
- El atleta confirma que esta estructura le cuadra (2026-09-29).
- Sigue pendiente: carreras de preparación, calendario de partidos, confirmación de zonas, rodillo de bici.

## 2026-09-29 — Horario semanal y punto de partida
- Se rellenan `disponibilidad-semanal.md`, `perfil.md`, `zonas-y-metricas.md` (datos sueltos, sin zonas formales) e `historial-y-limitaciones.md` (sin lesiones reportadas, nota de carga de tren superior a vigilar) con la información aportada por el atleta.
- Se añade a `plan-maestro.md` un borrador de semana tipo, marcado explícitamente como no confirmado y sin cargas/ritmos concretos.
- Se identifica el punto crítico del plan: la tirada larga de bici (sábado) y de carrera (domingo) coinciden con los días en que pueden caer los partidos de baloncesto desde el 10-11 de octubre, con reprogramación de última hora. Pendiente de acordar una regla fija con el atleta.
- Sigue pendiente: carreras de preparación antes de Valencia, calendario de partidos si el atleta lo consigue, confirmación de zonas.

## 2026-09-29 — Fecha de carrera y objetivo confirmados
- Fecha de carrera: 18 de abril de 2027 (Ironman 70.3 Valencia).
- Objetivo: finisher como prioridad; sub 6:30h como objetivo estirado si la progresión de entrenos lo permite.
- Pendiente: horario semanal, entrenos actuales, carreras previas y punto de partida (el atleta los va a aportar a continuación).
- Zonas de ritmo/FC: no se pudieron obtener automáticamente de COROS en esta sesión — no hay credenciales configuradas y el script de solo lectura existente (`scripts/coros-analysis.js`) solo trae nombre/fecha/distancia/duración de actividades, no zonas ni detalle de vueltas. Pendiente de que el atleta las aporte o de test/carrera reciente para calcularlas.

## 2026-09-29 — Creación del proyecto
- Se define arquitectura: MCP oficial de COROS solo lectura (aún no
  conectado), escritura del calendario 100% manual por decisión del atleta.
- Ningún MCP ni script con permisos de escritura ha sido instalado.
- Pendiente: fecha exacta de carrera, horarios, objetivo de rendimiento,
  historial y zonas.
