-- Conservation: Designation / Protection + Heritage Value categorical fields
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS conservation_designation text NULL;

ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS heritage_value text NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'buildings_conservation_designation_check'
    ) THEN
        ALTER TABLE buildings
            ADD CONSTRAINT buildings_conservation_designation_check
            CHECK (
                conservation_designation IS NULL
                OR conservation_designation IN (
                    'World Heritage',
                    'Regional Heritage',
                    'National Heritage'
                )
            );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'buildings_heritage_value_check'
    ) THEN
        ALTER TABLE buildings
            ADD CONSTRAINT buildings_heritage_value_check
            CHECK (
                heritage_value IS NULL
                OR heritage_value IN (
                    'Traditional',
                    'Transitional',
                    'Modern Heritage',
                    'Combination (Traditional/Transitional)',
                    'Combination (Transitional/Modern Heritage)',
                    'Combination (Heritage/Contemporary Architecture)',
                    'Combination (Heritage/Non-Significant)',
                    'Contemporary Architecture',
                    'Non-Significant'
                )
            );
    END IF;
END $$;
