import { Feature, GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { PathOptions } from 'leaflet';
import { getGeometryLayerRequestPath } from '../../config/geometry-layer-urls';
import { historicAreaClassificationColors } from '../../config/conservation-colors';
import { apiGet } from '../../apiHelpers';

const NHB_FILL = historicAreaClassificationColors.nationalHeritageBuilding;

function nationalHeritageStyle(_feature?: Feature): PathOptions {
    return {
        color: '#8a4a3a',
        fillColor: NHB_FILL,
        fill: true,
        weight: 1,
        opacity: 1,
        // Solid fill (client: historic area classifications looked washed/transparent)
        fillOpacity: 1,
    };
}

/**
 * National Heritage Building parcels (NHB).
 * Shown under Conservation → Historic Area Classifications.
 */
export function NationalHeritageLayer() {
    const [geojson, setGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet(getGeometryLayerRequestPath('nationalHeritage'))
            .then((data) => {
                if (data && data.type === 'FeatureCollection') {
                    setGeojson(data as GeoJsonObject);
                } else {
                    setGeojson(null);
                }
            })
            .catch(() => setGeojson(null));
    }, []);

    if (!geojson) return null;

    return (
        <GeoJSON
            attribution="National Heritage Buildings — BACA / Colouring Bahrain"
            data={geojson}
            style={nationalHeritageStyle}
        />
    );
}
