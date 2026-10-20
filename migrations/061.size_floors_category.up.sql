-- Number of floors category (Morphology sub-layer)
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS size_floors_category text NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'buildings_size_floors_category_check'
    ) THEN
        ALTER TABLE buildings
            ADD CONSTRAINT buildings_size_floors_category_check
            CHECK (
                size_floors_category IS NULL
                OR size_floors_category IN (
                    'GF',
                    'GF+ Mezzanine',
                    'GF+1',
                    'GF+ Mezzanine+1',
                    'GF+2',
                    'GF+ Mezzanine+2',
                    'GF+3',
                    'GF+ Mezzanine+3',
                    'GF+4',
                    'More than GF+ 4'
                )
            );
    END IF;
END $$;
