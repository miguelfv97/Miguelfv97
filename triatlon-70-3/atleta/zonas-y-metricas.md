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

## Pendiente: cálculo de zonas a partir de datos de COROS (2026-09-29)

El atleta pidió calcular ritmo/FC/potencia a partir de sus datos de COROS
(dos triatlones sprint ya completados, entrenos hasta ahora y mejora de
este año). **Esta sesión no tiene forma de acceder a esos datos todavía**:

- No hay credenciales de COROS configuradas aquí.
- Aunque las hubiera, el único script del repo (`scripts/coros-analysis.js`)
  solo trae nombre/fecha/distancia/duración de cada actividad — no splits,
  ni ritmo por tramo, ni FC, que es lo que hace falta para sacar zonas
  reales.

**Cómo desbloquearlo, dos opciones (a elegir por el atleta):**
1. Exportar desde la app/web de COROS las actividades de los dos triatlones
   sprint (y, si puede, alguna sesión de referencia reciente: test de FTP,
   mejor 10K, etc.) como FIT/TCX/CSV y subirlas aquí — se pueden leer
   directamente y calcular zonas con datos reales.
2. Si exportar es complicado, pasar a mano los splits de cada triatlón
   (tiempo/ritmo de natación, tiempo/distancia/potencia media de bici,
   tiempo/ritmo de carrera) y cualquier test reciente (mejor 5K/10K, FTP,
   CSS de natación) — con eso se calculan zonas provisionales con fórmulas
   estándar, marcadas como estimadas hasta confirmarlas con más datos.

Hasta que llegue uno de los dos, las zonas siguen en blanco — no se
inventan a partir de suposiciones.
