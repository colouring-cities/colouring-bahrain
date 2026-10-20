-- Parcel number for Mapping address panel
ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS location_parcel_number text NULL;
