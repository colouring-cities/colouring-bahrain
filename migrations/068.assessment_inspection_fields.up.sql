ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS inspection_undergone boolean NULL,
    ADD COLUMN IF NOT EXISTS inspection_date date NULL,
    ADD COLUMN IF NOT EXISTS inspection_purpose text NULL;
