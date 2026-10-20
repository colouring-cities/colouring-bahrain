import { MapTileset } from '../../config/tileserver-config';

/** Bump when Mapnik polygon colours change so browsers skip stale tiles */
export const TILE_STYLE_REVISION = '20260809hv1';

/**
 * Formats a CL tileserver URL for a tileset and a set of parameters
 * @param tileset the name of the tileset
 * @param parameters (optional) dictionary of parameter values
 * @returns A string with the formatted URL
 */
export function getTileLayerUrl<T extends MapTileset = MapTileset>(tileset: T, parameters?: Record<string, string>) {
    const params = {
        style: TILE_STYLE_REVISION,
        ...(parameters || {}),
    };
    const paramString = `?${new URLSearchParams(params).toString()}`;

    return `/tiles/${tileset}/{z}/{x}/{y}{r}.png${paramString}`;
}