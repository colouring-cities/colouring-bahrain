ALTER TABLE buildings
    ALTER COLUMN extension_designers TYPE text
    USING array_to_string(extension_designers, ', ');
