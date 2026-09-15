-- Script to find and remove abnormally large geometries that cause the big box issue
-- Large geometries are likely errors in the data (e.g., entire country/city boundaries instead of buildings)

-- Step 1: Find geometries with abnormally large areas
-- In EPSG:3857 (Web Mercator), a reasonable building should be less than ~100,000 square meters
-- Anything larger than 1,000,000 (1 square km) is likely an error

-- Show large geometries before deletion
SELECT 
    g.geometry_id,
    b.building_id,
    ST_Area(g.geometry_geom) as area_sq_meters,
    ST_Area(g.geometry_geom) / 1000000 as area_sq_km,
    ST_XMin(ST_Envelope(g.geometry_geom)) as xmin,
    ST_YMin(ST_Envelope(g.geometry_geom)) as ymin,
    ST_XMax(ST_Envelope(g.geometry_geom)) as xmax,
    ST_YMax(ST_Envelope(g.geometry_geom)) as ymax
FROM geometries g
LEFT JOIN buildings b ON g.geometry_id = b.geometry_id
WHERE ST_Area(g.geometry_geom) > 100000  -- 0.1 square km threshold (100,000 sq meters)
ORDER BY area_sq_meters DESC;

-- Step 2: Delete buildings associated with large geometries
DELETE FROM buildings
WHERE geometry_id IN (
    SELECT geometry_id 
    FROM geometries 
    WHERE ST_Area(geometry_geom) > 100000
);

-- Step 3: Delete the large geometries themselves
DELETE FROM geometries
WHERE ST_Area(geometry_geom) > 100000;

-- Step 4: Also check for geometries with very large bounding boxes (another indicator of bad data)
-- A bounding box larger than ~0.09 degrees (10km) in either direction is suspicious
SELECT 
    g.geometry_id,
    b.building_id,
    (ST_XMax(ST_Envelope(g.geometry_geom)) - ST_XMin(ST_Envelope(g.geometry_geom))) / 111320 as width_degrees,
    (ST_YMax(ST_Envelope(g.geometry_geom)) - ST_YMin(ST_Envelope(g.geometry_geom))) / 111320 as height_degrees
FROM geometries g
LEFT JOIN buildings b ON g.geometry_id = b.geometry_id
WHERE 
    (ST_XMax(ST_Envelope(g.geometry_geom)) - ST_XMin(ST_Envelope(g.geometry_geom))) > 10000  -- > ~0.09 degree width (~10km)
    OR (ST_YMax(ST_Envelope(g.geometry_geom)) - ST_YMin(ST_Envelope(g.geometry_geom))) > 10000  -- > ~0.09 degree height (~10km)
ORDER BY width_degrees DESC, height_degrees DESC;

-- Step 5: Delete buildings and geometries with very large bounding boxes
DELETE FROM buildings
WHERE geometry_id IN (
    SELECT geometry_id 
    FROM geometries 
    WHERE 
        (ST_XMax(ST_Envelope(geometry_geom)) - ST_XMin(ST_Envelope(geometry_geom))) > 10000
        OR (ST_YMax(ST_Envelope(geometry_geom)) - ST_YMin(ST_Envelope(geometry_geom))) > 10000
);

DELETE FROM geometries
WHERE 
    (ST_XMax(ST_Envelope(geometry_geom)) - ST_XMin(ST_Envelope(geometry_geom))) > 10000
    OR (ST_YMax(ST_Envelope(geometry_geom)) - ST_YMin(ST_Envelope(geometry_geom))) > 10000;

-- Step 6: Report what was removed
DO $$
DECLARE
    removed_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO removed_count 
    FROM geometries 
    WHERE ST_Area(geometry_geom) > 100000
       OR (ST_XMax(ST_Envelope(geometry_geom)) - ST_XMin(ST_Envelope(geometry_geom))) > 10000
       OR (ST_YMax(ST_Envelope(geometry_geom)) - ST_YMin(ST_Envelope(geometry_geom))) > 10000;
    
    RAISE NOTICE 'Large geometries found (if any remain, they will be listed above)';
END $$;
