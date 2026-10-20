ALTER TABLE buildings DROP CONSTRAINT IF EXISTS buildings_building_footprint_issues_check;
ALTER TABLE buildings DROP COLUMN IF EXISTS building_footprint_issues;
