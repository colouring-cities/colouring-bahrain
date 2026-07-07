import { GeoJsonObject, Feature, FeatureCollection } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { apiGet } from '../../apiHelpers';

const GOVERNORATE_GEOJSON_URL = '/geometries/governorates.geojson';

function getGovernorateName(feature: Feature): string {
    const props = feature.properties || {};
    return (
        props.MIN_GOV_NM_EN ||
        props.NAME_1 ||
        props.name ||
        props.governorate_name ||
        props.governorate ||
        props.NAME ||
        props.NAME_EN ||
        ''
    );
}

function collectPolygonCoords(feature: Feature): [number, number][] {
    const geometry = feature.geometry;
    if (!geometry) return [];
    if (geometry.type === 'Polygon') {
        return geometry.coordinates[0].map((coord: [number, number]) => [coord[1], coord[0]]);
    }
    if (geometry.type === 'MultiPolygon') {
        const allCoords: [number, number][] = [];
        geometry.coordinates.forEach((polygon: [number, number][][]) => {
            polygon[0].forEach((coord: [number, number]) => {
                allCoords.push([coord[1], coord[0]]);
            });
        });
        return allCoords;
    }
    return [];
}

function GovernorateLayerContent({ geojson }: { geojson: GeoJsonObject }) {
    const map = useMap();

    useEffect(() => {
        if (geojson.type !== 'FeatureCollection') return;
        const collection = geojson as FeatureCollection;

        const labelsByName = new Map<string, [number, number][]>();
        collection.features.forEach((feature) => {
            if (feature.type !== 'Feature') return;
            const name = getGovernorateName(feature);
            if (!name) return;
            const coords = collectPolygonCoords(feature);
            if (coords.length === 0) return;
            const existing = labelsByName.get(name) || [];
            labelsByName.set(name, existing.concat(coords));
        });

        const tooltips: L.Tooltip[] = [];
        labelsByName.forEach((coords, name) => {
            const latlng = L.latLngBounds(coords).getCenter();
            const tooltip = L.tooltip({
                permanent: true,
                direction: 'center',
                className: 'governorate-label',
                opacity: 0.7,
                interactive: false
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
            data={geojson}
            style={{
                color: '#4a90e2',
                fill: true,
                fillColor: '#4a90e2',
                fillOpacity: 0.2,
                weight: 2,
                opacity: 0.8
            }}
        />
    );
}

export function GovernorateBoundaryLayer() {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);
    const { governorates } = useDisplayPreferences();

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

    if(governorates == "enabled" && boundaryGeojson) {
        return <GovernorateLayerContent geojson={boundaryGeojson} />;
    } else {
        return <></>
    }
}
