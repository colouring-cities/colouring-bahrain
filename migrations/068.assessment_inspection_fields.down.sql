ALTER TABLE buildings
    DROP COLUMN IF EXISTS inspection_undergone,
    DROP COLUMN IF EXISTS inspection_date,
    DROP COLUMN IF EXISTS inspection_purpose;
