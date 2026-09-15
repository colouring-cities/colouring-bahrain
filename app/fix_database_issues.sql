-- Fix database issues: building geometries and date_year relations
-- This script addresses:
-- 1. Buildings without geometry_id links
-- 2. Geometries without building records
-- 3. Date_year relation issues

-- Step 1: Check for buildings without geometry_id
-- Create a temporary table to track orphaned buildings
CREATE TEMP TABLE IF NOT EXISTS orphaned_buildings AS
SELECT building_id, ref_toid, ref_osm_id
FROM buildings
WHERE geometry_id IS NULL;

-- Step 2: Try to link orphaned buildings to geometries by TOID or OSM ID
-- First, try linking by TOID (if source_id matches ref_toid)
UPDATE buildings b
SET geometry_id = g.geometry_id
FROM geometries g
WHERE b.geometry_id IS NULL
  AND b.ref_toid IS NOT NULL
  AND g.source_id = b.ref_toid
  AND NOT EXISTS (
    SELECT 1 FROM buildings b2 
    WHERE b2.geometry_id = g.geometry_id 
    AND b2.building_id != b.building_id
  );

-- Step 3: For geometries without buildings, create building records
-- This handles the "278 new buildings geometries" issue
INSERT INTO buildings (geometry_id, ref_toid, ref_osm_id)
SELECT 
    g.geometry_id,
    g.source_id as ref_toid,
    NULL as ref_osm_id
FROM geometries g
WHERE g.geometry_id NOT IN (SELECT geometry_id FROM buildings WHERE geometry_id IS NOT NULL)
  AND g.geometry_geom IS NOT NULL
ON CONFLICT DO NOTHING;

-- Step 4: Fix date_year issues - ensure date_year is properly set
-- If date_year is NULL but we have date information, try to infer it
-- This is a conservative approach - only update if we're confident

-- Step 5: Ensure date_year constraints are valid (between reasonable years)
-- Update invalid date_year values (e.g., negative, too old, or future dates)
UPDATE buildings
SET date_year = NULL
WHERE date_year IS NOT NULL
  AND (date_year < 1000 OR date_year > EXTRACT(YEAR FROM CURRENT_DATE) + 10);

-- Step 6: Ensure date_year_completed is valid and >= date_year
UPDATE buildings
SET date_year_completed = NULL
WHERE date_year_completed IS NOT NULL
  AND date_year IS NOT NULL
  AND date_year_completed < date_year;

-- Step 7: Create index if missing for performance
CREATE INDEX IF NOT EXISTS buildings_geometry_id_idx ON buildings(geometry_id) WHERE geometry_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS buildings_date_year_idx ON buildings(date_year) WHERE date_year IS NOT NULL;

-- Step 8: Report statistics
DO $$
DECLARE
    total_buildings INTEGER;
    buildings_with_geometry INTEGER;
    buildings_without_geometry INTEGER;
    total_geometries INTEGER;
    geometries_without_buildings INTEGER;
    buildings_with_date_year INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_buildings FROM buildings;
    SELECT COUNT(*) INTO buildings_with_geometry FROM buildings WHERE geometry_id IS NOT NULL;
    SELECT COUNT(*) INTO buildings_without_geometry FROM buildings WHERE geometry_id IS NULL;
    SELECT COUNT(*) INTO total_geometries FROM geometries;
    SELECT COUNT(*) INTO geometries_without_buildings 
    FROM geometries g 
    WHERE NOT EXISTS (SELECT 1 FROM buildings b WHERE b.geometry_id = g.geometry_id);
    SELECT COUNT(*) INTO buildings_with_date_year FROM buildings WHERE date_year IS NOT NULL;
    
    RAISE NOTICE 'Database Statistics:';
    RAISE NOTICE 'Total buildings: %', total_buildings;
    RAISE NOTICE 'Buildings with geometry: %', buildings_with_geometry;
    RAISE NOTICE 'Buildings without geometry: %', buildings_without_geometry;
    RAISE NOTICE 'Total geometries: %', total_geometries;
    RAISE NOTICE 'Geometries without buildings: %', geometries_without_buildings;
    RAISE NOTICE 'Buildings with date_year: %', buildings_with_date_year;
END $$;
