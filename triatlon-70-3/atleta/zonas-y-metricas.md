# Zonas y métricas de referencia

> No inventar valores. Rellenar solo con datos confirmados por el atleta o
> por una prueba reciente (test de FTP, umbral de carrera, etc.). Si un dato
> no existe todavía, dejarlo en blanco y decirlo explícitamente en vez de
> estimarlo.

## Carrera
- **Zonas de ritmo (fuente: configuración de zonas en la app COROS, capturas
  aportadas por el atleta el 2026-09-29 — MCP oficial aún bloqueado, ver
  sección "Pendiente" más abajo)**:
  - Ritmo umbral: 4'32"/km.
  - Recuperación: > 6'24"/km (<71%)
  - Resistencia Aeróbica: 5'25"–6'24"/km (71–84%)
  - Potencia Aeróbica: 4'54"–5'24"/km (85–93%)
  - Umbral: 4'27"–4'53"/km (94–102%)
  - Resistencia Anaeróbica: 4'01"–4'26"/km (103–113%)
  - Potencia Anaeróbica: < 4'01"/km (>113%)
- **Pendiente de confirmar con el atleta**: si el ritmo umbral (4'32"/km) lo
  calculó COROS automáticamente a partir de los dos triatlones sprint/entrenos
  recientes, o si es un valor introducido a mano hace tiempo y podría estar
  desactualizado. Hasta confirmarlo, tratar como zona provisional.
- **Datos de referencia aportados por el atleta** (no son zonas, son puntos sueltos a fecha 2026-09-29):
  - Series de VO2max: 6x1000 m progresivos, mejor repetición ~3:40/km.
  - Tirada larga habitual: 20 km en "zona 2" autopercibida — coherente con el
    rango de Resistencia Aeróbica de arriba (5'25"–6'24"/km).

## Bicicleta
- **Zonas de potencia (fuente: configuración de zonas en la app COROS,
  capturas aportadas por el atleta el 2026-09-29)**:
  - UPF (FTP): 180 W.
  - Recuperación: < 101 W (<56%)
  - Resistencia Aeróbica: 101–135 W (56–75%)
  - Potencia Aeróbica: 136–162 W (76–90%)
  - Umbral: 163–189 W (91–105%)
  - Resistencia Anaeróbica: 190–216 W (106–120%)
  - Potencia Anaeróbica: 217–270 W (121–150%)
  - Sprint: > 270 W (>150%)
- **Pendiente de confirmar con el atleta**: igual que en carrera, si el FTP de
  180 W viene de un test/detección automática de COROS o es un valor antiguo
  introducido a mano. El atleta no ha hecho un test de FTP formal que conste
  en este proyecto.
- **Datos de referencia aportados por el atleta**:
  - Salida larga máxima completada: 100 km.
  - Salida más exigente hasta ahora: 80–90 km con ~700 m de desnivel acumulado.
  - Entreno entre semana (cuando hay luz): 20 km a ritmo alto.

## Natación
- Ritmo por 100m en umbral (si se conoce): no confirmado — el atleta nada 1.500–3.000 m por sesión sin ningún trabajo de técnica ni control de ritmo por 100 m. Es el punto de partida más débil de las tres disciplinas y donde más margen de mejora hay con estructura básica.
- COROS no expone una pantalla de zonas de natación equivalente a las de
  carrera/bici (o no se ha compartido); sigue sin haber zonas de natación.
  Necesitaría un test tipo CSS (Critical Swim Speed) para calcularlas.

## Métricas generales
- FC reposo habitual: no confirmado todavía.
- FC máxima (medida, no fórmula): no confirmada; la app usa **Umbral de
  Lactato = 171 ppm** como base del cálculo de zonas de FC (no FC máx. ni
  reserva de FC — ver tipo de zona seleccionado en la app).
- **Zonas de FC (fuente: configuración de zonas en la app COROS, capturas
  aportadas por el atleta el 2026-09-29, tipo "Umbral de Lactato")**:
  - Recuperación: < 137 ppm (<80%)
  - Resistencia Aeróbica: 137–154 ppm (80–90%)
  - Potencia Aeróbica: 155–162 ppm (91–95%)
  - Umbral: 163–174 ppm (96–102%)
  - Resistencia Anaeróbica: 175–181 ppm (103–106%)
  - Potencia Anaeróbica: > 181 ppm (>106%)
- Datos personales de la cuenta COROS (misma captura, 2026-09-29): peso 73.0
  kg, altura 177 cm, nacido 5 abr 1997 (29 años a fecha de hoy). Ver también
  `atleta/perfil.md`.
- Fuente de los datos: configuración de zonas de la app COROS (capturas de
  pantalla aportadas por el atleta), no el MCP oficial — ver
  `triatlon-70-3/CLAUDE.md` y sección "Pendiente" más abajo para el estado de
  la integración.
- Métricas de las que NO fiarse como disparador único de decisiones:

## Pendiente: cálculo de zonas a partir de datos de COROS (actualizado 2026-09-29)

El atleta pidió calcular ritmo/FC/potencia a partir de sus datos de COROS
(dos triatlones sprint ya completados, entrenos hasta ahora y mejora de
este año).

**Intentado el 2026-09-29 (tras autorización OAuth del atleta) — bloqueado
por un error técnico, no por falta de autorización**: el atleta confirma
haber autorizado el acceso OAuth desde la propia app de COROS. Al iniciar
una sesión nueva con `.mcp.json` apuntando a `https://mcp.coros.com/mcp`,
la conexión del MCP falla con este error exacto:

> `Protected resource https://mcpus.coros.com/mcp does not match expected
> https://mcp.coros.com (or origin)`

Lectura del error: el servidor de COROS devuelve metadatos OAuth con un
recurso regional (`mcpus.coros.com`, aparenta ser el clúster EE.UU.) que no
coincide con la URL configurada (`mcp.coros.com`), y el cliente MCP rechaza
la conexión por esa discrepancia. No es un problema de permisos ni de que
falte autorizar — es un desajuste de endpoint/región entre lo configurado
y lo que el servidor de COROS ofrece desde este entorno. No se ha tocado
`.mcp.json` a la espera de decidir con el atleta cómo seguir (ver
`registro-decisiones.md`).

**Resuelto parcialmente (2026-09-29, vía captura de pantalla, no MCP)**: el
atleta comparte capturas de las pantallas de configuración de zonas de la
app COROS (ritmo de carrera, FC, potencia de ciclismo) y de su información
personal. Con eso se han rellenado las zonas de carrera, bicicleta y FC más
arriba, con la fuente indicada en cada sección. Esto cumple la regla de "no
inventar" porque son datos reales de la cuenta del atleta, pero queda una
duda abierta con él: **si esos valores base (ritmo umbral 4'32"/km, FC
umbral de lactato 171 ppm, FTP 180 W) los calculó COROS automáticamente a
partir de sus dos triatlones sprint y entrenos recientes, o si los introdujo
él a mano en algún momento anterior** (en cuyo caso podrían no reflejar su
nivel actual). Hasta confirmar esto, las zonas se tratan como provisionales.

Sigue pendiente por completo:
- **Natación**: sin zonas ni ritmo umbral por 100 m (ver sección Natación).
- **Los dos triatlones sprint y entrenos recientes en sí** (splits, carga,
  tendencia de mejora en el año) — las capturas solo dan las zonas ya
  configuradas en la app, no el histórico de actividades que el atleta pidió
  analizar. Sigue haciendo falta el MCP (o una exportación manual) para eso.

**Tercer intento (2026-09-29, sesión nueva) — mismo error exacto, y causa
diagnosticada**. Consultando a mano (curl, sin credenciales) los metadatos
OAuth públicos de COROS:

| Host | `resource` que anuncia en `/.well-known/oauth-protected-resource/mcp` |
|---|---|
| `mcp.coros.com` (el de `.mcp.json`) | `https://mcpus.coros.com/mcp` ← no coincide consigo mismo |
| `mcpus.coros.com` (EE.UU.) | `https://mcpus.coros.com/mcp` ← coherente |
| `mcpeu.coros.com` (Europa) | `https://mcpeu.coros.com/mcp` ← coherente |
| `mcpcn.coros.com` (China) | `https://mcpcn.coros.com/mcp` ← coherente |

Conclusión: no es una incidencia puntual. `mcp.coros.com` es un alias
genérico que anuncia el recurso de EE.UU., y el cliente MCP lo rechaza
por seguridad (la especificación exige que coincidan). **Mientras
`.mcp.json` apunte a `mcp.coros.com`, reintentar no va a servir** hasta
que COROS lo corrija. Los endpoints regionales sí son coherentes, así
que apuntar `.mcp.json` al de la región de la cuenta del atleta debería
superar ese chequeo (no verificable en esta sesión: el MCP solo se carga
al arrancar una sesión nueva).

Duda que decide cuál usar: la cuenta del atleta está en España y lo más
probable es que esté en el clúster **europeo** (`mcpeu`), pero no está
confirmado. Si la cuenta es EU y se usa `mcpus`, el OAuth probablemente
no reconozca la cuenta o no devuelva datos. **Pendiente de decisión del
atleta** (ver `registro-decisiones.md`); `.mcp.json` sigue sin tocar.

Alternativas si el MCP sigue sin conectar:
1. ~~Reintentar el MCP oficial en una sesión nueva~~ — descartado como
   solución por sí solo: el desajuste es fijo en `mcp.coros.com`. Opción
   nueva: cambiar `.mcp.json` a `https://mcpeu.coros.com/mcp` (o `mcpus`
   si la cuenta es de EE.UU.) y abrir una sesión nueva; puede pedir
   repetir la autorización OAuth contra ese host.
2. Exportar manualmente las actividades desde la app/web de COROS
   (FIT/TCX/CSV) y subirlas aquí.
3. Pasar a mano los splits de cada triatlón y cualquier test reciente
   (mejor 5K/10K, CSS de natación).
