ALTER TABLE buildings DROP CONSTRAINT IF EXISTS buildings_construction_windows_material_check;
ALTER TABLE buildings DROP CONSTRAINT IF EXISTS buildings_construction_door_material_check;
ALTER TABLE buildings
    DROP COLUMN IF EXISTS construction_windows_material,
    DROP COLUMN IF EXISTS construction_windows_material_source_type,
    DROP COLUMN IF EXISTS construction_windows_material_source_links,
    DROP COLUMN IF EXISTS construction_door_material,
    DROP COLUMN IF EXISTS construction_door_material_source_type,
    DROP COLUMN IF EXISTS construction_door_material_source_links;
