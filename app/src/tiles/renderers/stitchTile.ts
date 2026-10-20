import sharp from 'sharp';

import { RendererFunction, Tile, TileParams } from "../types";
import { getBbox, getXYZ, TILE_SIZE } from "../util";


async function stitchTile({ tileset, z, x, y, scale }: TileParams, dataParams: any, renderTile: RendererFunction): Promise<Tile> {
    const bbox = getBbox(z, x, y);
    const nextZ = z + 1;
    const nextXY = getXYZ(bbox, nextZ);
    const tileSize = TILE_SIZE * scale;


    const [topLeft, topRight, bottomLeft, bottomRight] = await Promise.all([
        [nextXY.minX, nextXY.minY],
        [nextXY.maxX, nextXY.minY],
        [nextXY.minX, nextXY.maxY],
        [nextXY.maxX, nextXY.maxY]
    ].map(([x, y]) => renderTile({ tileset, z: nextZ, x, y, scale }, dataParams).catch(() => null)));

    // Helper function to check if tile is valid and convert to buffer
    const isValidTile = (tile: any): boolean => {
        if (!tile) return false;
        if (Buffer.isBuffer(tile)) return tile.length > 0;
        // If it's a Sharp object or Image, we'll try to convert it
        return true;
    };

    // Convert tiles to buffers and validate
    const convertToBuffer = async (tile: any): Promise<Buffer | null> => {
        if (!tile) return null;
        if (Buffer.isBuffer(tile)) {
            return tile.length > 0 ? tile : null;
        }
        try {
            // If it's a Sharp object, convert to buffer
            const buffer = await sharp(tile).png().toBuffer();
            return buffer.length > 0 ? buffer : null;
        } catch {
            return null;
        }
    };

    const [topLeftBuf, topRightBuf, bottomLeftBuf, bottomRightBuf] = await Promise.all([
        convertToBuffer(topLeft),
        convertToBuffer(topRight),
        convertToBuffer(bottomLeft),
        convertToBuffer(bottomRight)
    ]);

    // Build composite array only with valid tiles
    const compositeInputs = [];
    if (topLeftBuf) {
        compositeInputs.push({input: topLeftBuf, gravity: sharp.gravity.northwest});
    }
    if (topRightBuf) {
        compositeInputs.push({input: topRightBuf, gravity: sharp.gravity.northeast});
    }
    if (bottomLeftBuf) {
        compositeInputs.push({input: bottomLeftBuf, gravity: sharp.gravity.southwest});
    }
    if (bottomRightBuf) {
        compositeInputs.push({input: bottomRightBuf, gravity: sharp.gravity.southeast});
    }
    
    // If no valid tiles, return a blank tile
    if (compositeInputs.length === 0) {
        return sharp({
            create: {
                width: tileSize,
                height: tileSize,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        }).png().toBuffer();
    }

    // If we have valid tiles, composite them
    if (compositeInputs.length > 0) {
        const compositedBuffer = await sharp({
            create: {
                width: tileSize * 2,
                height: tileSize * 2,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        }).composite(compositeInputs).png().toBuffer();
        
        return sharp(compositedBuffer)
            .resize(tileSize, tileSize, {fit: 'inside'})
            .png()
            .toBuffer();
    }
    
    // Fallback: return blank tile
    return sharp({
        create: {
            width: tileSize,
            height: tileSize,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    }).png().toBuffer();
}

export {
    stitchTile
};
