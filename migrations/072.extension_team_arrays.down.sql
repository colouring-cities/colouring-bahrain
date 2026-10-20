ALTER TABLE buildings
    ALTER COLUMN extension_builder TYPE text
    USING array_to_string(extension_builder, ', ');

ALTER TABLE buildings
    ALTER COLUMN extension_developer_name TYPE text
    USING array_to_string(extension_developer_name, ', ');
