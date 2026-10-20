import { Category } from './categories-config';
import { BuildingMapTileset } from './tileserver-config';

export type LegendElement = {
    color: string;
    border?: string;
    text: string;
    /** BACA-style diagonal hatch swatch (protection zones) */
    hatch?: boolean;
    /** Boundary / fill symbols (boxes by default; lines for borders) */
    symbol?: 'swatch' | 'circle' | 'dashed-line' | 'solid-line'; // 'circle' kept for compat, rendered as box
} | {
    subtitle: string;
};

export interface LegendConfig {
    title: string;
    description?: string;
    disclaimer?: string;
    elements: LegendElement[];
}

export interface CategoryMapDefinition {
    mapStyle: BuildingMapTileset;
    legend: LegendConfig;
    /** When false, show legend only — do not colour buildings on the map */
    mapPopulate?: boolean;
}

/** Whether this map style should load building colour tiles */
export function doesMapStyleColourBuildings(
    mapStyle: BuildingMapTileset | undefined,
    definitions: CategoryMapDefinition[]
): boolean {
    if (!mapStyle) return false;
    const def = definitions.find(d => d.mapStyle === mapStyle);
    if (def?.mapPopulate === false) return false;
    return true;
}

export const defaultMapCategory = Category.AgeHistory;

export const periodBuiltLegend = [
    { color: '#c3e1eb', text: 'after 2000s' },
    { color: '#68aba5', text: '1980s - 2000s' },
    { color: '#8f5385', text: '1950s - 1970s' },
    { color: '#3b74a3', text: '1870s - 1940s' },
];

export const ageLegend = periodBuiltLegend;

export const categoryMapsConfig: {[key in Category]: CategoryMapDefinition[]} = {
    [Category.AgeHistory]: [
        {
            mapStyle: 'date_year',
            legend: {
                title: 'Period built',
                elements: [
                    { color: '#c3e1eb', text: 'after 2000s' },
                    { color: '#68aba5', text: '1980s - 2000s' },
                    { color: '#8f5385', text: '1950s - 1970s' },
                    { color: '#3b74a3', text: '1870s - 1940s' },
                ],
            },
        },
        {
            mapStyle: 'survival_status',
            legend: {
                title: 'Survival data',
                elements: [
                    { color: '#6ded45', text: 'Same as Historical Map (Unchanged)' },
                    { color: '#f7c725', text: 'Similar to Historical Map (some Changes)' },
                    { color: '#ff2121', text: 'Historical Building(s) Demolished' },
                    { color: '#cf26df', text: 'Current Building on Previous Green Space' },
                ]
            }
        },
    ],
    [Category.ConstructionDesign]: [
        {
            mapStyle: 'construction_core_material',
            legend: {
                title: 'Core Material',
                elements: [
                    { color: '#b5a859', text: 'Wood' },
                    { color: '#ffffe3', text: 'Stone' },
                    { color: '#fca89d', text: 'Concrete' },
                    { color: '#f5d96b', text: 'Brick' },
                    { color: '#beffe8', text: 'Steel' },
                    { color: '#5c8970', text: 'Other Metal' },
                    { color: '#96613b', text: 'Other Natural Material' },
                    { color: '#c48a85', text: 'Other Man-Made Material' },
                ]
            },
        },
        {
            mapStyle: 'construction_door_material',
            mapPopulate: false,
            legend: {
                title: 'Door Material',
                elements: [
                    { color: '#b5a859', text: 'Wood' },
                    { color: '#beffe8', text: 'Steel' },
                    { color: '#c0c0c0', text: 'Aluminium' },
                    { color: '#c48a85', text: 'Other' },
                ]
            },
        },
        {
            mapStyle: 'construction_windows_material',
            mapPopulate: false,
            legend: {
                title: 'Windows Material',
                elements: [
                    { color: '#b5a859', text: 'Wood' },
                    { color: '#beffe8', text: 'Steel' },
                    { color: '#c0c0c0', text: 'Aluminium' },
                    { color: '#c48a85', text: 'Other' },
                ]
            },
        },
        {
            mapStyle: 'architectural_elements',
            mapPopulate: false,
            legend: {
                title: 'Architectural Elements',
                disclaimer: 'Coming soon',
                elements: []
            },
        },
        {
            mapStyle: 'architectural_style',
            mapPopulate: false,
            legend: {
                title: 'Architectural Style',
                disclaimer: 'Coming soon',
                elements: []
            },
        },
        {
            mapStyle: 'designer_awards',
            legend: {
                title: 'Awards',
                description: 'Has the building won any awards?',
                elements: [
                    { color: '#f7ec25', text: 'Yes' },
                ]
            },
        },
        {
            mapStyle: 'team_known_designer',
            legend: {
                title: 'Known Designer',
                description: 'Buildings with a known architect/designer?',
                elements: [
                    { color: '#6bb1e3', text: 'Yes' },
                ]
            },
        },
    ],
    [Category.EnergyPerformance]: [
        {
            mapStyle: 'sust_aggregate_estimate_epc',
            legend: {
                title: 'Energy rating (EPC)',
                description: 'Residential energy rating (EPC Rating)',
                disclaimer: 'This map shows official 2025 EPC data, required for new, sold and rented buildings. Please note EPC ratings may be out-of-date, as retrofit may have occurred since certification.',
                elements: [
                    { color: "#007f3d", text: 'A' },
                    { color: "#2c9f29", text: 'B' },
                    { color: "#9dcb3c", text: 'C' },
                    { color: "#fff200", text: 'D' },
                    { color: "#f7af1d", text: 'E' },
                    { color: "#ed6823", text: 'F' },
                    { color: "#e31d23", text: 'G' },
                    { color: "#c0c0c0", text: 'No EPC identified' },
                ]
            },
        },
        {
            mapStyle: 'sust_dec',
            legend: {
                title: 'Energy rating (DEC)',
                description: 'Non-domestic energy rating (DEC Rating)',
                elements: [
                    { color: "#007f3d", text: 'A' },
                    { color: "#2c9f29", text: 'B' },
                    { color: "#9dcb3c", text: 'C' },
                    { color: "#fff200", text: 'D' },
                    { color: "#f7af1d", text: 'E' },
                    { color: "#ed6823", text: 'F' },
                    { color: "#e31d23", text: 'G' },
                ]
            },
        },
        {
            mapStyle: 'energy_solar',
            legend: {
                title: 'Solar panels',
                description: 'Does the building have Solar Panels?',
                elements: [
                    {color: '#6bb1e3', text: 'Yes'},
                ]
            },
        },
    ],
    [Category.PlanningConservation]: [
        {
            // this database commad allows to see statistics about decision dates per year
            // SELECT COUNT(*), date_part('year', decision_date) as year from planning_data WHERE decision_date IS NOT NULL GROUP BY year ORDER BY year ASC;
            // SELECT COUNT(*), date_part('year', registered_with_local_authority_date) as year from planning_data WHERE decision_date IS NOT NULL GROUP BY year ORDER BY year ASC;
            mapStyle: 'planning_applications_status_all',
            legend: {
                title: 'All planning applications available from GLA (official data)',
                disclaimer: 'This map shows official data available from the GLA Planning London Datahub. What you are looking at is mainly applications from 2019 onwards.',
                elements: [
                    { color: '#a040a0', text: 'Submitted, awaiting decision' },
                    { color: '#fff200', text: 'Appeal In Progress' },
                    { color: '#16cf15', text: 'Approved' },
                    { color: '#e31d23', text: 'Rejected' },
                    { color: '#7a84a0', text: 'Withdrawn' },
                    { color: '#eacad0', text: 'Other' },
                ]
            }
        },
        {
            mapStyle: 'planning_applications_status_recent',
            legend: {
                title: 'The last 12 months - planning applications submissions/decisions (official data)',
                disclaimer: 'This map shows applications where the submission or decision data falls within the last 12 months.',
                elements: [
                    { color: '#a040a0', text: 'Submitted, awaiting decision' },
                    { color: '#fff200', text: 'Appeal In Progress' },
                    { color: '#16cf15', text: 'Approved' },
                    { color: '#e31d23', text: 'Rejected' },
                    { color: '#7a84a0', text: 'Withdrawn' },
                    { color: '#eacad0', text: 'Other' },
                ]
            }
        },
        {
            mapStyle: 'planning_applications_status_very_recent',
            legend: {
                title: 'Last 30 days - planning applications submissions/decisions (official data)',
                disclaimer: 'This map shows applications where the submission or decision data falls within last 30 days.',
                elements: [
                    { color: '#a040a0', text: 'Submitted, awaiting decision' },
                    { color: '#fff200', text: 'Appeal In Progress' },
                    { color: '#16cf15', text: 'Approved' },
                    { color: '#e31d23', text: 'Rejected' },
                    { color: '#7a84a0', text: 'Withdrawn' },
                    { color: '#eacad0', text: 'Other' },
                ]
            }
        },
        {
            mapStyle: 'community_expected_planning_application_total',
            legend: {
                title: 'Expected planning applications (crowdsourced data)',
                disclaimer: 'Sites identified by users as likely to be subject to planning application over the next six months',
                elements: [
                    { color: '#bd0026', text: '100+' },
                    { color: '#e31a1c', text: '50–99' },
                    { color: '#fc4e2a', text: '20–49' },
                    { color: '#fd8d3c', text: '10–19' },
                    { color: '#feb24c', text: '3–9' },
                    { color: '#fed976', text: '2' },
                    { color: '#ffe8a9', text: '1'}
                ]
            }
        },
        {
            mapStyle: 'planning_combined',
            legend: {
                title: 'Designation / Protection',
                elements: [
                    { color: '#00467c', text: 'World Heritage' },
                    { color: '#85e6d7', text: 'Regional Heritage' },
                    { color: '#C27364', text: 'National Heritage' },
                ]
            },
        },
        {
            mapStyle: 'community_local_significance_total',
            legend: {
                title: 'Local Interest',
                description: 'People who think the building is of a local interest',
                elements: [
                    { color: '#bd0026', text: '100+' },
                    { color: '#e31a1c', text: '50–99' },
                    { color: '#fc4e2a', text: '20–49' },
                    { color: '#fd8d3c', text: '10–19' },
                    { color: '#feb24c', text: '3–9' },
                    { color: '#fed976', text: '2' },
                    { color: '#ffe8a9', text: '1'}
                ]
            }
        }
    ],
    [Category.Location]: [{
        mapStyle: 'location',
        legend: {
            title: 'Location',
            description: '% data collected',
            elements: [
                { color: '#084081', text: '≥80%' },
                { color: '#0868ac', text: '60–80%' },
                { color: '#43a2ca', text: '40–60%' },
                { color: '#7bccc4', text: '20–40%' },
                { color: '#bae4bc', text: '<20%' }
            ]
        },
    }],
    [Category.Community]: [
        /*
        {
            mapStyle: 'likes',
            legend: {
                title: 'Like Me',
                elements: [
                    { color: '#bd0026', text: '👍👍👍👍 100+' },
                    { color: '#e31a1c', text: '👍👍👍 50–99' },
                    { color: '#fc4e2a', text: '👍👍 20–49' },
                    { color: '#fd8d3c', text: '👍👍 10–19' },
                    { color: '#feb24c', text: '👍 3–9' },
                    { color: '#fed976', text: '👍 2' },
                    { color: '#ffe8a9', text: '👍 1'}
                ]
            }
        },
        */
        {
            mapStyle: 'community_building_hominess_avg',
            legend: {
                title: 'Building hominess',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#e1fce5', text: '1' },
                    { color: '#a8fab5', text: '2' },
                    { color: '#7dfa92', text: '3' },
                    { color: '#3efa5e', text: '4' },
                    { color: '#00d924', text: '5' },
                ]
            }
        },
        {
            mapStyle: 'community_building_coherence_avg',
            legend: {
                title: 'Building coherence',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#e1ebfc', text: '1' },
                    { color: '#bbd3fa', text: '2' },
                    { color: '#7dabfa', text: '3' },
                    { color: '#3e86fa', text: '4' },
                    { color: '#005efa', text: '5' },
                ]
            }
        },
        {
            mapStyle: 'community_building_fascination_avg',
            legend: {
                title: 'Building fascination',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#f1e1f7', text: '1' },
                    { color: '#e8bbfa', text: '2' },
                    { color: '#d97dfa', text: '3' },
                    { color: '#c33efa', text: '4' },
                    { color: '#b300fa', text: '5' },
                ]
            }
        },
        // {
        //     mapStyle: 'community_building_neuroaesthetic_avg',
        //     legend: {
        //         title: 'Building neuroaesthetic score',
        //         elements: [
        //             { color: '#fafafa', text: '1' },
        //             { color: '#bbf7fa', text: '2' },
        //             { color: '#7df4fa', text: '3' },
        //             { color: '#3cf0fa', text: '4' },
        //             { color: '#00ced9', text: '5' },
        //         ]
        //     }
        // },
        {
            mapStyle: 'community_streetscape_hominess_avg',
            legend: {
                title: 'Streetscape hominess',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#f0fcde', text: '1' },
                    { color: '#d8faa8', text: '2' },
                    { color: '#c6fa7d', text: '3' },
                    { color: '#acfa3e', text: '4' },
                    { color: '#7fd900', text: '5' },
                ]
            }
        },
        {
            mapStyle: 'community_streetscape_coherence_avg',
            legend: {
                title: 'Streetscape coherence',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#e3fafc', text: '1' },
                    { color: '#bbf5fa', text: '2' },
                    { color: '#7df0fa', text: '3' },
                    { color: '#3eeafa', text: '4' },
                    { color: '#00e5fa', text: '5' },
                ]
            }
        },
        {
            mapStyle: 'community_streetscape_fascination_avg',
            legend: {
                title: 'Streetscape fascination',
                description: 'The average of all scores for the building',
                elements: [
                    { color: '#fce8f0', text: '1' },
                    { color: '#fabbd3', text: '2' },
                    { color: '#fa7dad', text: '3' },
                    { color: '#fa3e86', text: '4' },
                    { color: '#fa0060', text: '5' },
                ]
            }
        },
        // {
        //     mapStyle: 'community_streetscape_neuroaesthetic_avg',
        //     legend: {
        //         title: 'Streetscape neuroaesthetic score',
        //         elements: [
        //             { color: '#fafafa', text: '1' },
        //             { color: '#bbf7fa', text: '2' },
        //             { color: '#7df4fa', text: '3' },
        //             { color: '#3cf0fa', text: '4' },
        //             { color: '#00ced9', text: '5' },
        //         ]
        //     }
        // },
        {
            mapStyle: 'typology_likes',
            legend: {
                title: 'Liked non-residential buildings',
                elements: [
                    { color: '#bd0026', text: '👍👍👍👍 100+' },
                    { color: '#e31a1c', text: '👍👍👍 50–99' },
                    { color: '#fc4e2a', text: '👍👍 20–49' },
                    { color: '#fd8d3c', text: '👍👍 10–19' },
                    { color: '#feb24c', text: '👍 3–9' },
                    { color: '#fed976', text: '👍 2' },
                    { color: '#ffe8a9', text: '👍 1'}
                ]
            }
        },
        {
            mapStyle: 'community_expected_planning_application_total',
            legend: {
                title: 'Expected planning applications',
                disclaimer: 'Sites identified by users as likely to be subject to planning application over the next six months',
                elements: [
                    { color: '#bd0026', text: '100+' },
                    { color: '#e31a1c', text: '50–99' },
                    { color: '#fc4e2a', text: '20–49' },
                    { color: '#fd8d3c', text: '10–19' },
                    { color: '#feb24c', text: '3–9' },
                    { color: '#fed976', text: '2' },
                    { color: '#ffe8a9', text: '1'}
                ]
            }
        },
        {
            mapStyle: 'community_in_public_ownership',
            legend: {
                title: 'Public Ownership',
                description: 'Is the building in some form of public/community ownership',
                elements: [
                    {color: '#1166ff', text: 'Yes'},
                    {color: '#ffaaa0', text: 'No'}
                ]
            }
        }
    ],
    [Category.UrbanInfrastructure]: [
        {
            mapStyle: "context_walkability_index",
            legend: {
                title: 'Walkability Index',
                elements: []
            },
        },
        {
            mapStyle: "context_street_width",
            legend: {
                title: 'Street width',
                elements: []
            },
        }
    ],
    [Category.WaterGreenInfrastructure]: [
        {
            mapStyle: 'context_back_garden',
            legend: {
                title: 'Back gardens',
                description: 'Does the building have a back garden?',
                elements: [
                    {color: '#7cbf39', text: 'Yes'},
                ]
            },
        },
        {
            mapStyle: 'energy_green_roof',
            legend: {
                title: 'Green roof',
                description: 'Does the building have a Green Roof?',
                elements: [
                    {color: '#7cbf39', text: 'Yes'},
                ]
            },
        },
    ],
    [Category.TypologySize]: [
        {
            mapStyle: 'typology_classification',
            legend: {
                title: 'National Historical Description',
                elements: [
                    { color: '#0311AB', text: '1-3 storeys: Detached' },
                    { color: '#3845D4', text: '1-3 storeys: Tightly grouped' },
                    { color: '#6D79FD', text: '1-3 storeys: Loosely grouped' },
                    { color: '#FF5D00', text: '4-7 storeys: Detached' },
                    { color: '#FF8000', text: '4-7 storeys: Tightly grouped' },
                    { color: '#FFA200', text: '4-7 storeys: Loosely grouped' },
                    { color: '#AB1303', text: '8+ storeys: Detached' },
                    { color: '#D43A29', text: '8+ storeys: Tightly grouped' },
                    { color: '#FC604F', text: '8+ storeys: Loosely grouped' },
                ]
            }
        },
        /*{
            mapStyle: 'typology_style_period',
            legend: {
                title: 'Architectural style',
                elements: [
                    { color: '#FFF739', text: '43AD-410 (Roman)' },
                    { color: '#C5BD00', text: '410-1485 (Medieval)' },
                    { color: '#FF9A39', text: '1485-1603 (Tudor)' },
                    { color: '#C56000', text: '1603-1714 (Stuart)' },
                    { color: '#EA8072', text: '1714-1837 (Georgian)' },
                    { color: '#A71200', text: '1837-1901 (Victorian)' },
                    { color: '#A272D4', text: '1901-1914 (Edwardian)' },
                    { color: '#3988C5', text: '1914-1945 (WWI-WWII)' },
                    { color: '#5ADFA2', text: '1946-1979 (Post war)' },
                    { color: '#C2F47A', text: '1980-1999 (Late C20)' },
                    { color: '#6FB40A', text: '2000-2025 (Early C21)' },
                ]
            }
        },*/
        {
            mapStyle: 'typology_dynamic_classification',
            legend: {
                title: 'Dynamic classification',
                elements: [
                    { color: '#FF7F11', text: 'Small, often repetitive plots, mainly residential' },
                    { color: '#FF1B1C', text: 'Linear non-domestic, i.e. high streets' },
                    { color: '#40E0D0', text: 'Large plots with internal roads' },
                ]
            }
        },
        {
        mapStyle: 'original_landuse',
            legend: {
                title: 'Original Land Use',
                elements: [
                    { color: '#e5050d', text: 'Mixed Use' },
                    { subtitle: 'Single use:'},
                    { color: '#252aa6', text: 'Residential (unverified)' },
                    { color: '#7025a6', text: 'Residential (verified)' },
                    { color: '#ff8c00', text: 'Retail' },
                    { color: '#f5f58f', text: 'Industry & Business' },
                    { color: '#fa667d', text: 'Community Services' },
                    { color: '#ffbfbf', text: 'Recreation & Leisure' },
                    { color: '#b3de69', text: 'Transport' },
                    { color: '#cccccc', text: 'Utilities & Infrastructure' },
                    { color: '#898944', text: 'Defence' },
                    { color: '#73ccd1', text: 'Agriculture' },
                    { color: '#45cce3', text: 'Minerals' },
                    { color: '#ffffff', text: 'Vacant & Derelict' },
                    { color: '#6c6f8e', text: 'Unclassified, presumed non-residential' }
                ]
            },
        },
        {
            mapStyle: 'building_attachment_form',
            legend: {
                title: 'Attachment/Adjacency',
                elements: [
                    { color: "#f2a2b9", text: "Detached" },
                    { color: "#ab8fb0", text: "Semi-Detached" },
                    { color: "#3891d1", text: "End-Terrace" },
                    { color: "#226291", text: "Mid-Terrace" }
                ]
            },
        },
        {
            mapStyle: 'size_height',
            legend: {
                title: 'Height to apex',
                elements: [
                    { color: '#f6f3f9', text: '0 - 4'},
                    { color: '#d5cbe1', text: '> 4 - 8'},
                    { color: '#c793c2', text: '> 8 - 11'},
                    { color: '#d867a6', text: '> 11 - 14'},
                    { color: '#e52a89', text: '> 14 - 17'},
                    { color: '#cd1d58', text: '> 17 - 30'},
                    { color: '#971a46', text: '≥ 30'}
                ]
            },
        },
        {
            mapStyle: 'size_total_floors',
            legend: {
                title: 'Total number of floors',
                elements: [
                    { color: '#f7f4f9', text: '1'},
                    { color: '#e7e1ef', text: '2'},
                    { color: '#d4b9da', text: '3 - 4'},
                    { color: '#c994c7', text: '5'},
                    { color: '#df65b0', text: '6 - 10'},
                    { color: '#e7298a', text: '11 - 20'},
                    { color: '#ce1256', text: '21 - 34'},
                    { color: '#980043', text: '35 +'}
                ]
            },
        },
        {
            mapStyle: 'size_storeys_basement',
            legend: {
                title: 'Floors below ground level',
                elements: [
                    { color: '#f7f4f9', text: '1'},
                    { color: '#d4b9da', text: '2'},
                    { color: '#df65b0', text: '3'},
                    { color: '#ce1256', text: '4+'},
                ]
            },
        },
        {
            mapStyle: 'size_floor_area_ground',
            legend: {
                title: 'Ground floor area (m2)',
                elements: [
                    { color: '#f7f4f9', text: '0 - 25'},
                    { color: '#e7e1ef', text: '25 - 50'},
                    { color: '#d4b9da', text: '50 - 100'},
                    { color: '#c994c7', text: '100 - 250'},
                    { color: '#df65b0', text: '250 - 500'},
                    { color: '#e7298a', text: '500 - 1000'},
                    { color: '#ce1256', text: '1000 - 2000'},
                    { color: '#980043', text: '2000 +'}
                ]
            },
        }
    ],
    [Category.LandUse]: [
        {
            mapStyle: 'landuse',
            legend: {
                title: 'Land Use',
                elements: [
                    { color: '#b8d8c0', text: 'Residential' },
                    { color: '#b7308a', text: 'Commercial' },
                    { color: '#b5bcdf', text: 'Mixed Used (Residential / Commercial)' },
                    { color: '#e5050d', text: 'Government buildings, Public Administration' },
                    { color: '#68b8c1', text: 'Educational' },
                    { color: '#ff8e5d', text: 'Cultural' },
                    { color: '#97dfff', text: 'Healthcare Facilities' },
                    { color: '#af7c85', text: 'Hospitality' },
                    { color: '#ffbfbf', text: 'Recreational' },
                    { color: '#6a3f5a', text: 'Storage' },
                    { color: '#f9d849', text: 'Religious' },
                    { color: '#6c6f8e', text: 'Parking' },
                    { color: '#036b6b', text: 'Utility' },
                    { color: '#a0a0a0', text: 'Formal Parking' },
                    { color: '#dddddd', text: 'Informal Parking' },
                    { color: '#252aa6', text: 'Informal Community Space' },
                    { color: '#b3de69', text: 'Public Square' },
                    { color: '#f6eed4', text: 'Unused land' },
                    { color: '#ffffff', border: '1px solid #000000', text: 'Unidentified' },
                ]
            },
        },
        {
            mapStyle: 'original_landuse',
            legend: {
                title: 'Original (Historical) Land Use',
                elements: [
                    { color: '#b8d8c0', text: 'Residential' },
                    { color: '#b7308a', text: 'Commercial' },
                    { color: '#b5bcdf', text: 'Mixed Used (Residential / Commercial)' },
                    { color: '#e5050d', text: 'Government buildings, Public Administration' },
                    { color: '#68b8c1', text: 'Educational' },
                    { color: '#ff8e5d', text: 'Cultural' },
                    { color: '#97dfff', text: 'Healthcare Facilities' },
                    { color: '#af7c85', text: 'Hospitality' },
                    { color: '#ffbfbf', text: 'Recreational' },
                    { color: '#6a3f5a', text: 'Storage' },
                    { color: '#f9d849', text: 'Religious' },
                    { color: '#6c6f8e', text: 'Parking' },
                    { color: '#036b6b', text: 'Utility' },
                    { color: '#a0a0a0', text: 'Formal Parking' },
                    { color: '#dddddd', text: 'Informal Parking' },
                    { color: '#252aa6', text: 'Informal Community Space' },
                    { color: '#b3de69', text: 'Public Square' },
                    { color: '#f6eed4', text: 'Unused land' },
                    { color: '#ffffff', border: '1px solid #000000', text: 'Unidentified' },
                ]
            },
        },
    ],
    [Category.RetrofitCondition]: [
        
    ],
    [Category.DisasterManagement]: [
        {
            mapStyle: 'disaster_severity',
            mapPopulate: false,
            legend: {
                title: 'Damage Severity',
                elements: [
                    { color: '#bd0026', text: 'Building destroyed' },
                    { color: '#e31a1c', text: 'Very severe' },
                    { color: '#fc4e2a', text: 'Severe' },
                    { color: '#fd8d3c', text: 'Moderate' },
                    { color: '#feb24c', text: 'Minimal' },
                    { color: '#fed976', text: 'No damage visible' },
                ],
            },
        },
        {
            mapStyle: 'heritage_at_risk',
            legend: {
                title: 'Heritage at Risk',
                description: 'Demo colours until risk assessments are collected.',
                elements: [
                    { color: '#bd0026', text: 'At Risk' },
                    { color: '#fd8d3c', text: 'Vulnerable' },
                    { color: '#abc178', text: 'Secure' },
                ],
            },
        },
    ],
    [Category.Mapping]: [
        {
            mapStyle: 'location',
            legend: {
                title: '% data collected',
                elements: [
                    { color: '#084081', text: '>80%' },
                    { color: '#0868ac', text: '60 - 80%' },
                    { color: '#43a2ca', text: '40-60%' },
                    { color: '#7bccc4', text: '20-40%' },
                    { color: '#bae4bc', text: '<20%' }
                ]
            },
        },
        {
            mapStyle: 'building_footprint_issues' as BuildingMapTileset,
            legend: {
                title: 'Building footprint issues',
                description: 'Please let us know of any inaccuracies here.',
                elements: [
                    { color: '#00ff00', text: 'Split' },
                    { color: '#ff0000', text: 'Merged' },
                    { color: '#08e8de', text: 'Unregistered' },
                ]
            },
        },
    ],
    [Category.Morphology]: [
        {
            mapStyle: 'typology_classification',
            legend: {
                title: 'Typology',
                elements: [
                    { color: '#5d5d93', text: 'Public Building' },
                    { color: '#b6d5d8', text: 'Single House' },
                    { color: '#6a9dba', text: 'Multistorey Building' },
                    { color: '#1a4568', text: 'Single Shops' },
                    { color: '#fc604f', text: 'Amarat' },
                    { color: '#056b6b', text: 'Utility' }
                ]
            }
        },
        {
            mapStyle: 'size_floors_category',
            legend: {
                title: 'Number of Floors',
                elements: [
                    { color: '#f5f5fa', text: 'GF' },
                    { color: '#d9e1f2', text: 'GF+ Mezzanine' },
                    { color: '#b4c6e7', text: 'GF+1' },
                    { color: '#8ea9db', text: 'GF+ Mezzanine+1' },
                    { color: '#7896c4', text: 'GF+2' },
                    { color: '#677ca3', text: 'GF+ Mezzanine+2' },
                    { color: '#7274b5', text: 'GF+3' },
                    { color: '#484b99', text: 'GF+ Mezzanine+3' },
                    { color: '#353d77', text: 'GF+4' },
                    { color: '#242e5b', text: 'More than GF+ 4' }
                ]
            }
        },
        {
            mapStyle: 'size_height',
            legend: {
                title: 'Height (m)',
                elements: [
                    { color: '#f6f3f9', text: '0 - 4' },
                    { color: '#d5cbe1', text: '> 4 - 8' },
                    { color: '#c793c2', text: '> 8 - 11' },
                    { color: '#d867a6', text: '> 11 - 14' },
                    { color: '#e52a89', text: '> 14 - 17' },
                    { color: '#cd1d58', text: '> 17 - 30' },
                    { color: '#971a46', text: '≥ 30' },
                ]
            }
        },
    ],
    [Category.Conservation]: [
        {
            mapStyle: 'conservation_designation',
            legend: {
                title: 'Designation / Protection',
                elements: [
                    { color: '#00467c', text: 'World Heritage' },
                    { color: '#85e6d7', text: 'Regional Heritage' },
                    { color: '#C27364', text: 'National Heritage' }
                ]
            },
        },
        {
            mapStyle: 'heritage_value',
            legend: {
                title: 'Heritage Value',
                elements: [
                    { color: '#c72e08', text: 'Traditional' },
                    { color: '#ffbea1', text: 'Transitional' },
                    { color: '#95beba', text: 'Modern Heritage' },
                    { color: '#e75b42', text: 'Combination (Traditional/Transitional)' },
                    { color: '#597c78', text: 'Combination (Transitional/Modern Heritage)' },
                    { color: '#e2896f', text: 'Combination (Heritage/Contemporary Architecture)' },
                    { color: '#8f0303', text: 'Combination (Heritage/Non-Significant)' },
                    { color: '#344891', text: 'Contemporary Architecture' },
                    { color: '#ede6df', text: 'Non-Significant' }
                ]
            },
        },
        {
            mapStyle: 'historic_area_classifications',
            mapPopulate: false,
            legend: {
                title: 'Historic Area Classifications',
                elements: [
                    { color: '#DFEFEE', text: 'Urban Heritage A (UHA)' },
                    { color: '#A1BAB8', text: 'Urban Heritage B (UHB)' },
                    { color: '#638481', text: 'Urban Heritage C (UHC)' },
                    { color: '#C27364', text: 'National Heritage Building (NHB)' },
                    { color: '#E8C992', text: 'Archaeological Site (ARC)' },
                    { color: '#BCC493', text: 'Heritage Garden (HG)' },
                ]
            },
        },
    ],
    [Category.Assessment]: [
        {
            mapStyle: 'heritage_assessment_criteria',
            mapPopulate: false,
            legend: {
                title: 'Heritage Assessment Criteria',
                elements: [
                    { color: '#6b8cae', text: 'Sorting' },
                    { color: '#dbba77', text: 'Evaluation' },
                    { color: '#d37d84', text: 'Study' },
                    { color: '#7a9e7e', text: 'Completed' },
                ]
            },
        },
        {
            mapStyle: 'inspection_requests',
            mapPopulate: false,
            legend: {
                title: 'Inspection Requests',
                elements: [
                    { color: '#c3d4ca', text: 'Inspected' },
                    { color: '#f58e81', text: 'Not Inspected' },
                ]
            },
        },
    ],
    [Category.InvestmentEngagement]: [
        {
            mapStyle: 'renovation',
            legend: {
                title: 'Renovation',
                elements: [
                    { color: '#65c298', text: 'Available' },
                    { color: '#9b85be', text: 'Completed' },
                ]
            },
        },
        {
            mapStyle: 'operation',
            legend: {
                title: 'Operation',
                elements: [
                    { color: '#65c298', text: 'Available' },
                    { color: '#ffc067', text: 'Active' },
                ]
            },
        },
        {
            mapStyle: 'rent_sale',
            legend: {
                title: 'Rent/Sale',
                elements: [
                    { color: '#65c298', text: 'Available' },
                    { color: '#9b4166', text: 'Transacted' },
                ]
            },
        },
        {
            mapStyle: 'engagement',
            mapPopulate: false,
            legend: {
                title: 'Engagement',
                disclaimer: 'Coming soon',
                elements: []
            },
        },
    ],
    // Coming Soon categories - placeholder map configs
    [Category.GreenUrbanInfrastructure]: [
        {
            mapStyle: 'location',
            legend: {
                title: 'Green / Water Infrastructure',
                disclaimer: 'Coming soon',
                elements: []
            },
        },
    ],
    [Category.CommerceActivity]: [
        {
            mapStyle: 'location',
            legend: {
                title: 'Commerce & Activity',
                disclaimer: 'Coming soon',
                elements: []
            },
        },
    ],
    [Category.Social]: [
        {
            mapStyle: 'location',
            legend: {
                title: 'Social',
                disclaimer: 'Coming soon',
                elements: []
            },
        },
    ],
    
};
