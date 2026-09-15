-- Find geometries that are causing the large box issue
-- Check for geometries between 1 sq km and 10 sq km (might be the culprit)

SELECT 
    g.geometry_id,
    b.building_id,
    ST_Area(g.geometry_geom) as area_sq_meters,
    ST_Area(g.geometry_geom) / 1000000 as area_sq_km,
    (ST_XMax(ST_Envelope(g.geometry_geom)) - ST_XMin(ST_Envelope(g.geometry_geom))) / 111320 as width_degrees,
    (ST_YMax(ST_Envelope(g.geometry_geom)) - ST_YMin(ST_Envelope(g.geometry_geom))) / 111320 as height_degrees,
    ST_XMin(ST_Envelope(g.geometry_geom)) as xmin,
    ST_YMin(ST_Envelope(g.geometry_geom)) as ymin,
    ST_XMax(ST_Envelope(g.geometry_geom)) as xmax,
    ST_YMax(ST_Envelope(g.geometry_geom)) as ymax
FROM geometries g
LEFT JOIN buildings b ON g.geometry_id = b.geometry_id
WHERE ST_Area(g.geometry_geom) > 1000000  -- Larger than 1 sq km
ORDER BY area_sq_meters DESC
LIMIT 50;
