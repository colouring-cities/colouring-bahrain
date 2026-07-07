import * as React from 'react';
import { TileLayer } from 'react-leaflet';
import type { CCConfig } from '../../../cc-config';
import { useDisplayPreferences } from '../../displayPreferences-context';

const config: CCConfig = require('../../../cc-config.json');

/** Britain default; Bahrain should set historicMapTileUrl in cc-config.json when tiles exist */
const DEFAULT_HISTORIC_TILE =
    'https://mapseries-tilesets.s3.amazonaws.com/london_1890s/{z}/{x}/{y}.png';
const DEFAULT_HISTORIC_ATTRIBUTION =
    '&copy; CC BY 4.0 - Reproduced with the permission of the <a href="https://maps.nls.uk/">National Library of Scotland</a>';

export function HistoricMapLayer(_props: { revisionId: string }) {
    const { historicMap } = useDisplayPreferences();
    if (historicMap !== 'enabled') {
        return null;
    }

    const configuredUrl = config.historicMapTileUrl;
    if (configuredUrl === '') {
        return null;
    }
    const tileUrl =
        typeof configuredUrl === 'string' && configuredUrl.length > 0
            ? configuredUrl
            : DEFAULT_HISTORIC_TILE;
    const attribution =
        config.historicMapAttribution && config.historicMapAttribution.length > 0
            ? config.historicMapAttribution
            : DEFAULT_HISTORIC_ATTRIBUTION;

    return (
        <TileLayer url={tileUrl} attribution={attribution} maxNativeZoom={18} maxZoom={20} />
    );
}

