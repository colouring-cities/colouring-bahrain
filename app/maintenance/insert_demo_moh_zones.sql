-- Demo MOH-style zones around Bahrain (EPSG:4326). Safe for testing the map layer.
-- Run: PGPASSWORD='...' psql -h localhost -U ubuntu -d colouringcoredb -f insert_demo_moh_zones.sql
-- Optional: TRUNCATE map_moh_zones RESTART IDENTITY; before this if you want a clean slate.

INSERT INTO map_moh_zones (geom, name) VALUES
  -- Muharraq / airport side
  (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[50.605,26.235],[50.625,26.235],[50.625,26.255],[50.605,26.255],[50.605,26.235]]]}'), 4326), 'Muharraq North'),
  -- Manama core
  (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[50.565,26.215],[50.585,26.215],[50.585,26.235],[50.565,26.235],[50.565,26.215]]]}'), 4326), 'Manama Central'),
  -- Juffair / diplomatic area
  (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[50.595,26.205],[50.615,26.205],[50.615,26.225],[50.595,26.225],[50.595,26.205]]]}'), 4326), 'Juffair'),
  -- Seef / Diplomatic Area west
  (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[50.525,26.215],[50.545,26.215],[50.545,26.235],[50.525,26.235],[50.525,26.215]]]}'), 4326), 'Seef'),
  -- Budaiya / northwest coast
  (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[50.465,26.195],[50.495,26.195],[50.495,26.225],[50.465,26.225],[50.465,26.195]]]}'), 4326), 'Budaiya Coast'),
  -- Hamad Town / west
  (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[50.505,26.105],[50.535,26.105],[50.535,26.135],[50.505,26.135],[50.505,26.105]]]}'), 4326), 'Hamad Town South'),
  -- Sitra / industrial south
  (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[50.625,26.115],[50.655,26.115],[50.655,26.145],[50.625,26.145],[50.625,26.115]]]}'), 4326), 'Sitra'),
  -- Isa Town / central belt
  (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[50.545,26.165],[50.575,26.165],[50.575,26.195],[50.545,26.195],[50.545,26.165]]]}'), 4326), 'Isa Town'),
  -- Riffa / south
  (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[50.555,26.045],[50.590,26.045],[50.590,26.085],[50.555,26.085],[50.555,26.045]]]}'), 4326), 'Riffa South'),
  -- Northern Governorate inland
  (ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[50.485,26.255],[50.520,26.255],[50.520,26.285],[50.485,26.285],[50.485,26.255]]]}'), 4326), 'Northern Inland');

-- Verify
-- SELECT id, name, ST_AsText(ST_Envelope(geom)) FROM map_moh_zones ORDER BY id;
