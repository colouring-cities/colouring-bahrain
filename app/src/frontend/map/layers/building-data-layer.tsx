import * as React from 'react';
import { TileLayer } from 'react-leaflet';

import { BuildingMapTileset } from '../../config/tileserver-config';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { getTileLayerUrl, TILE_STYLE_REVISION } from './get-tile-layer-url';

/** 1×1 transparent PNG — stops Leaflet retry storms when a tileset 404/400s */
const EMPTY_TILE =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

export function BuildingDataLayer({tileset, revisionId} : { tileset: BuildingMapTileset, revisionId: string }) {
    const { editableBuildings } = useDisplayPreferences();

    if(editableBuildings == "enabled") {
        return <TileLayer
                key={`${tileset}-${revisionId}-${TILE_STYLE_REVISION}`} /* remount when style/tileset/data revision changes */
                url={getTileLayerUrl(tileset, {rev: revisionId})}
                errorTileUrl={EMPTY_TILE}
                minZoom={9}
                maxZoom={19}
                opacity={0.92}
                detectRetina={false}
            />;
    } else {
        return <div></div>
    }
}
