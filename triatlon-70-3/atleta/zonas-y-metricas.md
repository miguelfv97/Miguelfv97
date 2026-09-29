# Zonas y métricas de referencia

> No inventar valores. Rellenar solo con datos confirmados por el atleta o
> por una prueba reciente (test de FTP, umbral de carrera, etc.). Si un dato
> no existe todavía, dejarlo en blanco y decirlo explícitamente en vez de
> estimarlo.

## Carrera
- Zonas de ritmo/FC: no calculadas todavía (no hay zonas formales confirmadas).
- Ritmo umbral (si se conoce): no confirmado.
- **Datos de referencia aportados por el atleta** (no son zonas, son puntos sueltos a fecha 2026-09-29):
  - Series de VO2max: 6x1000 m progresivos, mejor repetición ~3:40/km.
  - Tirada larga habitual: 20 km en "zona 2" autopercibida (sin confirmar por FC/ritmo real), es la sesión y disciplina mejor asentada.

## Bicicleta
- FTP (si se conoce): no confirmado, no se ha hecho test.
- Zonas de potencia/FC: no calculadas.
- **Datos de referencia aportados por el atleta**:
  - Salida larga máxima completada: 100 km.
  - Salida más exigente hasta ahora: 80–90 km con ~700 m de desnivel acumulado.
  - Entreno entre semana (cuando hay luz): 20 km a ritmo alto.

## Natación
- Ritmo por 100m en umbral (si se conoce): no confirmado — el atleta nada 1.500–3.000 m por sesión sin ningún trabajo de técnica ni control de ritmo por 100 m. Es el punto de partida más débil de las tres disciplinas y donde más margen de mejora hay con estructura básica.

## Métricas generales
- FC reposo habitual:
- FC máxima (medida, no fórmula):
- Fuente de los datos: manual (reportado por el atleta) — ver `triatlon-70-3/CLAUDE.md` para el estado de la integración con COROS.
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

Hasta resolver esto, o como alternativa si el atleta prefiere no esperar:

1. Reintentar el MCP oficial en una sesión nueva (el error puede ser una
   incidencia puntual de enrutado regional de COROS) — no requiere que el
   atleta vuelva a autorizar nada.
2. Exportar manualmente las actividades desde la app/web de COROS
   (FIT/TCX/CSV) y subirlas aquí.
3. Pasar a mano los splits de cada triatlón y cualquier test reciente
   (mejor 5K/10K, FTP, CSS de natación) — zonas provisionales, marcadas
   como estimadas.

Hasta que se complete una de las tres, las zonas siguen en blanco — no se
inventan a partir de suposiciones.
