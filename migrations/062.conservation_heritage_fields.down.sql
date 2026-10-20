ALTER TABLE buildings DROP CONSTRAINT IF EXISTS buildings_heritage_value_check;
ALTER TABLE buildings DROP CONSTRAINT IF EXISTS buildings_conservation_designation_check;
ALTER TABLE buildings DROP COLUMN IF EXISTS heritage_value;
ALTER TABLE buildings DROP COLUMN IF EXISTS conservation_designation;
