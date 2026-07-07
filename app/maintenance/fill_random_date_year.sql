-- =============================================================================
-- (Shortcut) Age-only random years. For construction material + domestic too,
-- use: maintenance/fill_demo_map_colours.sql
--
-- Demo / test: give every building a random construction year so the default
-- map style ("Age" → date_year) shows colours for all footprints.
--
-- Why most buildings look grey:
--   Tile query only includes rows WHERE date_year IS NOT NULL (see
--   src/tiles/dataDefinition.ts). No year → building is not in the coloured layer.
--
-- AFTER running this script you MUST clear the server tile cache or you will
-- still see old PNGs:
--   rm -rf /home/ubuntu/colouring-core/app/tilecache/*
--   (or whatever TILECACHE_PATH is in ecosystem.config.js)
--
-- Then hard-refresh the browser (Ctrl+Shift+R). Ensure "Editable Building"
-- is ON (green) so the coloured tile layer is requested.
-- =============================================================================

-- Random year between 1850 and 2024 (fits the Age legend buckets)
UPDATE buildings
SET date_year = (1850 + floor(random() * (2024 - 1850 + 1)))::smallint
WHERE date_year IS NULL;

-- Optional: see how many rows now have a year
-- SELECT count(*) FILTER (WHERE date_year IS NOT NULL) AS with_year,
--        count(*) AS total
-- FROM buildings;
