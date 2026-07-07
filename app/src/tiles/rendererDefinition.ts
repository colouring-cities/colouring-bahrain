import { parseBooleanExact } from '../helpers';
import { getAllLayerNames, getBuildingLayerNames, getDataConfig, getLayerVariables } from "./dataDefinition";
import { createBlankTile } from "./renderers/createBlankTile";
import { getTileWithCaching } from "./renderers/getTileWithCaching";
import { renderDataSourceTile } from "./renderers/renderDataSourceTile";
import { stitchTile } from "./renderers/stitchTile";
import { TileCache } from "./tileCache";
import { BoundingBox, Tile, TileParams } from "./types";
import { isOutsideExtent } from "./util";
import { CCConfig } from '../cc-config';
let config: CCConfig = require('../cc-config.json')

const allTilesets = getAllLayerNames();
const STITCH_THRESHOLD = 12;

// The coordinates the server allows
const EXTENT_BBOX: BoundingBox = config.bbox;

const allLayersCacheSwitch = parseBooleanExact(process.env.CACHE_TILES) ?? true;
const dataLayersCacheSwitch = parseBooleanExact(process.env.CACHE_DATA_TILES) ?? true;
let shouldCacheFn: (t: TileParams) => boolean;

if(!allLayersCacheSwitch) {
    shouldCacheFn = t => false;
} else if(dataLayersCacheSwitch) {
    shouldCacheFn = ({ tileset, z }: TileParams) => z <= 18;
} else {
    shouldCacheFn = ({ tileset, z }: TileParams) =>
        ['base_light', 'base_night', 'base_night_outlines', 'base_boroughs'].includes(tileset) && z <= 18;
}

const MIN_ZOOM_FOR_RENDERING_TILES = 9
const MAX_ZOOM_FOR_RENDERING_TILES = 19

const tileCache = new TileCache(
    process.env.TILECACHE_PATH,
    {
        tilesets: getBuildingLayerNames(),
        minZoom: MIN_ZOOM_FOR_RENDERING_TILES,
        maxZoom: MAX_ZOOM_FOR_RENDERING_TILES,
        scales: [1, 2]
    },
    shouldCacheFn,
    
    // FIX: Changed 'base_borough' to 'base_boroughs' to match the actual tileset name
    (tileset: string) => 
        !['base_light', 'base_night', 'base_night_outlines', 'base_boroughs', 
          'planning_applications_status_recent', 'planning_applications_status_very_recent', 
          'planning_applications_status_all'].includes(tileset)
);

const renderBuildingTile = (t: TileParams, d: any) => renderDataSourceTile(t, d, getDataConfig, getLayerVariables);

function cacheOrCreateBuildingTile(tileParams: TileParams, dataParams: any): Promise<Tile> {
    return getTileWithCaching(tileParams, dataParams, tileCache, stitchOrRenderBuildingTile);
}

function stitchOrRenderBuildingTile(tileParams: TileParams, dataParams: any): Promise<Tile> {
    // Bypass the summary grid and ALWAYS render individual buildings
    return renderBuildingTile(tileParams, dataParams);
}

function renderTile(tileParams: TileParams, dataParams: any): Promise<Tile> {
    // CHECK 1: Bounding Box Check
    if (isOutsideExtent(tileParams, EXTENT_BBOX)) {
        console.warn(`[TileServer] Tile ${tileParams.z}/${tileParams.x}/${tileParams.y} rejected: Outside BBOX ${JSON.stringify(EXTENT_BBOX)}`);
        return createBlankTile();
    }

    // CHECK 2: Zoom Level Check
    if (tileParams.z < MIN_ZOOM_FOR_RENDERING_TILES || tileParams.z > MAX_ZOOM_FOR_RENDERING_TILES) {
        console.warn(`[TileServer] Tile rejected: Zoom ${tileParams.z} outside range (${MIN_ZOOM_FOR_RENDERING_TILES}-${MAX_ZOOM_FOR_RENDERING_TILES})`);
        return createBlankTile();
    }

    if (tileParams.tileset === 'highlight') {
        return renderBuildingTile(tileParams, dataParams);
    }

    return cacheOrCreateBuildingTile(tileParams, dataParams);
}

export { allTilesets, renderTile, tileCache };