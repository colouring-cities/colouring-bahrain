-- =============================================================================
-- Colour the map: fill `buildings` columns the TILE SERVER reads.
--
-- Why you might still see "grey" footprints:
--   1) date_year (or other style field) still NULL — fixed by the UPDATEs below.
--   2) geometry_id IS NULL — no link to footprints; SQL cannot fix geometry.
--   3) Tile pipeline joins `geometries` and drops huge polygons (ST_Area / bbox
--      limits in src/tiles/dataDefinition.ts) — rare for normal buildings.
--
-- DEFAULT BELOW: sets random demo values on EVERY row (overwrites existing ages).
-- If you only want to fill gaps, use the commented "NULL only" versions instead.
--
-- After running: rm -rf tilecache/*  →  restart app  →  hard-refresh browser.
-- Keep "Editable Building" ON. Default map style is Age → date_year.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- DIAGNOSTIC (run first — see who cannot ever get colours without geometry fix)
-- -----------------------------------------------------------------------------
-- SELECT
--     count(*) AS total_buildings,
--     count(*) FILTER (WHERE geometry_id IS NULL) AS no_geometry_id,
--     count(*) FILTER (WHERE date_year IS NULL) AS no_date_year,
--     count(*) FILTER (WHERE geometry_id IS NOT NULL AND date_year IS NULL) AS need_year_only
-- FROM buildings;

-- -----------------------------------------------------------------------------
-- A) Age map — random year 1850–2024 on EVERY building (full demo colour)
-- -----------------------------------------------------------------------------
UPDATE buildings
SET date_year = (1850 + floor(random() * (2024 - 1850 + 1)))::smallint;

-- Alternative: only rows missing a year (keeps data you already saved):
-- UPDATE buildings
-- SET date_year = (1850 + floor(random() * (2024 - 1850 + 1)))::smallint
-- WHERE date_year IS NULL;

-- -----------------------------------------------------------------------------
-- B) Construction map style — every building gets a valid random material
-- -----------------------------------------------------------------------------
UPDATE buildings b
SET construction_core_material = mats.a[
        1 + mod(abs(hashtext(b.building_id::text)), cardinality(mats.a))
    ]
FROM (
    SELECT array_agg(x ORDER BY x) AS a
    FROM unnest(enum_range(NULL::construction_materials)) AS x
) mats
WHERE cardinality(mats.a) > 0;

-- If the line above errors (no enum type), skip section B.

-- -----------------------------------------------------------------------------
-- C) is_domestic style — every building yes/no
-- -----------------------------------------------------------------------------
UPDATE buildings
SET is_domestic = CASE
        WHEN mod(abs(hashtext(building_id::text || 'dom')), 2) = 0 THEN 'yes'
        ELSE 'no'
    END;

-- -----------------------------------------------------------------------------
-- D) OPTIONAL — copy building_properties.age → buildings.date_year (gaps only)
--     Uncomment if column building_properties.age exists.
-- -----------------------------------------------------------------------------
-- UPDATE buildings b
-- SET date_year = LEAST(2024::smallint, GREATEST(1000::smallint, bp.age::smallint))
-- FROM building_properties bp
-- WHERE bp.building_id = b.building_id
--   AND b.date_year IS NULL
--   AND bp.age IS NOT NULL;

-- -----------------------------------------------------------------------------
-- E) OPTIONAL — land use (needs reference_tables.buildings_landuse_order)
-- -----------------------------------------------------------------------------
-- (See previous version of this file or ask your team — FK must match.)

-- -----------------------------------------------------------------------------
-- VERIFY — after A, this should be: no_date_year = 0
-- -----------------------------------------------------------------------------
-- SELECT count(*) FILTER (WHERE date_year IS NULL) AS still_missing_year FROM buildings;
