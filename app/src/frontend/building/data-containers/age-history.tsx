import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';
import Verification from '../data-components/verification';
import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import { useDisplayPreferences } from '../../displayPreferences-context';
import { DynamicsBuildingPane, DynamicsDataEntry } from './dynamics/dynamics-data-entry';
import { FieldRow } from '../data-components/field-row';
import DataEntry from '../data-components/data-entry';

const AgeHistoryView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const currentYear = new Date().getFullYear();
    const building = props.building;
    const thisYear = (new Date()).getFullYear();
    const currentBuildingConstructionYear = building.date_year || undefined;

    const { historicData, historicDataSwitchOnClick, darkLightTheme } = useDisplayPreferences();
    const { historicMap, historicMapSwitchOnClick } = useDisplayPreferences();

    const switchToSurvivalMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('survival_status');
        historicMapSwitchOnClick(e);
        if (historicData === 'enabled') {
           historicDataSwitchOnClick(e);
        }
    };

    const switchToSurvivalDataStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('survival_status');
        historicDataSwitchOnClick(e);
        if (historicMap === 'enabled') {
            historicMapSwitchOnClick(e);
        }
    };

    const switchToAgeMapStyle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (historicData === 'enabled') {
            historicDataSwitchOnClick(event);
        }
        if (historicMap === 'enabled') {
            historicMapSwitchOnClick(event);
        }
        props.onMapColourScale('date_year');
    };

    let subcat = null;
    if (typeof window !== 'undefined') {
        const queryParameters = new URLSearchParams(window.location.search);
        subcat = queryParameters.get("sc");
    }

    return (
        <Fragment>
            <DataEntryGroup name="Building Age/Construction Date (Crowdsourced)" collapsed={subcat==null || subcat!="1"}>
                {(props.mapColourScale != "date_year") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToAgeMapStyle}>
                        Click to show building age.
                    </button>
                : <></>}
                <NumericDataEntry
                    title={dataFields.date_year.title}
                    slug="date_year"
                    value={props.building.date_year}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={1}
                    max={props.building.date_year_completed}
                    tooltip={dataFields.date_year.tooltip}
                />
                <Verification
                    slug="date_year"
                    allow_verify={props.user !== undefined && props.building.date_year !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("date_year")}
                    user_verified_as={props.user_verified.date_year}
                    verified_count={props.building.verified.date_year}
                />
                <NumericDataEntry
                    title={dataFields.date_year_completed.title}
                    slug="date_year_completed"
                    value={props.building.date_year_completed}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={1}
                    min={props.building.date_year}
                    max={currentYear}
                    tooltip={dataFields.date_year_completed.tooltip}
                />
                <Verification
                    slug="date_year_completed"
                    allow_verify={props.user !== undefined && props.building.date_year_completed !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("date_year_completed")}
                    user_verified_as={props.user_verified.date_year_completed}
                    verified_count={props.building.verified.date_year_completed}
                />
                <SelectDataEntry
                    title={dataFields.date_source_type.title}
                    slug="date_source_type"
                    value={props.building.date_source_type}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.date_source_type.tooltip}
                    options={dataFields.date_source_type.items}
                    placeholder={dataFields.date_source_type.example}
                />
                {(props.building.date_source_type == dataFields.date_source_type.items[0] ||
                    props.building.date_source_type == dataFields.date_source_type.items[1] ||
                    props.building.date_source_type == null) ? <></> :
                    <MultiDataEntry
                        title={dataFields.date_source_links.title}
                        slug="date_source_links"
                        value={props.building.date_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.date_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                    />
                }
            </DataEntryGroup>
            <DataEntryGroup name="Lifespan & Site History" collapsed={subcat==null || subcat!="2"}>
                <DataEntryGroup name="Constructions & Demolitions on this Site" collapsed={subcat==null || subcat!="2"}>
                    <DynamicsBuildingPane>
                        <label>Current building (building age data editable above)</label>
                        <FieldRow>
                            <div>
                                <NumericDataEntry
                                    slug=''
                                    title={dataFields.demolished_buildings.items.year_constructed.title}
                                    value={currentBuildingConstructionYear}
                                    disabled={true}
                                    mode='view'
                                />
                            </div>
                            <div>
                                <NumericDataEntry
                                    slug=''
                                    title={dataFields.demolished_buildings.items.year_demolished.title}
                                    value={undefined}
                                    placeholder='---'
                                    disabled={true}
                                    mode='view'
                                />
                            </div>
                            <div style={{flex: '0 1 27%'}}>
                                <DataEntry
                                    slug=''
                                    title='Lifespan to date'
                                    value={ (thisYear - currentBuildingConstructionYear) + ''}
                                    disabled={true}
                                    mode='view'
                                />
                            </div>
                        </FieldRow>
                    </DynamicsBuildingPane>
                    {
                        currentBuildingConstructionYear == undefined ?
                            <InfoBox>To add historical records, fill in the building age data (above) first.</InfoBox> :
                            <>
                                <LogicalDataEntry
                                    slug='dynamics_has_demolished_buildings'
                                    title={dataFields.dynamics_has_demolished_buildings.title}
                                    value={building.dynamics_has_demolished_buildings}
                                    disallowFalse={(building.demolished_buildings?.length ?? 0) > 0}
                                    disallowNull={(building.demolished_buildings?.length ?? 0) > 0}
                                    onChange={props.onSaveChange}
                                    mode={props.mode}
                                    copy={props.copy}
                                />
                                {
                                    building.dynamics_has_demolished_buildings &&
                                    <>
                                        <DynamicsDataEntry
                                            key={building.building_id}
                                            value={building.demolished_buildings}
                                            editableEntries={true}
                                            slug='demolished_buildings'
                                            title={dataFields.demolished_buildings.title}
                                            mode={props.mode}
                                            onChange={props.onChange}
                                            onSaveAdd={props.onSaveAdd}
                                            hasEdits={props.edited}
                                            maxYear={currentBuildingConstructionYear}
                                            minYear={50}
                                        />
                                        {
                                            props.mode === 'view' &&
                                            <InfoBox>Switch to edit mode to add/edit past building records</InfoBox>
                                        }
                                    </>
                                }
                            </>
                    }
                </DataEntryGroup>
            </DataEntryGroup>
            <DataEntryGroup name="Survival Tracking" collapsed={subcat==null || subcat!="3"}>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                    <i>
                        Can you help us create a map that shows how many buildings in this area have survived since the 1890s?
                        Choose a colour to indicate whether the building has survived.
                    </i>
                </div>
                {(historicMap === "enabled") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToAgeMapStyle}>
                        Click to hide the OS historical map.
                    </button>
                :
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToSurvivalMapStyle}>
                        Click to show the OS historical map.
                    </button>
                }
                {(historicData === "enabled") ? 
                    <button className={`map-switcher-inline enabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToAgeMapStyle}>
                        Click to hide the OS historical map with modern footprints and fill indicating survival status.
                    </button>
                :
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={switchToSurvivalDataStyle}>
                        Click to show the OS historical map with modern footprints and fill indicating survival status.
                    </button>
                }
                <SelectDataEntry
                    title={dataFields.survival_status.title}
                    slug="survival_status"
                    value={props.building.survival_status}
                    tooltip={dataFields.survival_status.tooltip}
                    options={dataFields.survival_status.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <SelectDataEntry
                    title={dataFields.survival_source.title}
                    slug="survival_source"
                    value={props.building.survival_source}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.survival_source.tooltip}
                    placeholder={dataFields.survival_source.example}
                    options={dataFields.survival_source.items}
                />
                {(props.building.survival_source == dataFields.survival_source.items[0] ||
                    props.building.survival_source == dataFields.survival_source.items[1] ||
                    props.building.survival_source == null) ? <></> :
                    <MultiDataEntry
                        title={dataFields.survival_source_links.title}
                        slug="survival_source_links"
                        value={props.building.survival_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.survival_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                    />
                }
            </DataEntryGroup>
        </Fragment>
    );
};

const AgeHistoryContainer = withCopyEdit(AgeHistoryView);

export default AgeHistoryContainer;
