import { GeoJsonObject } from 'geojson';
import React, { Component, Fragment } from 'react';
// FIX: Rename 'Map' to 'LeafletMap' to avoid conflict with built-in JS Map object
import { AttributionControl, GeoJSON, Map as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet-universal';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './map.css';

import { apiGet } from '../apiHelpers';
import { HelpIcon } from '../components/icons';
import { Building } from '../models/building';

import Legend from './legend';
import SearchBox from './search-box';
import ThemeSwitcher from './theme-switcher';

const OS_API_KEY = 'NVUxtY5r8eA6eIfwrPTAGKrAAsoeI9E9';

interface ColouringMapProps {
    building?: Building;
    mode: 'basic' | 'view' | 'edit' | 'multi-edit';
    category: string;
    revision_id: number;
    selectBuilding: (building: Building) => void;
    colourBuilding: (building: Building) => void;
}

interface ColouringMapState {
    theme: 'light' | 'night';
    lat: number;
    lng: number;
    zoom: number;
    boundary: GeoJsonObject;
    sector209a: GeoJsonObject; 
    sector209b: GeoJsonObject; 
}

class ColouringMap extends Component<ColouringMapProps, ColouringMapState> {
    
    mapRef: React.RefObject<LeafletMap>; 

    constructor(props) {
        super(props);

        this.mapRef = React.createRef();

        this.state = {
            theme: 'night',
            // Coordinates are overridden by auto-zoom.
            lat: 51.509865, 
            lng: 0.118092, 
            zoom: 12,
            boundary: undefined,
            sector209a: undefined, 
            sector209b: undefined,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleLocate = this.handleLocate.bind(this);
        this.themeSwitch = this.themeSwitch.bind(this);
    }

    // Coordinate swap for Bahrain data: [Lat, Lng] -> L.latLng(Lat, Lng)
coordsToLatLng = (coords: number[]) => L.latLng(coords[1], coords[0], coords[2] || 0);


    // Function to fetch GeoJSON files from the public/geometries path
    async getSectorGeometries() {
        console.log('aaaaaaaaaaaaa')
        try {
            // REVERTED PATH: Back to /geometries/ since / returned 404 in console
            const dataA = await apiGet('/geometries/Sector_209a_WGS84.json') as GeoJsonObject;
            const dataB = await apiGet('/geometries/Sector_209b_WGS84.json') as GeoJsonObject; 
            console.log('Sector 209a', dataA);
console.log('Sector 209b', dataB);
            this.setState({
                sector209a: dataA,
                sector209b: dataB,
            }, () => {
                // Auto-zoom to Bahrain bounding box after data loads
                this.zoomToSectors();
            });
        } catch (e) {
            console.error('Failed to load Sector GeoJSON:', e);
        }
    }

    // Function to zoom the map to fit BOTH sector boundaries
    zoomToSectors() {
        const map = this.mapRef.current?.leafletElement; 
        const dataA = this.state.sector209a;
        const dataB = this.state.sector209b;

        if (map && (dataA || dataB)) {
            // Initialize bounds object
            let allBounds = L.latLngBounds([]);

            // CRITICAL: Extend bounds for Sector 209a
            if (dataA) {
                allBounds.extend(L.geoJSON(dataA as any, { coordsToLatLng: this.coordsToLatLng }).getBounds());
            }

            // CRITICAL: Extend bounds for Sector 209b (merging both)
            if (dataB) {
                allBounds.extend(L.geoJSON(dataB as any, { coordsToLatLng: this.coordsToLatLng }).getBounds());
            }

            // If the calculated bounds are valid (data exists)
            if (allBounds.isValid()) {
                map.fitBounds(allBounds, { padding: [20, 20] }); 
            }
        }
    }

    handleLocate(lat, lng, zoom){
        this.setState({
            lat: lat,
            lng: lng,
            zoom: zoom
        });
    }

    handleClick(e) {
        const mode = this.props.mode;
        const { lat, lng } = e.latlng;
        apiGet(`/api/buildings/locate?lat=${lat}&lng=${lng}`)
        .then(data => {
            if (data && data.length){
                const building = data[0];
                if (mode === 'multi-edit') {
                    this.props.colourBuilding(building);
                } else if (this.props.building == undefined || building.building_id !== this.props.building.building_id){
                    this.props.selectBuilding(building);
                } else {
                    this.props.selectBuilding(undefined);
                }
            } else {
                if (mode !== 'multi-edit') {
                    this.props.selectBuilding(undefined);
                }
            }
        }).catch(
            (err) => console.error(err)
        );
    }

    themeSwitch(e) {
        e.preventDefault();
        const newTheme = (this.state.theme === 'light')? 'night' : 'light';
        this.setState({theme: newTheme});
    }

    async getBoundary() {
        // This is always at /geometries/
        const data = await apiGet('/geometries/boundary-detailed.geojson') as GeoJsonObject; 

        this.setState({
            boundary: data
        });
    }

    componentDidMount() {
        console.log("CLIENT-SIDE DID MOUNT RUNNING SUCCESSFULLY");
        this.getBoundary();
        this.getSectorGeometries(); 
    }

    sector209aStyleFn = () => ({
        color: '#FFD700',      // Gold outline
        weight: 4,             
        opacity: 1,
        fillColor: '#FFD700',  
        fillOpacity: 0.1,      
    });

    sector209bStyleFn = () => ({
        color: '#8A2BE2',      // Blue-Violet outline
        weight: 4,             
        opacity: 1,
        fillColor: '#8A2BE2',  
        fillOpacity: 0.1,      
    });

    render() {
        const position: [number, number] = [this.state.lat, this.state.lng];

        // baselayer
        const key = OS_API_KEY;
        const tilematrixSet = 'EPSG:3857';
        const layer = (this.state.theme === 'light')? 'Light 3857' : 'Night 3857';
        const baseUrl = `https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/${tilematrixSet}/${layer}/{z}/{x}/{y}.png?key=${key}`;
        const attribution = 'Building attribute data is © Colouring London contributors. Maps contain OS data © Crown copyright: OS Maps baselayers and building outlines. <a href=/ordnance-survey-licence.html>OS licence</a>';
        const baseLayer = <TileLayer
            url={baseUrl}
            attribution={attribution}
            maxNativeZoom={18}
            maxZoom={19}
        />;

        const buildingsBaseUrl = `/tiles/base_${this.state.theme}/{z}/{x}/{y}{r}.png`;
        const buildingBaseLayer = <TileLayer url={buildingsBaseUrl} minZoom={14} maxZoom={19}/>;


        const boundaryStyleFn = () => ({color: '#bbb', fill: false});
        const boundaryLayer = this.state.boundary &&
            <GeoJSON data={this.state.boundary} style={boundaryStyleFn}/>;

        // Layer for Sector 209a
        const sector209aLayer = this.state.sector209a &&
            <GeoJSON 
                key="sector209a"
                data={this.state.sector209a} 
                style={this.sector209aStyleFn}
                coordsToLatLng={this.coordsToLatLng} 
            />;
            
        // Layer for Sector 209b
        const sector209bLayer = this.state.sector209b &&
            <GeoJSON 
                key="sector209b"
                data={this.state.sector209b} 
                style={this.sector209bStyleFn}
                coordsToLatLng={this.coordsToLatLng} 
            />;


        // colour-data tiles
        const cat = this.props.category;
        const tilesetByCat = {
            age: 'date_year',
            size: 'size_height',
            construction: 'construction_core_material',
            location: 'location',
            community: 'likes',
            planning: 'planning_combined',
            sustainability: 'sust_dec',
            type: 'building_attachment_form',
            use: 'landuse'
        };
        const tileset = tilesetByCat[cat];
        const rev = this.props.revision_id;
        const dataLayer = tileset != undefined ?
            <TileLayer
                key={tileset}
                url={`/tiles/${tileset}/{z}/{x}/{y}{r}.png?rev=${rev}`}
                minZoom={9}
                maxZoom={19}
            />
            : null;

        // highlight
        const highlightLayer = this.props.building != undefined ?
            <TileLayer
                key={this.props.building.building_id}
                url={`/tiles/highlight/{z}/{x}/{y}{r}.png?highlight=${this.props.building.building_id}&base=${tileset}`}
                minZoom={13}
                maxZoom={19}
                zIndex={100}
            />
            : null;

        const numbersLayer = <TileLayer
            key={this.state.theme}
            url={`/tiles/number_labels/{z}/{x}/{y}{r}.png?rev=${rev}`}
            zIndex={200}
            minZoom={17}
            maxZoom={19}
        />

        const isEdit = ['edit', 'multi-edit'].includes(this.props.mode);

        return (
            <div className="map-container">
                {/* Use the renamed component LeafletMap */}
                <LeafletMap
                    ref={this.mapRef as any}
                    center={position}
                    zoom={this.state.zoom}
                    minZoom={9}
                    maxZoom={19}
                    doubleClickZoom={false}
                    zoomControl={false}
                    attributionControl={false}
                    onClick={this.handleClick}
                    detectRetina={true}
                >
                    { baseLayer }
                    { buildingBaseLayer }
                    
                    { sector209aLayer } 
                    { sector209bLayer } 
                    
                    { boundaryLayer }
                    { dataLayer }
                    { highlightLayer }
                    { numbersLayer }
                    <ZoomControl position="topright" />
                    <AttributionControl prefix=""/>
                </LeafletMap>
                {
                    this.props.mode !== 'basic'? (
                        <Fragment>
                            {
                                this.props.building == undefined ?
                                    <div className="map-notice">
                                        <HelpIcon /> {isEdit ? 'Click a building to edit' : 'Click a building for details'}
                                    </div>
                                    : null
                            }
                            <Legend slug={cat} />
                            <ThemeSwitcher onSubmit={this.themeSwitch} currentTheme={this.state.theme} />
                            <SearchBox onLocate={this.handleLocate} />
                        </Fragment>
                    ) : null
                }
            </div>
        );
    }
}

export default ColouringMap;