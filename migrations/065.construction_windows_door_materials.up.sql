-- Windows and door materials for Construction & Design side panel
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS construction_windows_material text NULL,
    ADD COLUMN IF NOT EXISTS construction_windows_material_source_type text NULL,
    ADD COLUMN IF NOT EXISTS construction_windows_material_source_links text[] NULL,
    ADD COLUMN IF NOT EXISTS construction_door_material text NULL,
    ADD COLUMN IF NOT EXISTS construction_door_material_source_type text NULL,
    ADD COLUMN IF NOT EXISTS construction_door_material_source_links text[] NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'buildings_construction_windows_material_check'
    ) THEN
        ALTER TABLE buildings
            ADD CONSTRAINT buildings_construction_windows_material_check
            CHECK (
                construction_windows_material IS NULL
                OR construction_windows_material IN ('Wood', 'Steel', 'Aluminium', 'Other')
            );
    END IF;
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'buildings_construction_door_material_check'
    ) THEN
        ALTER TABLE buildings
            ADD CONSTRAINT buildings_construction_door_material_check
            CHECK (
                construction_door_material IS NULL
                OR construction_door_material IN ('Wood', 'Steel', 'Aluminium', 'Other')
            );
    END IF;
END $$;
