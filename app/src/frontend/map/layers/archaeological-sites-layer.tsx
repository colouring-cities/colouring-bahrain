import { Feature, FeatureCollection, GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getGeometryLayerRequestPath } from '../../config/geometry-layer-urls';
import { historicAreaClassificationColors } from '../../config/conservation-colors';
import { apiGet } from '../../apiHelpers';

const SITE_FILL = historicAreaClassificationColors.archaeologicalSite;

function getSiteName(feature: Feature): string {
    const props = feature.properties || {};
    return (
        props.English_Name ||
        props.NewName ||
        props.RefName ||
        props.name ||
        props.Zoning_Type ||
        ''
    );
}

function collectPolygonCoords(feature: Feature): [number, number][] {
    const geometry = feature.geometry;
    if (!geometry) return [];
    if (geometry.type === 'Polygon') {
        return geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
    }
    if (geometry.type === 'MultiPolygon') {
        const allCoords: [number, number][] = [];
        geometry.coordinates.forEach((polygon) => {
            polygon[0].forEach((coord: number[]) => {
                allCoords.push([coord[1], coord[0]]);
            });
        });
        return allCoords;
    }
    return [];
}

function ArchaeologicalSitesLayerContent({ geojson }: { geojson: GeoJsonObject }) {
    const map = useMap();

    useEffect(() => {
        if (geojson.type !== 'FeatureCollection') return;
        const collection = geojson as FeatureCollection;
        const tooltips: L.Tooltip[] = [];

        collection.features.forEach((feature) => {
            if (feature.type !== 'Feature') return;
            const name = getSiteName(feature);
            const coords = collectPolygonCoords(feature);
            if (!name || coords.length === 0) return;
            const latlng = L.latLngBounds(coords).getCenter();
            const tooltip = L.tooltip({
                permanent: true,
                direction: 'center',
                className: 'governorate-label',
                opacity: 0.85,
                interactive: false,
            }).setContent(name).setLatLng(latlng);
            tooltip.addTo(map);
            tooltips.push(tooltip);
        });

        return () => {
            tooltips.forEach((tooltip) => map.removeLayer(tooltip));
        };
    }, [geojson, map]);

    return (
        <GeoJSON
            attribution="Archaeological sites — Colouring Bahrain"
            data={geojson}
            style={{
                color: '#8a6a2f',
                fillColor: SITE_FILL,
                fill: true,
                fillOpacity: 0.45,
                weight: 2,
                opacity: 0.9,
            }}
        />
    );
}

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

    // Visibility is controlled by the parent (e.g. Historic Area Classifications map style)
    if (boundaryGeojson) {
        return <ArchaeologicalSitesLayerContent geojson={boundaryGeojson} />;
    }
    return <></>;
}
