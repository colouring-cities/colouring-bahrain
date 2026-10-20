import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';

import { apiGet } from '../../apiHelpers';

export function CityBoundaryLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet('/geometries/boundary-detailed.geojson')
            .then(data => {
                if (data && data.type === 'FeatureCollection') {
                    setBoundaryGeojson(data as GeoJsonObject);
                } else {
                    setBoundaryGeojson(null);
                }
            })
            .catch(() => setBoundaryGeojson(null));
    }, []);

    // Force no fill - return null to completely disable this layer
    return null;
    
    // Original code commented out to prevent any rendering
    // return boundaryGeojson &&
    //     <GeoJSON 
    //         data={boundaryGeojson} 
    //         style={{color: '#bbb', fill: false, fillOpacity: 0, weight: 1}}
    //         pathOptions={{fill: false, fillOpacity: 0}}
    //     />;
}