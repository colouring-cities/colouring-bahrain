import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { getGeometryLayerRequestPath } from '../../config/geometry-layer-urls';
import { apiGet } from '../../apiHelpers';
import { useDisplayPreferences } from '../../displayPreferences-context';

export function ParcelBoundaryLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { parcel } = useDisplayPreferences();

    useEffect(() => {
        // The complete parcel layer is several MB; load it only when requested.
        if (parcel !== 'enabled' || boundaryGeojson) return;

        apiGet(getGeometryLayerRequestPath('parcel'))
            .then(data => {
                if (data && data.type === 'FeatureCollection') {
                    setBoundaryGeojson(data as GeoJsonObject);
                } else {
                    setBoundaryGeojson(null);
                }
            })
            .catch(() => setBoundaryGeojson(null));
    }, [parcel, boundaryGeojson]);

    if (parcel == "enabled" && boundaryGeojson) {
        return (
            <GeoJSON
                attribution='Parcel boundaries — Colouring Bahrain'
                data={boundaryGeojson}
                style={{ color: '#ff0', fill: false, weight: 1 }}
            />
        );
    }
    return <div></div>;
}
