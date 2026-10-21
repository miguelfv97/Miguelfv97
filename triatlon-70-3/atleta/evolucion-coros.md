# Evolución completa según COROS (histórico ~14 meses)

> Generado el 2026-09-30 leyendo el histórico real de COROS (natación,
> bici, carrera) desde que hay datos (≈julio 2025) hasta hoy. Es un
> resumen/agregado, no cada sesión suelta — para el detalle exacto de una
> sesión, pedirlo y se consulta el `labelId` correspondiente.

## Corrección importante: el triatlón de Blanca

El atleta indica que la natación de **"el triatlón de Blanca"** fue en río,
a favor de corriente — ese tiempo no es un dato de esfuerzo real.

En los datos de COROS no hay ninguna prueba etiquetada literalmente
"Blanca". El registro más probable es el que COROS llama **"Murcia
Triatlón" (18/07/2026)**: sus coordenadas de salida (38.181, -1.379)
coinciden con el pueblo de Blanca (Región de Murcia, en el Segura) casi
al metro. Alta confianza, pero **sin confirmar explícitamente por el
atleta** — si no es esta prueba, decírmelo y se corrige.

Con esa lectura: la natación de esa prueba (633 m en 6:04, ritmo
≈0:57/100m, FC media solo 116) **queda invalidada como referencia de
ritmo/esfuerzo** — el ritmo es irreal para alguien sin técnica de
natación entrenada, exactamente porque iba a favor de corriente. Bici y
carrera de esa misma prueba sí son válidas (no dependen de la corriente
del río). Esto ya se refleja en `zonas-y-metricas.md` y `atleta/perfil.md`.

## Natación (piscina y aguas abiertas)

- **65 sesiones de piscina** registradas entre julio 2025 y septiembre
  2026, casi todas en "Piscina" (la habitual). **1 sola sesión de aguas
  abiertas fuera de competición**: 15/09/2026, 612 m en 15:36 (≈2:33/100m,
  FC 143) en "España Aguas Abiertas".
- **Distancia habitual**: 1.0–1.5 km la mayoría de sesiones; una sesión
  más larga (2.0–3.0 km) aproximadamente una vez al mes.
- **Ritmo**: entre 2:17 y 3:36 /100m según la sesión, sin patrón de mejora
  clara — las sesiones más lentas (3:10–3:36/100m) se concentran en
  septiembre-noviembre 2025; desde 2026 el rango se estrecha algo
  (mayoría 2:24–2:45/100m), pero es más consistencia que una mejora de
  técnica real. Coincide con lo que ya sabíamos: es la disciplina sin
  trabajo técnico.
- **FC en natación**: 107–158 ppm, la mayoría 125–145 — esfuerzo aeróbico
  moderado, no series de calidad.
- **Frecuencia**: aproximadamente 1–2 sesiones/semana durante casi todo el
  periodo, sin un salto de volumen grande en ningún momento.
- **Estacionalidad de aguas abiertas (confirmado 2026-09-30)**: de octubre
  a finales de marzo no hay mar abierto disponible — toda la natación es
  en piscina hasta que vuelva el calor (~abril). Para el 18 de abril de
  2027 esto deja una ventana corta (~3-4 semanas, finales de marzo/abril)
  para practicar específicamente en aguas abiertas antes de la carrera —
  hay que preverlo al diseñar la fase de pico/taper, no asumir que se
  puede meter en cualquier momento del invierno.

## Carrera

- **~100+ sesiones** registradas desde agosto de 2025 (puede haber alguna
  más antigua no traída por el límite de la consulta).
- **Tirada larga**: consolidada como fijo semanal/quincenal desde
  diciembre de 2025 — casi siempre 20–21 km, con picos puntuales de
  23–24 km (30/08/2026: 24.01 km). Es la sesión más estable de las tres
  disciplinas.
- **Rodaje entre semana**: ~10–11 km a 5:00–5:40/km, muy regular.
- **Sesiones cortas/calidad**: ~5 km a ritmos más vivos (4:20–5:00/km),
  repartidas por todo el periodo.
- **Cinta (treadmill) en "Cinta"**: uso habitual y regular, sesiones de
  8–11 km a 5:00–5:40/km. Confirmado por el atleta (2026-09-30): al
  principio la usaba para las series de calidad; ahora las hace en
  exterior siempre que puede, y la cinta queda como alternativa para mal
  tiempo. Tenerlo en cuenta como respaldo del plan, no como sesión
  habitual.
- **Carreras durante viajes**: Shanghái, Chengdú, Zhangjiajie, Xiangxi
  (agosto 2026); Bilbao, Valencia, La Coruña, Santa Comba (otros meses) —
  mantienes el hábito de correr incluso de viaje.
- **Senderismo (hike)** puntual, sin relación directa con el plan de
  triatlón, solo por contexto de actividad general.

## Bicicleta — la disciplina con el cambio más claro

- **Julio 2025 – mayo 2026**: casi exclusivamente ciclismo indoor corto
  (10–60 min, FC 97–148), claramente mantenimiento/base, no volumen real
  de entrenamiento específico de bici. Confirmado por el atleta
  (2026-09-30): es un rodillo/bici estática **del gimnasio, sin conexión
  con COROS** — por eso estas sesiones solo tienen duración/FC/calorías,
  nunca distancia ni potencia (el reloj capta lo que puede, no hay datos
  del rodillo en sí). El atleta reporta estos datos a mano cuando los usa;
  es previsible que se use más en invierno por el mal tiempo, aunque
  siempre prioriza salir a rodar al exterior.
- **Desde junio de 2026**: cambio claro a bici exterior de verdad —
  salidas de 30 a 100+ km, velocidades 20–26 km/h.
- **Tu máximo de 100 km confirmado**: 29/08/2026, 101.00 km en 4:20:39
  (23.3 km/h, FC media 132) — la salida que ya nos habías contado.
- **Salida más reciente**: 26/09/2026, 80.56 km en 3:14:46 (24.8 km/h);
  la más larga/rápida del periodo fue el 12/09/2026, 87.52 km a 25.9 km/h.
- **Lectura**: la bici lleva solo ~4 meses de volumen serio (desde junio
  2026), mucho menos rodaje acumulado que la carrera. Coherente con que
  el FTP/potencia de la app sea el dato menos consolidado de los tres
  (ver `zonas-y-metricas.md`) — hay menos historial detrás para que COROS
  lo calcule con confianza.

## Qué cambia esto en el proyecto

- La bici es la disciplina que más "acaba de arrancar" en serio — al
  diseñar el plan por fases, construir progresión de bici desde una base
  más reciente que la de carrera, no asumir el mismo nivel de asentamiento.
- La cinta es una herramienta real que ya usas — se puede ofrecer como
  alternativa en el plan sin que sea una novedad para ti.
- La natación lleva 14 meses sin mejora de ritmo clara — refuerza que la
  prioridad ahí es técnica, no más volumen a ciegas (ya estaba en
  `plan-maestro.md`).
- El triatlón de Blanca pierde su dato de natación como referencia, pero
  mantiene bici y carrera como válidos.
