export interface CCConfig
{
    cityName: string;                           // City name (i.e. "Colouring {City Name}")
    institution: string;                        // Institution responsible for managing the local platform (i.e. "The University of...")
    projectBlurb: string;                       // Description used on homepage
    
    githubURL: string;                          // URL of the project's GitHub repository
    manualURL: string;                          // Link to the project's page in the Open Manual (i.e. https://github.com/colouring-cities/manual/wiki/M3.-COLOURING-BRITAIN)
    privacyStatement: string;                   // Privacy statement, including where data is stored
    
    initialMapPosition: [number, number];       // Initial location of the map [latitude, longitude]
    initialZoomLevel: number;                   // Initial Zoom Level 
    minZoom: number;
    maxZoom: number;

    postcode: string;                           // Alternative for "Postcode" text (i.e. "Zip Code")
    energy_rating: string;                      // Official Environmental Energy Rating (BREEAM Rating in UK)

    bbox: [number, number, number, number];     // Bounding box of generated tiles, in CRS epsg:3857 in form: [w, s, e, n]
    basemapTileUrl: string;
    baseAttribution: string;

    /**
     * Same-origin paths to GeoJSON FeatureCollections for map overlays.
     * Configure per deployment (e.g. Britain vs Bahrain filenames). Omitted keys use UK defaults.
     */
    geometryLayerUrls?: Partial<Record<
        'parcel' | 'conservation' | 'housing' | 'creative' | 'flood' | 'vista' | 'borough' | 'archaeological' | 'urbanHeritage',
        string
    >>;

    /**
     * If set for a layer, the map loads GeoJSON from this API path instead of a static file.
     * Example: "/api/map-layers/parcels" (see MAP_LAYER_SLUG_TO_TABLE in mapOverlayGeoJson.ts).
     */
    geometryLayerApiPaths?: Partial<Record<
        'parcel' | 'conservation' | 'housing' | 'creative' | 'flood' | 'vista' | 'borough' | 'archaeological' | 'urbanHeritage',
        string
    >>;

    /**
     * Optional XYZ raster for "historic map" overlay ({z}, {x}, {y} placeholders).
     * If unset, enabling historic map shows no extra tiles (Britain default was London-only).
     */
    historicMapTileUrl?: string;
    historicMapAttribution?: string;
}

