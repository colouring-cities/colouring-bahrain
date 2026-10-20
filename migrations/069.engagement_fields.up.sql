ALTER TABLE buildings
    ADD COLUMN IF NOT EXISTS engagement_full_name text NULL,
    ADD COLUMN IF NOT EXISTS engagement_ownership_evidence text NULL,
    ADD COLUMN IF NOT EXISTS engagement_attachments text[] NULL;
