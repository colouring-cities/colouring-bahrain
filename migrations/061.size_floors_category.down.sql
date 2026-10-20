ALTER TABLE buildings DROP CONSTRAINT IF EXISTS buildings_size_floors_category_check;
ALTER TABLE buildings DROP COLUMN IF EXISTS size_floors_category;
