import { Feature, GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { getGeometryLayerRequestPath } from '../../config/geometry-layer-urls';
import { historicAreaClassificationColors } from '../../config/conservation-colors';
import { apiGet } from '../../apiHelpers';

const SITE_FILL = historicAreaClassificationColors.archaeologicalSite;

/**
 * Archaeological site polygons for Historic Area Classifications.
 * Site-name labels removed — they stacked on top of buildings and were not a client requirement.
 */
export function ArchaeologicalSitesLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet(getGeometryLayerRequestPath('archaeological'))
            .then((data) => {
                if (data && data.type === 'FeatureCollection') {
                    setBoundaryGeojson(data as GeoJsonObject);
                } else {
                    setBoundaryGeojson(null);
                }
            })
            .catch(() => setBoundaryGeojson(null));
    }, []);

    if (!boundaryGeojson) return <></>;

    return (
        <GeoJSON
            attribution="Archaeological sites — Colouring Bahrain"
            data={boundaryGeojson}
            style={{
                color: '#8a6a2f',
                fillColor: SITE_FILL,
                fill: true,
                fillOpacity: 1,
                weight: 2,
                opacity: 1,
            }}
        />
    );
}
