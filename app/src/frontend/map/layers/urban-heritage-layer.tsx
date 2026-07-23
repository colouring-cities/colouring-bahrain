import { Feature, GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { PathOptions } from 'leaflet';
import { getGeometryLayerRequestPath } from '../../config/geometry-layer-urls';
import { historicAreaClassificationColors } from '../../config/conservation-colors';
import { apiGet } from '../../apiHelpers';

/** Match UHA / UHB / UHC (and variants) to Historic Area Classification colours */
export function colorForUrbanHeritage(feature?: Feature): string {
    const props = feature?.properties || {};
    const label = `${props.Layer || ''} ${props.Zoning_Type || ''}`.toLowerCase();
    if (label.includes('uhc') || label.includes('heritage c')) {
        return historicAreaClassificationColors.urbanHeritageC;
    }
    if (label.includes('uhb') || label.includes('heritage b')) {
        return historicAreaClassificationColors.urbanHeritageB;
    }
    // UHa / Urban Heritage a (default)
    return historicAreaClassificationColors.urbanHeritageA;
}

function urbanHeritageStyle(feature?: Feature): PathOptions {
    const fill = colorForUrbanHeritage(feature);
    return {
        color: '#1f4a47',
        fillColor: fill,
        fill: true,
        weight: 1,
        opacity: 0.9,
        fillOpacity: 0.65,
    };
}

/**
 * Parcel-level Urban Heritage A/B/C overlays.
 * Shown under Conservation → Historic Area Classifications (matches BACA historic areas maps).
 */
export function UrbanHeritageLayer() {
    const [geojson, setGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet(getGeometryLayerRequestPath('urbanHeritage'))
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
            attribution="Urban Heritage parcels — BACA / Colouring Bahrain"
            data={geojson}
            style={urbanHeritageStyle}
        />
    );
}
