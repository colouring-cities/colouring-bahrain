/**
 * BACA Protective Zoning Map — colours assigned (exact codes).
 * World Heritage #00467c | Primary #a01033 | Secondary #ae7c86 | Consultation #ccb2aa
 * (Consultation hex will be updated when client sends the new code.)
 */
export const designationProtectionColors = {
    worldHeritage: '#00467c',
    regionalHeritage: '#85e6d7',
    nationalHeritage: '#C27364',
} as const;

export const historicAreaClassificationColors = {
    archaeologicalSite: '#E8C992',
    urbanHeritageA: '#DFEFEE',
    urbanHeritageB: '#A1BAB8',
    urbanHeritageC: '#638481',
    nationalHeritageBuilding: '#C27364',
    heritageGarden: '#BCC493',
} as const;

export const heritageValueColors = {
    traditional: '#c72e08',
    transitional: '#ffbea1',
    modernHeritage: '#95beba',
    combinationTraditionalTransitional: '#e75b42',
    combinationTransitionalModern: '#597c78',
    combinationHeritageContemporary: '#e2896f',
    combinationHeritageNonSignificant: '#8f0303',
    contemporaryArchitecture: '#344891',
    nonSignificant: '#ede6df',
} as const;

/** Exact zone hex codes (stroke + solid transparent fill) */
export const protectionZoneColors = {
    worldHeritage: '#00467c',
    primaryNational: '#a01033',
    secondaryNational: '#ae7c86',
    consultationNational: '#ccb2aa',
} as const;

export type ProtectionZoneKind =
    | 'worldHeritage'
    | 'primaryNational'
    | 'secondaryNational'
    | 'consultationNational';

export const protectionZoneDrawOrder: Record<ProtectionZoneKind, number> = {
    consultationNational: 0,
    secondaryNational: 1,
    primaryNational: 2,
    worldHeritage: 3,
};

export const protectionZoneLegendItems: {
    kind: ProtectionZoneKind;
    label: string;
    color: string;
}[] = [
    { kind: 'worldHeritage', label: 'World Heritage Protection Zone', color: protectionZoneColors.worldHeritage },
    { kind: 'primaryNational', label: 'Primary National Protection Zone', color: protectionZoneColors.primaryNational },
    { kind: 'secondaryNational', label: 'Secondary National Protection Zone', color: protectionZoneColors.secondaryNational },
    { kind: 'consultationNational', label: 'Consultation National Protection Zone', color: protectionZoneColors.consultationNational },
];

export function kindForProtectionZone(name: string | undefined | null): ProtectionZoneKind {
    const n = (name || '').toLowerCase().trim();
    if (n.includes('world heritage') || n.includes('whc') || n.startsWith('wh ')) {
        return 'worldHeritage';
    }
    if (n.includes('primary')) return 'primaryNational';
    if (n.includes('secondary')) return 'secondaryNational';
    if (n.includes('consultation') || n.includes('consult')) {
        return 'consultationNational';
    }
    return 'consultationNational';
}

export function colorForProtectionZone(name: string | undefined | null): string {
    return protectionZoneColors[kindForProtectionZone(name)];
}

/**
 * Solid transparent fills (Colouring Cities style) — hatch patterns removed.
 * Consultation is slightly more opaque so the pale fill stays readable.
 */
export function fillOpacityForProtectionZone(
    nameOrKind: string | ProtectionZoneKind | undefined | null
): number {
    const kind: ProtectionZoneKind =
        nameOrKind === 'worldHeritage' ||
        nameOrKind === 'primaryNational' ||
        nameOrKind === 'secondaryNational' ||
        nameOrKind === 'consultationNational'
            ? nameOrKind
            : kindForProtectionZone(nameOrKind);
    if (kind === 'consultationNational') return 0.45;
    if (kind === 'secondaryNational') return 0.40;
    if (kind === 'primaryNational') return 0.40;
    return 0.40;
}

export function zoneLabel(featureProperties: Record<string, unknown> | null | undefined): string {
    if (!featureProperties) return '';
    return String(
        featureProperties.Layer ||
        featureProperties.layer ||
        featureProperties.name ||
        featureProperties.Name ||
        featureProperties.ZONE ||
        featureProperties.Zone ||
        ''
    );
}
