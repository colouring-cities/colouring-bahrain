-- Building footprint issues (Mapping sub-layer)
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS building_footprint_issues text NULL;

-- Optional check: only allow Bahrain legend categories
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'buildings_building_footprint_issues_check'
    ) THEN
        ALTER TABLE buildings
            ADD CONSTRAINT buildings_building_footprint_issues_check
            CHECK (
                building_footprint_issues IS NULL
                OR building_footprint_issues IN ('Merged', 'Split', 'Unregistered')
            );
    END IF;
END $$;
