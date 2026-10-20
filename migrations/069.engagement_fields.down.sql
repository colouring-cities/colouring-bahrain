ALTER TABLE buildings
    DROP COLUMN IF EXISTS engagement_full_name,
    DROP COLUMN IF EXISTS engagement_ownership_evidence,
    DROP COLUMN IF EXISTS engagement_attachments;
