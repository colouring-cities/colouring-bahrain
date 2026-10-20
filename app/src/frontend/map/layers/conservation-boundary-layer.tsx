import { Feature, FeatureCollection } from 'geojson';
import React, { useEffect, useMemo, useState } from 'react';
import { GeoJSON, Pane } from 'react-leaflet';
import { PathOptions } from 'leaflet';
import { getGeometryLayerRequestPath } from '../../config/geometry-layer-urls';
import {
    ProtectionZoneKind,
    fillOpacityForProtectionZone,
    kindForProtectionZone,
    protectionZoneColors,
    protectionZoneDrawOrder,
    zoneLabel,
} from '../../config/conservation-colors';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { apiGet } from '../../apiHelpers';

import './protection-zones-layer.css';

const KIND_ORDER: ProtectionZoneKind[] = [
    'consultationNational',
    'secondaryNational',
    'primaryNational',
    'worldHeritage',
];

function sortProtectionZones(data: FeatureCollection): FeatureCollection {
    const features = [...(data.features || [])].sort((a, b) => {
        const aKind = kindForProtectionZone(zoneLabel(a.properties as Record<string, unknown>));
        const bKind = kindForProtectionZone(zoneLabel(b.properties as Record<string, unknown>));
        const aOrder = protectionZoneDrawOrder[aKind];
        const bOrder = protectionZoneDrawOrder[bKind];
        if (aOrder !== bOrder) return aOrder - bOrder;
        const aId = Number(a.properties?.OBJECTID ?? a.id ?? 0);
        const bId = Number(b.properties?.OBJECTID ?? b.id ?? 0);
        return aId - bId;
    });
    return { type: 'FeatureCollection', features };
}

function partitionByKind(data: FeatureCollection): Record<ProtectionZoneKind, FeatureCollection> {
    const buckets: Record<ProtectionZoneKind, Feature[]> = {
        worldHeritage: [],
        primaryNational: [],
        secondaryNational: [],
        consultationNational: [],
    };
    (data.features || []).forEach((ft) => {
        if (ft.type !== 'Feature') return;
        const kind = kindForProtectionZone(zoneLabel(ft.properties as Record<string, unknown>));
        buckets[kind].push(ft);
    });
    const out = {} as Record<ProtectionZoneKind, FeatureCollection>;
    KIND_ORDER.forEach((k) => {
        out[k] = { type: 'FeatureCollection', features: buckets[k] };
    });
    return out;
}

/** Solid transparent fill (no hatch) — Colouring Cities style */
function styleForKind(kind: ProtectionZoneKind): PathOptions {
    return {
        color: protectionZoneColors[kind],
        fillColor: protectionZoneColors[kind],
        fill: true,
        weight: kind === 'consultationNational' ? 2 : 1.75,
        opacity: 1,
        fillOpacity: fillOpacityForProtectionZone(kind),
        className: `pz-path pz-${kind}`,
    };
}

function ProtectionZoneKindLayer({
    kind,
    data,
}: {
    kind: ProtectionZoneKind;
    data: FeatureCollection;
}) {
    if (!data.features.length) return null;

    const style = styleForKind(kind);

    return (
        <GeoJSON
            key={`pz-${kind}-${data.features.length}`}
            data={data}
            style={() => style}
        />
    );
}

export function ConservationAreaBoundaryLayer({}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<FeatureCollection | null>(null);
    const { conservation } = useDisplayPreferences();

    useEffect(() => {
        apiGet(getGeometryLayerRequestPath('conservation'))
            .then((data) => {
                if (data && data.type === 'FeatureCollection') {
                    setBoundaryGeojson(sortProtectionZones(data as FeatureCollection));
                } else {
                    setBoundaryGeojson(null);
                }
            })
            .catch(() => setBoundaryGeojson(null));
    }, []);

    const byKind = useMemo(
        () => (boundaryGeojson ? partitionByKind(boundaryGeojson) : null),
        [boundaryGeojson]
    );

    if (conservation !== 'enabled' || !byKind) {
        return conservation === 'disabled' ? <div></div> : <></>;
    }

    return (
        <Pane name="cc-protection-zones" style={{ zIndex: 350 }}>
            {KIND_ORDER.map((kind) => (
                <ProtectionZoneKindLayer
                    key={kind}
                    kind={kind}
                    data={byKind[kind]}
                />
            ))}
        </Pane>
    );
}
