/** Designation / protection building colours (Conservation map legend) */
export const designationProtectionColors = {
    worldHeritage: '#00467c',
    regionalHeritage: '#85ffd4',
    nationalHeritage: '#c27364',
} as const;

/** Historic area classification colours */
export const historicAreaClassificationColors = {
    urbanHeritageA: '#dfefee',
    urbanHeritageB: '#a1bab8',
    urbanHeritageC: '#638481',
    nationalHeritageBuilding: '#c27364',
    archaeologicalSite: '#e8c992',
    heritageGarden: '#bcc493',
} as const;

/** Protection zone overlay colours (map layer) */
export const protectionZoneColors = {
    worldHeritage: '#00467c',
    primaryNational: '#a01033',
    secondaryNational: '#ae7c86',
    consultationNational: '#ccb2aa',
} as const;

/** Match feature `name` (case-insensitive substring) to protection zone fill colour */
export function colorForProtectionZone(name: string | undefined | null): string {
    const n = (name || '').toLowerCase();
    if (n.includes('world heritage')) return protectionZoneColors.worldHeritage;
    if (n.includes('primary national')) return protectionZoneColors.primaryNational;
    if (n.includes('secondary national')) return protectionZoneColors.secondaryNational;
    if (n.includes('consultation national') || n.includes('consultation zone')) {
        return protectionZoneColors.consultationNational;
    }
    return protectionZoneColors.consultationNational;
}
