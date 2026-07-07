import { Feature, GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { PathOptions } from 'leaflet';
import { getGeometryLayerRequestPath } from '../../config/geometry-layer-urls';
import { colorForProtectionZone } from '../../config/conservation-colors';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { apiGet } from '../../apiHelpers';

export function ConservationAreaBoundaryLayer({}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { conservation } = useDisplayPreferences();

    useEffect(() => {
        apiGet(getGeometryLayerRequestPath('conservation'))
            .then(data => {
                if (data && data.type === 'FeatureCollection') {
                    setBoundaryGeojson(data as GeoJsonObject);
                } else {
                    setBoundaryGeojson(null);
                }
            })
            .catch(() => setBoundaryGeojson(null));
    }, []);

    const zoneStyle = (feature?: Feature): PathOptions => {
        const props = feature?.properties || {};
        const fill = colorForProtectionZone(
            (props.Layer || props.name) as string | undefined
        );
        return {
            color: fill,
            fillColor: fill,
            fill: true,
            weight: 2,
            opacity: 0.9,
            fillOpacity: 0.35,
        };
    };

    if (conservation == "enabled") {
        return boundaryGeojson &&
        <GeoJSON
            attribution='Protection zones — Colouring Bahrain'
            data={boundaryGeojson}
            style={zoneStyle}
        />;
    } else if (conservation == "disabled") {
        return <div></div>;
    } else {
        return <></>;
    }
}
