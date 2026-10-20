import mapnik from "mapnik";
import path from 'path';
import fs from 'fs';
import { promisify } from "util";

import { TableDefinitionFunction, VariablesFunction, Tile, TileParams } from "../types";
import { getBbox, TILE_SIZE } from "../util";
import { getMapnikPostgisConnection } from "../../pgConnectionConfig";


const TILE_BUFFER_SIZE = 64;
const PROJ4_STRING = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs +over';

const DATASOURCE_CONFIG = {
    ...getMapnikPostgisConnection(),
    extent: '-20005048.4188,-9039211.13765,19907487.2779,17096598.5401',
    srid: 3857,
    type: 'postgis',
};

// register datasource adapters for mapnik database connection
if (mapnik.register_default_input_plugins) {
    mapnik.register_default_input_plugins();
}
// register fonts for text rendering
mapnik.register_default_fonts();


async function renderDataSourceTile(
    { tileset, z, x, y, scale }: TileParams, 
    dataParams: any, 
    getTableDefinitionFn: TableDefinitionFunction,
    getVariablesFn: VariablesFunction
): Promise<Tile> {
    const bbox = getBbox(z, x, y);

    const tileSize = TILE_SIZE * scale;
    let map = new mapnik.Map(tileSize, tileSize, PROJ4_STRING);
    map.bufferSize = TILE_BUFFER_SIZE;
    const layer = new mapnik.Layer('tile', PROJ4_STRING);

    const dataSourceConfig = getTableDefinitionFn(tileset);
    const dataSourceVariables = getVariablesFn(tileset, dataParams);

    const conf = Object.assign(dataSourceConfig, DATASOURCE_CONFIG);
    const vars = Object.assign(dataSourceVariables, { zoom: z});

    const postgis = new mapnik.Datasource(conf);
    layer.datasource = postgis;
    layer.styles = [tileset];

    // map_styles is copied to build/map_styles by webpack CopyPlugin
    // When compiled, this file is in build/tiles/renderers/, so go up to build/ then to map_styles
    // Also try absolute path as fallback
    let stylePath = path.resolve(__dirname, '..', '..', 'map_styles', 'polygon.xml');
    
    // Fallback: try absolute path if relative doesn't work
    if (!fs.existsSync(stylePath)) {
        // Try from process.cwd() if __dirname path doesn't work
        stylePath = path.resolve(process.cwd(), 'build', 'map_styles', 'polygon.xml');
    }
    if (!fs.existsSync(stylePath)) {
        // Final fallback: absolute path
        stylePath = '/home/ubuntu/colouring-core/app/build/map_styles/polygon.xml';
    }

    map = await promisify(map.load.bind(map))(stylePath, { strict: true });

    map.add_layer(layer);
    const im = new mapnik.Image(map.width, map.height);
    map.extent = bbox;
    const rendered = await promisify(map.render.bind(map))(im, { variables: vars});

    return await promisify(rendered.encode.bind(rendered))('png');
}


export {
    renderDataSourceTile
};
