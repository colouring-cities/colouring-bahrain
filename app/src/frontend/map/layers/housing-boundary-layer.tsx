import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { getGeometryLayerRequestPath } from '../../config/geometry-layer-urls';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function HousingBoundaryLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { housing } = useDisplayPreferences();

    useEffect(() => {
        apiGet(getGeometryLayerRequestPath('housing'))
            .then(data => {
                if (data && data.type === 'FeatureCollection') {
                    setBoundaryGeojson(data as GeoJsonObject);
                } else {
                    setBoundaryGeojson(null);
                }
            })
            .catch(() => setBoundaryGeojson(null));
    }, []);

    if(housing == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution="MOH / zoning overlay (local data)."
        data={boundaryGeojson}
        style={{
            color: '#FF8000',
            fill: true,
            fillOpacity: 0.12,
            weight: 2,
            opacity: 0.9,
        }}
    />;
    } else if (housing == "disabled") {
        return <div></div>
    }
}
