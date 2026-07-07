/**
 * An enumeration of all categories in the system.
 * The string value is also the category URL slug.
 */
export enum Category {
    Mapping = 'mapping',
    AgeHistory = 'age-history',
    Morphology = 'morphology',
    ConstructionDesign = 'construction-design',
    LandUse = 'land-use',
    Conservation = 'conservation',
    Assessment = 'assessment',
    InvestmentEngagement = 'investment-engagement',
    DisasterManagement = 'disaster-management',
    // Coming Soon categories
    GreenUrbanInfrastructure = 'green-urban-infrastructure',
    CommerceActivity = 'commerce-activity',
    Social = 'social',
    // Legacy categories kept for backward compatibility
    Community = 'community',
    PlanningConservation = 'planning-conservation',
    WaterGreenInfrastructure = 'water-green-infrastructure',
    Location = 'location',
    UrbanInfrastructure = 'urban-infrastructure',
    RetrofitCondition = 'retrofit-condition',
    EnergyPerformance = 'energy-performance',
    TypologySize = 'typology-size',
}

/**
 * This is the sole configuration variable that defines the order of the categories
 * in the category grid. The order in the enum definition or the other configs does
 * not affect the order of the grid.
 */
export const categoriesOrder: Category[] = [
    Category.Mapping,
    Category.AgeHistory,
    Category.Morphology,
    Category.ConstructionDesign,
    Category.LandUse,
    Category.Conservation,
    Category.Assessment,
    Category.InvestmentEngagement,
    Category.DisasterManagement,
    // Coming Soon categories
    Category.GreenUrbanInfrastructure,
    Category.CommerceActivity,
    Category.Social,
];

interface CategoryDefinition {
    inactive?: boolean;
    slug: string;
    name: string;
    aboutUrl: string;
    intro: string;
}

export const categoriesConfig: {[key in Category]: CategoryDefinition} = {
    [Category.Mapping]: {
        slug: 'mapping',
        name: 'Mapping',
        aboutUrl: '/data-categories.html#mapping',
        intro: 'This section defines core spatial data—coordinates, addresses, and building footprints—for each building.',
    },
    [Category.AgeHistory]: {
        slug: 'age-history',
        name: 'Age & History',
        aboutUrl: '/data-categories.html#age-history',
        intro: 'Building age records construction periods supporting assessments of heritage protection, adaptation potential, and building lifespan.',
    },
    [Category.Morphology]: {
        slug: 'morphology',
        name: 'Morphology',
        aboutUrl: '/data-categories.html#morphology',
        intro: 'Building morphology describes buildings in terms of their typology, use, shape, and physical dimensions.',
    },
    [Category.ConstructionDesign]: {
        slug: 'construction-design',
        name: 'Construction & Design',
        aboutUrl: '/data-categories.html#construction-design',
        intro: 'Construction data focuses on the materiality of each building, including materials used and façade characteristics.',
    },
    [Category.LandUse]: {
        slug: 'land-use',
        name: 'Land Use',
        aboutUrl: '/data-categories.html#land-use',
        intro: 'This category captures data on the current type of activities occurring within each land.',
    },
    [Category.Conservation]: {
        slug: 'conservation',
        name: 'Conservation',
        aboutUrl: '/data-categories.html#conservation',
        intro: 'Conservation data records heritage designations and protection status at multiple levels.',
    },
    [Category.Assessment]: {
        slug: 'assessment',
        name: 'Assessment',
        aboutUrl: '/data-categories.html#assessment',
        intro: 'Assessment data will record information related to heritage evaluation criteria and building inspection requests.',
    },
    [Category.InvestmentEngagement]: {
        slug: 'investment-engagement',
        name: 'Investment & Engagement',
        aboutUrl: '/data-categories.html#investment-engagement',
        intro: 'This layer records engagement with buildings through property investment and the sharing of information and materials.',
    },
    [Category.DisasterManagement]: {
        slug: 'disaster-management',
        name: 'Disaster Management',
        aboutUrl: '/data-categories.html#disaster-management',
        intro: 'This layer captures data on the condition and maintenance of buildings, including heritage properties at risk.',
    },
    // Coming Soon categories
    [Category.GreenUrbanInfrastructure]: {
        slug: 'green-urban-infrastructure',
        name: 'Green / Urban Infrastructure',
        aboutUrl: '/data-categories.html#green-urban-infrastructure',
        intro: 'This layer captures data on greenery and urban infrastructure surrounding buildings.',
        inactive: true,
    },
    [Category.CommerceActivity]: {
        slug: 'commerce-activity',
        name: 'Commerce & Activity',
        aboutUrl: '/data-categories.html#commerce-activity',
        intro: 'This layer captures data on commercial activities within the urban environment.',
        inactive: true,
    },
    [Category.Social]: {
        slug: 'social',
        name: 'Social',
        aboutUrl: '/data-categories.html#social',
        intro: 'This layer captures data on population density, distribution, and migration patterns.',
        inactive: true,
    },
    // Legacy categories kept for backward compatibility
    [Category.Community]: {
        slug: 'community',
        name: 'Community',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#12-community',
        intro: 'This section collects data on community views on buildings and streetscapes, and on the the location of buildings available for community use. Can you help colour the map to inform the design of our towns and cites in future?',
        inactive: true,
    },
    [Category.PlanningConservation]: {
        slug: 'planning-conservation',
        name: 'Planning & Conservation',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#5-construction',
        intro: 'This section provides open planning and conservation data about the building.',
        inactive: true,
    },
    [Category.WaterGreenInfrastructure]: {
        slug: 'water-green-infrastructure',
        name: 'Green/Water Infrastructure Context',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#10-energy-performance',
        intro: "This section provides open data on the building's water supply and any green infrastructure.",
        inactive: true,
    },
    [Category.Location]: {
        slug: 'location',
        name: 'Location',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#1-location',
        intro: 'This section provides open data on building locations and building IDs.',
        inactive: true,
    },
    [Category.UrbanInfrastructure]: {
        slug: 'urban-infrastructure',
        name: 'Urban Infrastructure Context',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#9-planning',
        intro: 'This section provides open data on the surroundings of the building.',
        inactive: true,
    },
    [Category.RetrofitCondition]: {
        slug: 'retrofit-condition',
        name: 'Retrofit & Condition',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#7-street-context',
        intro: "This section provides open data on the condition of the building and its retrofit history.",
        inactive: true,
    },
    [Category.EnergyPerformance]: {
        slug: 'energy-performance',
        name: 'Energy Performance & Systems',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#8-team',
        intro: 'This section provides open data on the energy performance of the building.',
        inactive: true,
    },
    [Category.TypologySize]: {
        slug: 'typology-size',
        name: 'Form & Size',
        aboutUrl: 'https://github.com/colouring-cities/manual/wiki/E1.--DATA#3-typology',
        intro: 'This section provides open data on the typology and dimensions of the building.',
        inactive: true,
    },
};
