# Zonas y métricas de referencia

> No inventar valores. Rellenar solo con datos confirmados por el atleta o
> por una prueba reciente (test de FTP, umbral de carrera, etc.). Si un dato
> no existe todavía, dejarlo en blanco y decirlo explícitamente en vez de
> estimarlo.

## Estado (actualizado 2026-09-30): MCP de COROS conectado y confirmado

El conector oficial de COROS ya está activo en Claude (vía
https://claude.ai/customize/connectors) y autenticado por OAuth — no se ha
compartido ningún usuario/contraseña en ningún momento, ni se ha usado
ninguna herramienta de escritura (crear/editar entrenos) sin aprobación,
solo lectura. Con esto se ha podido:

1. Confirmar el **ritmo umbral de carrera (4:32/km)** directamente desde
   `queryFitnessAssessmentOverview` de COROS — coincide exactamente con el
   valor de la captura de pantalla. **Ya no es provisional**: es la
   evaluación en vivo de COROS, no un valor manual desactualizado.
2. Leer el detalle completo (splits reales) de los dos triatlones sprint.
3. Ver carga de entreno, FC en reposo, HRV de sueño y estado de
   recuperación recientes.

El historial completo del proceso (4 intentos, bug de endpoint regional en
`mcp.coros.com`, solución con `mcpeu.coros.com`) queda al final de este
fichero para referencia, ya no es el estado actual.

## Carrera
- **Zonas de ritmo (fuente: COROS, confirmado por `queryFitnessAssessmentOverview` el 2026-09-30 — coincide con la configuración de zonas de la app)**:
  - Ritmo umbral: **4:32/km** ✅ confirmado (evaluación en vivo de COROS, no manual).
  - Recuperación: > 6'24"/km (<71%)
  - Resistencia Aeróbica: 5'25"–6'24"/km (71–84%)
  - Potencia Aeróbica: 4'54"–5'24"/km (85–93%)
  - Umbral: 4'27"–4'53"/km (94–102%)
  - Resistencia Anaeróbica: 4'01"–4'26"/km (103–113%)
  - Potencia Anaeróbica: < 4'01"/km (>113%)
- **Evaluación de forma actual (COROS, 2026-09-30)**: VO2max 58, Running Level 84. Predicciones: 5K 21:41, 10K 44:59, media maratón 1:40:54, maratón 3:33:47 (referencia únicamente — este sábado corre el maratón de Mula-Caravaca, no es una predicción sobre esa carrera concreta por el desnivel).
- **Datos de referencia aportados por el atleta**:
  - Series de VO2max: 6x1000 m progresivos, mejor repetición ~3:40/km.
  - Tirada larga habitual: 20 km en "zona 2" autopercibida — coherente con el rango de Resistencia Aeróbica (5'25"–6'24"/km).

## Bicicleta
- **Zonas de potencia (fuente: configuración de zonas en la app COROS)**:
  - UPF (FTP): 180 W. No hay un endpoint de COROS que confirme si es de test automático o manual (a diferencia de carrera); se mantiene como mejor dato disponible, no como 100% verificado.
  - Recuperación: < 101 W (<56%)
  - Resistencia Aeróbica: 101–135 W (56–75%)
  - Potencia Aeróbica: 136–162 W (76–90%)
  - Umbral: 163–189 W (91–105%)
  - Resistencia Anaeróbica: 190–216 W (106–120%)
  - Potencia Anaeróbica: 217–270 W (121–150%)
  - Sprint: > 270 W (>150%)
- **Datos de referencia aportados por el atleta**:
  - Salida larga máxima completada: 100 km.
  - Salida más exigente hasta ahora: 80–90 km con ~700 m de desnivel acumulado.
  - Entreno entre semana (cuando hay luz): 20 km a ritmo alto.

## Natación
- Sin zonas formales ni ritmo umbral por 100 m — COROS no tiene esa
  pantalla; haría falta un test CSS (Critical Swim Speed: 400 m + 200 m a
  tope, descanso completo entre ambos) para calcularlo.
- **Datos reales de los dos triatlones** (ver tabla más abajo): en Cullera
  nadó 848 m en 19:15 (≈2:16/100m, HR 121 avg); en Murcia 633 m en 6:04
  (≈0:57/100m, HR 116 avg — probablemente un tramo/OW más corto o con
  corriente, no comparable directamente). Son ritmos de carrera sin
  entrenar la técnica, no un ritmo de referencia fiable para planificar.

## Los dos triatlones sprint — splits reales (COROS, 2026-09-30)

| | Cullera Triatlón (2026-09-19) | Murcia Triatlón (2026-07-18) |
|---|---|---|
| Tiempo total | 1:28:27 | 1:13:04 |
| Natación | 848 m en 19:15, HR avg 121 / max 165 | 633 m en 6:04, HR avg 116 / max 135 |
| Bici | 20.30 km en 41:04 (≈29.7 km/h), HR avg 157 / max 167, +121 m D+ | 18.27 km en 41:38 (≈26.3 km/h), HR avg 152 / max 172, +166 m D+ |
| Carrera | 4.69 km en 22:52 (≈4:53/km), HR avg 165 / max **178** | 4.61 km en 22:23 (≈4:51/km), HR avg 175 / max **185** |

**Lectura de mejora (lo que el atleta pedía)**: de julio a septiembre, la
bici sube de ~26.3 a ~29.7 km/h y el ritmo de carrera se mantiene similar
(~4:52/km) pero **con menos FC máxima al final** (178 vs 185) — indicio de
mejor eficiencia/forma, no solo de ir más rápido. El pico de 185 ppm en
Murcia es el dato real más alto de FC visto hasta ahora (ver más abajo).

## Métricas generales
- **FC reposo (COROS, últimos 7 días, 2026-09-30)**: 44–51 ppm (mayoría 44–45, un pico puntual de 51 el 27/09 — vigilar si se repite).
- **FC máxima**: no hay test formal, pero el dato real más alto registrado es **185 ppm** (final de la carrera a pie en el triatlón de Murcia, 18/07/2026) — más alto que el umbral de lactato de 171 ppm usado para las zonas de FC de la app. Las zonas de FC de abajo están construidas sobre el umbral de lactato, no sobre esta FC máx. observada; no se recalculan sin más datos o sin que el atleta lo pida explícitamente.
- **HRV de sueño (COROS, últimos 7 días, 2026-09-30)**: 85–114 ms, todo "Normal" o "Por encima de lo normal" (línea base ~89–91 ms). Sin señales de alarma.
- **Estado de recuperación (COROS, 2026-09-30)**: 99%, "Entreno intenso permitido", recuperación completa estimada en 5h.
- **Carga de entreno (COROS, últimos 14 días)**: ratio carga corto/largo plazo entre 0.82 y 1.17, mayoría "Optimized"/"Maintaining" — sin sobrecarga ni infracarga señaladas por COROS. El 30/09 (hoy, 3 días antes del maratón) el ratio baja a 0.89 — reducción de carga que ya está pasando de forma natural de cara a la carrera del sábado.
- **Zonas de FC (fuente: configuración de zonas en la app COROS, tipo "Umbral de Lactato" = 171 ppm)**:
  - Recuperación: < 137 ppm (<80%)
  - Resistencia Aeróbica: 137–154 ppm (80–90%)
  - Potencia Aeróbica: 155–162 ppm (91–95%)
  - Umbral: 163–174 ppm (96–102%)
  - Resistencia Anaeróbica: 175–181 ppm (103–106%)
  - Potencia Anaeróbica: > 181 ppm (>106%)
- Datos personales de la cuenta COROS (confirmado por `queryUserInfo`, 2026-09-30): peso 73.0 kg, altura 177 cm, nacido 5 abr 1997 (29 años). Ver también `atleta/perfil.md`.
- Métricas de las que NO fiarse como disparador único de decisiones: un solo día de FC reposo o HRV alterado — mirar tendencia de varios días, no un valor suelto.

---

## Historial del proceso de conexión con COROS (referencia, ya resuelto)

El atleta pidió calcular ritmo/FC/potencia a partir de sus datos de COROS
(dos triatlones sprint ya completados, entrenos hasta ahora y mejora de
este año). Resumen de cómo se llegó hasta aquí:

1. **Intento 1**: `.mcp.json` → `mcp.coros.com` falla con
   `Protected resource https://mcpus.coros.com/mcp does not match expected
   https://mcp.coros.com (or origin)` — a pesar de que el atleta ya había
   autorizado OAuth desde la app de COROS.
2. **Zonas provisionales vía capturas de pantalla** de la app (ritmo,
   potencia, FC, datos personales) mientras se resolvía el MCP — cumplían
   la regla de "no inventar" pero quedaban sin confirmar si eran cálculo
   automático o valores manuales antiguos.
3. **Diagnóstico**: `mcp.coros.com` anuncia metadatos OAuth inconsistentes
   (`resource` apunta a `mcpus.coros.com`, no coincide consigo mismo) —
   bug de COROS en el host genérico, no del lado del atleta. Los hosts
   regionales (`mcpeu`, `mcpus`, `mcpcn`) sí son coherentes.
   `.mcp.json` se cambia a `https://mcpeu.coros.com/mcp`.
4. Con `mcpeu`, el error de endpoint desaparece pero la sesión en la nube
   (no interactiva) no puede completar el login OAuth en el navegador.
5. **Vía correcta encontrada**: conectar COROS en
   https://claude.ai/customize/connectors (a nivel de cuenta de Claude,
   con todos los permisos) y abrir una sesión nueva — los conectores se
   leen al arrancar la sesión. El atleta lo hace el 2026-09-30 y, en la
   siguiente sesión, `queryUserInfo` responde correctamente: conector
   activo y confirmado.

**Nota sobre escritura**: el conector expone también herramientas de
escritura (crear/programar entrenos, planes completos) — más de lo que
mostraba la app como "próximamente". No se ha usado ninguna: la escritura
en COROS sigue siendo manual por decisión del atleta (ver `CLAUDE.md`) y
solo cambiaría con su aprobación explícita.
