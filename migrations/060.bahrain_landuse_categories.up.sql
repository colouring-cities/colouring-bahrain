-- Bahrain Land Use taxonomy + client legend colours (orders/groups)
UPDATE buildings
SET current_landuse_order = NULL,
    current_landuse_group = NULL,
    current_landuse_class = NULL
WHERE current_landuse_order IS NOT NULL
   OR current_landuse_group IS NOT NULL
   OR current_landuse_class IS NOT NULL;

DELETE FROM reference_tables.buildings_landuse_class;
DELETE FROM reference_tables.buildings_landuse_group;
DELETE FROM reference_tables.buildings_landuse_order;

INSERT INTO reference_tables.buildings_landuse_order (landuse_id, description) VALUES
('BH01', 'Residential'),
('BH02', 'Commercial'),
('BH03', 'Mixed Used (Residential / Commercial)'),
('BH04', 'Government buildings, Public Administration'),
('BH05', 'Educational'),
('BH06', 'Cultural'),
('BH07', 'Healthcare Facilities'),
('BH08', 'Hospitality'),
('BH09', 'Recreational'),
('BH10', 'Storage'),
('BH11', 'Religious'),
('BH12', 'Parking'),
('BH13', 'Utility'),
('BH14', 'Formal Parking'),
('BH15', 'Informal Parking'),
('BH16', 'Informal Community Space'),
('BH17', 'Public Square'),
('BH18', 'Unused land'),
('BH19', 'Unidentified'),
('BH20', 'Missing data');

INSERT INTO reference_tables.buildings_landuse_group (landuse_id, description, parent_order_id) VALUES
('BH01', 'Residential', 'BH01'),
('BH02', 'Commercial', 'BH02'),
('BH03', 'Mixed Used (Residential / Commercial)', 'BH03'),
('BH04', 'Government buildings, Public Administration', 'BH04'),
('BH05', 'Educational', 'BH05'),
('BH06', 'Cultural', 'BH06'),
('BH07', 'Healthcare Facilities', 'BH07'),
('BH08', 'Hospitality', 'BH08'),
('BH09', 'Recreational', 'BH09'),
('BH10', 'Storage', 'BH10'),
('BH11', 'Religious', 'BH11'),
('BH12', 'Parking', 'BH12'),
('BH13', 'Utility', 'BH13'),
('BH14', 'Formal Parking', 'BH14'),
('BH15', 'Informal Parking', 'BH15'),
('BH16', 'Informal Community Space', 'BH16'),
('BH17', 'Public Square', 'BH17'),
('BH18', 'Unused land', 'BH18'),
('BH19', 'Unidentified', 'BH19'),
('BH20', 'Missing data', 'BH20');
