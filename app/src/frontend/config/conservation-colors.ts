/** Designation / protection building colours (Conservation map legend) */
export const designationProtectionColors = {
    worldHeritage: '#00467c',
    regionalHeritage: '#85ffd4',
    nationalHeritage: '#c27364',
} as const;

/** Historic area classification colours — strong enough to read on dark/light basemaps */
export const historicAreaClassificationColors = {
    urbanHeritageA: '#7eb8b4',
    urbanHeritageB: '#4a8a86',
    urbanHeritageC: '#2f5f5c',
    nationalHeritageBuilding: '#c27364',
    archaeologicalSite: '#e8c992',
    heritageGarden: '#bcc493',
} as const;

/**
 * Protection zone overlay colours — match BACA Protective Zoning Map legend
 * (diagonal hatch fill on the official PDF).
 */
export const protectionZoneColors = {
    worldHeritage: '#3d5a80',
    primaryNational: '#c41e3a',
    secondaryNational: '#c4a090',
    consultationNational: '#e8b4a8',
} as const;

export type ProtectionZoneKind =
    | 'worldHeritage'
    | 'primaryNational'
    | 'secondaryNational'
    | 'consultationNational';

/** Match feature Layer/name (case-insensitive) to protection zone kind */
export function kindForProtectionZone(name: string | undefined | null): ProtectionZoneKind {
    const n = (name || '').toLowerCase();
    if (n.includes('world heritage')) return 'worldHeritage';
    if (n.includes('primary national')) return 'primaryNational';
    if (n.includes('secondary national')) return 'secondaryNational';
    if (n.includes('consultation national') || n.includes('consultation zone')) {
        return 'consultationNational';
    }
    return 'consultationNational';
}

/** Match feature `name` (case-insensitive substring) to protection zone fill colour */
export function colorForProtectionZone(name: string | undefined | null): string {
    return protectionZoneColors[kindForProtectionZone(name)];
}

/** SVG pattern id used for BACA-style diagonal hatching on the map */
export function hatchPatternIdForProtectionZone(name: string | undefined | null): string {
    return `pz-hatch-${kindForProtectionZone(name)}`;
}
