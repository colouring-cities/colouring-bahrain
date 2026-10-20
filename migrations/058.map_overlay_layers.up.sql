-- Optional map overlays (WGS84 / EPSG:4326), served as GeoJSON via /api/map-layers/*
-- Load data examples:
--   ogr2ogr -f PostgreSQL PG:"..." parcels.shp -nln map_parcels -lco GEOMETRY_NAME=geom -t_srs EPSG:4326
--   Or: INSERT INTO map_parcels (geom, name) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('...'), 4326), 'A');

BEGIN;

CREATE TABLE IF NOT EXISTS map_parcels (
    id SERIAL PRIMARY KEY,
    geom geometry(Geometry, 4326) NOT NULL,
    name TEXT
);

CREATE TABLE IF NOT EXISTS map_protection_zones (
    id SERIAL PRIMARY KEY,
    geom geometry(Geometry, 4326) NOT NULL,
    name TEXT
);

CREATE TABLE IF NOT EXISTS map_moh_zones (
    id SERIAL PRIMARY KEY,
    geom geometry(Geometry, 4326) NOT NULL,
    name TEXT
);

CREATE TABLE IF NOT EXISTS map_green_water_infrastructure (
    id SERIAL PRIMARY KEY,
    geom geometry(Geometry, 4326) NOT NULL,
    name TEXT
);

CREATE INDEX IF NOT EXISTS map_parcels_geom_gix ON map_parcels USING GIST (geom);
CREATE INDEX IF NOT EXISTS map_protection_zones_geom_gix ON map_protection_zones USING GIST (geom);
CREATE INDEX IF NOT EXISTS map_moh_zones_geom_gix ON map_moh_zones USING GIST (geom);
CREATE INDEX IF NOT EXISTS map_green_water_infrastructure_geom_gix ON map_green_water_infrastructure USING GIST (geom);

COMMIT;
