import db from '../../db';

const MAP_OVERLAY_TABLES = [
    'map_parcels',
    'map_protection_zones',
    'map_moh_zones',
    'map_green_water_infrastructure',
] as const;

export type MapOverlayTable = (typeof MAP_OVERLAY_TABLES)[number];

function isMapOverlayTable(table: string): table is MapOverlayTable {
    return (MAP_OVERLAY_TABLES as readonly string[]).includes(table);
}

/**
 * GeoJSON FeatureCollection from table rows (all columns except geom become Feature properties).
 * Empty table returns { type: "FeatureCollection", features: [] }.
 */
export async function getFeatureCollectionForTable(table: string): Promise<object> {
    if (!isMapOverlayTable(table)) {
        throw new Error(`Invalid map overlay table: ${table}`);
    }
    const sql = `
        SELECT jsonb_build_object(
            'type', 'FeatureCollection',
            'features', COALESCE(
                (SELECT jsonb_agg(feature) FROM (
                    SELECT jsonb_build_object(
                        'type', 'Feature',
                        'id', id,
                        'geometry', ST_AsGeoJSON(geom)::jsonb,
                        'properties', to_jsonb(inputs) - 'geom'
                    ) AS feature
                    FROM (SELECT * FROM ${table}) inputs
                ) agg),
                '[]'::jsonb
            )
        ) AS collection
    `;
    const row = await db.one(sql);
    return row.collection as object;
}

/** URL slug -> table name for /api/map-layers/:slug */
export const MAP_LAYER_SLUG_TO_TABLE: Record<string, MapOverlayTable> = {
    parcels: 'map_parcels',
    'protection-zones': 'map_protection_zones',
    'moh-zones': 'map_moh_zones',
    'green-water': 'map_green_water_infrastructure',
};
