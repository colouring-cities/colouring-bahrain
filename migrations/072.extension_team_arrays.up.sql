-- These fields are configured as lists in the UI (data-fields-config), so the
-- columns must be text arrays to avoid the same corruption as extension_designers.
ALTER TABLE buildings
    ALTER COLUMN extension_builder TYPE text[]
    USING (
        CASE
            WHEN extension_builder IS NULL THEN NULL
            WHEN extension_builder ~ '^\{.*\}$' THEN extension_builder::text[]
            ELSE ARRAY[extension_builder]
        END
    );

ALTER TABLE buildings
    ALTER COLUMN extension_developer_name TYPE text[]
    USING (
        CASE
            WHEN extension_developer_name IS NULL THEN NULL
            WHEN extension_developer_name ~ '^\{.*\}$' THEN extension_developer_name::text[]
            ELSE ARRAY[extension_developer_name]
        END
    );
