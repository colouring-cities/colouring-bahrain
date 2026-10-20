-- Seed mock categorical data so live map layers are not empty.
-- Safe to re-run: only fills NULL target columns (does not overwrite real values).

BEGIN;

-- Land Use (weighted toward Residential / Commercial / Mixed)
UPDATE buildings b
SET
    current_landuse_order = v.landuse,
    current_landuse_group = ARRAY[v.landuse]::text[]
FROM (
    SELECT
        building_id,
        (ARRAY[
            'Residential','Residential','Residential','Residential','Residential',
            'Commercial','Commercial','Commercial',
            'Mixed Used (Residential / Commercial)','Mixed Used (Residential / Commercial)',
            'Government buildings, Public Administration',
            'Educational','Cultural','Healthcare Facilities','Hospitality',
            'Recreational','Storage','Religious','Parking','Utility',
            'Formal Parking','Informal Parking','Informal Community Space',
            'Public Square','Unused land','Unidentified'
        ])[1 + (building_id % 26)] AS landuse
    FROM buildings
    WHERE current_landuse_order IS NULL
) v
WHERE b.building_id = v.building_id;

-- Typology
UPDATE buildings b
SET typology_classification = v.typology
FROM (
    SELECT
        building_id,
        (ARRAY[
            'Single House','Single House','Single House','Single House',
            'Multistorey Building','Multistorey Building','Multistorey Building',
            'Public Building','Public Building',
            'Single Shops','Single Shops',
            'Amarat','Amarat',
            'Utility'
        ])[1 + (building_id % 14)] AS typology
    FROM buildings
    WHERE typology_classification IS NULL
) v
WHERE b.building_id = v.building_id;

-- Number of floors
UPDATE buildings b
SET size_floors_category = v.floors
FROM (
    SELECT
        building_id,
        (ARRAY[
            'GF','GF','GF','GF',
            'GF+1','GF+1','GF+1',
            'GF+ Mezzanine','GF+ Mezzanine',
            'GF+2','GF+2',
            'GF+ Mezzanine+1',
            'GF+ Mezzanine+2',
            'GF+3',
            'GF+ Mezzanine+3',
            'GF+4',
            'More than GF+ 4'
        ])[1 + (building_id % 17)] AS floors
    FROM buildings
    WHERE size_floors_category IS NULL
) v
WHERE b.building_id = v.building_id;

-- Heritage value (all categories represented)
UPDATE buildings b
SET heritage_value = v.hv
FROM (
    SELECT
        building_id,
        (ARRAY[
            'Traditional','Traditional','Traditional',
            'Transitional','Transitional',
            'Modern Heritage','Modern Heritage',
            'Combination (Traditional/Transitional)',
            'Combination (Transitional/Modern Heritage)',
            'Combination (Heritage/Contemporary Architecture)',
            'Combination (Heritage/Non-Significant)',
            'Contemporary Architecture','Contemporary Architecture',
            'Non-Significant','Non-Significant','Non-Significant'
        ])[1 + (building_id % 16)] AS hv
    FROM buildings
    WHERE heritage_value IS NULL
) v
WHERE b.building_id = v.building_id;

-- Conservation designation: leave ~45% NULL so Null legend shows; rare World Heritage
UPDATE buildings b
SET conservation_designation = v.cd
FROM (
    SELECT
        building_id,
        CASE (building_id % 20)
            WHEN 0 THEN 'World Heritage'
            WHEN 1 THEN 'World Heritage'
            WHEN 2 THEN 'Regional Heritage'
            WHEN 3 THEN 'Regional Heritage'
            WHEN 4 THEN 'Regional Heritage'
            WHEN 5 THEN 'Regional Heritage'
            WHEN 6 THEN 'National Heritage'
            WHEN 7 THEN 'National Heritage'
            WHEN 8 THEN 'National Heritage'
            WHEN 9 THEN 'National Heritage'
            WHEN 10 THEN 'National Heritage'
            ELSE NULL
        END AS cd
    FROM buildings
    WHERE conservation_designation IS NULL
) v
WHERE b.building_id = v.building_id
  AND v.cd IS NOT NULL;

-- Footprint issues: only ~15% of buildings so the map stays mostly outlines
UPDATE buildings b
SET building_footprint_issues = v.issue
FROM (
    SELECT
        building_id,
        CASE (building_id % 20)
            WHEN 0 THEN 'Merged'
            WHEN 1 THEN 'Split'
            WHEN 2 THEN 'Unregistered'
            ELSE NULL
        END AS issue
    FROM buildings
    WHERE building_footprint_issues IS NULL
) v
WHERE b.building_id = v.building_id
  AND v.issue IS NOT NULL;

COMMIT;
