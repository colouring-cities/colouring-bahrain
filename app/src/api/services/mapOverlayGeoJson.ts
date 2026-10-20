/**
 * Map overlays from PostGIS (geometry lives in the DB, not hardcoded in frontend).
 */
import db from '../../db';

const SIMPLE_TABLES = [
    'map_parcels',
    'map_protection_zones',
    'map_moh_zones',
    'map_green_water_infrastructure',
] as const;

type SimpleTable = (typeof SIMPLE_TABLES)[number];

type LayerSpec =
    | { kind: 'table'; table: SimpleTable }
    | { kind: 'heritage'; layerCodes: string[] };

/** URL slug → query spec for /api/map-layers/:slug */
export const MAP_LAYER_SPECS: Record<string, LayerSpec> = {
    parcels: { kind: 'table', table: 'map_parcels' },
    'protection-zones': { kind: 'table', table: 'map_protection_zones' },
    'moh-zones': { kind: 'table', table: 'map_moh_zones' },
    'green-water': { kind: 'table', table: 'map_green_water_infrastructure' },
    'national-heritage': { kind: 'heritage', layerCodes: ['NHB'] },
    'world-heritage-properties': { kind: 'heritage', layerCodes: ['WH_PROPERTY'] },
    archaeological: { kind: 'heritage', layerCodes: ['ARC'] },
    'urban-heritage': { kind: 'heritage', layerCodes: ['UHA', 'UHB', 'UHC'] },
    'heritage-all': {
        kind: 'heritage',
        layerCodes: ['UHA', 'UHB', 'UHC', 'NHB', 'ARC', 'WH_PROPERTY'],
    },
};

/** Legacy export: slug → physical table name (for docs / diagnostics) */
export const MAP_LAYER_SLUG_TO_TABLE: Record<string, string> = Object.fromEntries(
    Object.entries(MAP_LAYER_SPECS).map(([slug, spec]) => [
        slug,
        spec.kind === 'table' ? spec.table : 'map_heritage_areas',
    ])
);

function buildCollectionSql(sourceSql: string): string {
    return `
        SELECT jsonb_build_object(
            'type', 'FeatureCollection',
            'features', COALESCE(
                (SELECT jsonb_agg(feature) FROM (
                    SELECT jsonb_build_object(
                        'type', 'Feature',
                        'id', src.id,
                        'geometry', ST_AsGeoJSON(src.geom)::jsonb,
                        'properties', to_jsonb(src) - 'geom' - 'id'
                    ) AS feature
                    FROM (${sourceSql}) src
                ) agg),
                '[]'::jsonb
            )
        ) AS collection
    `;
}

export async function getFeatureCollectionForSlug(slug: string): Promise<object> {
    const spec = MAP_LAYER_SPECS[slug];
    if (!spec) {
        throw new Error(`Invalid map overlay slug: ${slug}`);
    }

    if (spec.kind === 'table') {
        if (!(SIMPLE_TABLES as readonly string[]).includes(spec.table)) {
            throw new Error(`Invalid map overlay table: ${spec.table}`);
        }
        const sql = buildCollectionSql(`SELECT * FROM ${spec.table}`);
        const row = await db.one(sql);
        return row.collection as object;
    }

    // Property keys match client GIS + frontend colour helpers (Layer, Zoning_Type, English_Name)
    const sql = buildCollectionSql(`
        SELECT
            id,
            geom,
            name,
            layer_code AS "Layer",
            zoning_type AS "Zoning_Type",
            name AS "English_Name",
            parcel_no AS "Parcel_No",
            source_file,
            source_objectid AS "OBJECTID",
            properties
        FROM map_heritage_areas
        WHERE layer_code = ANY($1::text[])
    `);
    const row = await db.one(sql, [spec.layerCodes]);
    return row.collection as object;
}

/** Backward-compatible: only simple map_* tables */
export async function getFeatureCollectionForTable(table: string): Promise<object> {
    const slug = Object.entries(MAP_LAYER_SPECS).find(
        ([, s]) => s.kind === 'table' && s.table === table
    )?.[0];
    if (!slug) {
        throw new Error(`Invalid map overlay table: ${table}`);
    }
    return getFeatureCollectionForSlug(slug);
}
