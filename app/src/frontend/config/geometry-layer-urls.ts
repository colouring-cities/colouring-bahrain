import type { CCConfig } from '../../cc-config';

const config: CCConfig = require('../../cc-config.json');

const DEFAULT_GEOMETRY_URLS = {
    parcel: '/geometries/parcels.geojson',
    conservation: '/geometries/protection_zones.geojson',
    housing: '/geometries/housing_zones.geojson',
    creative: '/geometries/creative_enterprise_zones.geojson',
    flood: '/geometries/flood_zones_simplified.geojson',
    vista: '/geometries/protected_vistas.geojson',
    borough: '/geometries/boroughs.geojson',
    archaeological: '/geometries/archaeological_sites.geojson',
    urbanHeritage: '/geometries/urban_heritage.geojson',
} as const;

export type GeometryLayerKey = keyof typeof DEFAULT_GEOMETRY_URLS;

export function getGeometryLayerUrl(key: GeometryLayerKey): string {
    const configured = config.geometryLayerUrls?.[key];
    if (typeof configured === 'string' && configured.length > 0) {
        return configured;
    }
    return DEFAULT_GEOMETRY_URLS[key];
}

/**
 * Path passed to apiGet(): either a PostGIS-backed API route or a static /geometries/... URL.
 * API takes precedence when geometryLayerApiPaths[key] is non-empty.
 */
export function getGeometryLayerRequestPath(key: GeometryLayerKey): string {
    const apiPath = config.geometryLayerApiPaths?.[key];
    if (typeof apiPath === 'string' && apiPath.length > 0) {
        return apiPath.startsWith('/') ? apiPath : `/${apiPath}`;
    }
    return getGeometryLayerUrl(key);
}
