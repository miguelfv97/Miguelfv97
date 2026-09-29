# Registro de decisiones

> Un apunte por cada cambio relevante en el plan: qué cambió, por qué, y con
> qué datos se justificó. Orden cronológico, más reciente arriba.

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
