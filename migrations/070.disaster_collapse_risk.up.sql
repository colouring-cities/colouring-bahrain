ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS disaster_collapse_risk boolean NULL;
