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
        apiGet(getGeometryLayerRequestPath('parcel'))
            .then(data => {
                if (data && data.type === 'FeatureCollection') {
                    setBoundaryGeojson(data as GeoJsonObject);
                } else {
                    setBoundaryGeojson(null);
                }
            })
            .catch(() => setBoundaryGeojson(null));
    }, []);

    if(parcel == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution='Parcel boundaries — Colouring Bahrain'
        data={boundaryGeojson}
        style={{color: '#ff0', fill: false, weight: 1}}
       /* minNativeZoom={17}*/
    />;
    } else {
        return <div></div>
    }
}

