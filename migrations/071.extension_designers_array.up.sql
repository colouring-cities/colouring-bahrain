-- extension_designers is edited as a list in the UI, so it must be a text array.
-- Values already written as Postgres array literals (e.g. '{name}') are parsed,
-- anything else becomes a single-element array.
ALTER TABLE buildings
    ALTER COLUMN extension_designers TYPE text[]
    USING (
        CASE
            WHEN extension_designers IS NULL THEN NULL
            WHEN extension_designers ~ '^\{.*\}$' THEN extension_designers::text[]
            ELSE ARRAY[extension_designers]
        END
    );
