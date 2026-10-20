import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { apiGet } from '../../apiHelpers';

const GOVERNORATE_GEOJSON_URL = '/geometries/governorates.geojson';

/** Awards map view: dashed purple governorate borders (other border types when geometry exists). */
export function AwardsBordersLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet(GOVERNORATE_GEOJSON_URL)
            .then(data => {
                if (data && data.type === 'FeatureCollection') {
                    setBoundaryGeojson(data as GeoJsonObject);
                } else {
                    setBoundaryGeojson(null);
                }
            })
            .catch(() => setBoundaryGeojson(null));
    }, []);

    if (!boundaryGeojson) {
        return null;
    }

    return (
        <GeoJSON
            attribution="Governorate borders — Colouring Bahrain"
            data={boundaryGeojson}
            style={{
                color: '#7a2d6b',
                fill: false,
                weight: 2.5,
                opacity: 0.95,
                dashArray: '8 6',
            }}
        />
    );
}
