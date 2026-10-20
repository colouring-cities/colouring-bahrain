import { Feature, GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { PathOptions } from 'leaflet';
import { getGeometryLayerRequestPath } from '../../config/geometry-layer-urls';
import { designationProtectionColors } from '../../config/conservation-colors';
import { apiGet } from '../../apiHelpers';

const WH_FILL = designationProtectionColors.worldHeritage;

function isMarineOrZone(feature?: Feature): boolean {
    const props = feature?.properties || {};
    const name = String(props.English_Name || props.Name || '').toLowerCase();
    // Hayr beds / large seashore extents — lighter wash for readability
    if (name.includes('hayr') || name.includes('seashore')) return true;
    return false;
}

function worldHeritageStyle(feature?: Feature): PathOptions {
    if (isMarineOrZone(feature)) {
        return {
            color: WH_FILL,
            fillColor: WH_FILL,
            fill: true,
            weight: 2,
            opacity: 0.95,
            fillOpacity: 0.25,
            dashArray: '4 3',
        };
    }
    return {
        color: WH_FILL,
        fillColor: WH_FILL,
        fill: true,
        weight: 2,
        opacity: 1,
        fillOpacity: 1,
    };
}

/**
 * Client World Heritage property polygons (buildings + marine components).
 * Shown with Designation / Protection and Historic Area classifications.
 * Permanent name labels removed (stacked over buildings; not requested by client).
 */
export function WorldHeritagePropertiesLayer() {
    const [geojson, setGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet(getGeometryLayerRequestPath('worldHeritageProperties'))
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
            attribution="World Heritage properties — Pearling path / BACA"
            data={geojson}
            style={worldHeritageStyle}
        />
    );
}
