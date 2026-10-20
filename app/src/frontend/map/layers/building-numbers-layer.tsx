import * as React from 'react';
import { TileLayer } from 'react-leaflet';

import {getTileLayerUrl } from './get-tile-layer-url';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function BuildingNumbersLayer({revisionId}: {revisionId: string}) {
    const { editableBuildings } = useDisplayPreferences();
    if (editableBuildings !== 'enabled') {
        return null;
    }
    return <TileLayer
                key={`numbers-${revisionId}`} /* needed because TileLayer url is not mutable in react-leaflet v3 */
                url={getTileLayerUrl('number_labels', {rev: revisionId})}
                minZoom={17}
                maxZoom={19}
                detectRetina={false}
            />;
}
