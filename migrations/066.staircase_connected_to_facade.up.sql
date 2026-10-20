ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS staircase_connected_to_facade boolean NULL;
