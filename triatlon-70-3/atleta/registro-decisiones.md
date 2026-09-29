# Registro de decisiones

> Un apunte por cada cambio relevante en el plan: qué cambió, por qué, y con
> qué datos se justificó. Orden cronológico, más reciente arriba.

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
