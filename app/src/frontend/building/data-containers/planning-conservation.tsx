import React, { Fragment } from 'react';

import '../../map/map-button.css';
import { dataFields } from '../../config/data-fields-config';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import DataEntry from '../data-components/data-entry';
import InfoBox from '../../components/info-box';

import { CategoryViewProps } from './category-view-props';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import { useDisplayPreferences } from '../../displayPreferences-context';
import NumericDataEntryWithFormattedLink from '../data-components/numeric-data-entry-with-formatted-link';

const PlanningConservationView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    const switchToBuildingProtectionMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('planning_combined');
    };

    const { conservation, conservationSwitchOnClick, darkLightTheme } = useDisplayPreferences();

    return (
        <Fragment>
            <DataEntryGroup name="Heritage Assets & Building Protection" collapsed={subcat==null || subcat!="1"}>
                <InfoBox>
                    Help us produce the most accurate map possible for designated/protected buildings. Please add data if missing or click &quot;Verify&quot; where entries are correct.
                </InfoBox>
                {props.mapColourScale != "planning_combined" ?
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToBuildingProtectionMapStyle}>
                        Click to see Protection Zones
                    </button>
                : <></>}
                <button className={`map-switcher-inline ${conservation}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={conservationSwitchOnClick}>
                    {(conservation === 'enabled')? 'Click to hide Protection Zones' : 'Click to see Protection Zones'}
                </button>
                <hr/>
                <LogicalDataEntry
                    slug='planning_world_heritage_site'
                    title={dataFields.planning_world_heritage_site.title}
                    tooltip={dataFields.planning_world_heritage_site.tooltip}
                    value={props.building.planning_world_heritage_site}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_world_heritage_site"
                    allow_verify={props.user !== undefined && props.building.planning_world_heritage_site !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_world_heritage_site")}
                    user_verified_as={props.user_verified.planning_world_heritage_site}
                    verified_count={props.building.verified.planning_world_heritage_site}
                />
                {(props.building.planning_world_heritage_site == null || props.building.planning_world_heritage_site == false) ? <></> :
                    <>
                        <NumericDataEntryWithFormattedLink
                            title={dataFields.planning_world_list_id.title}
                            slug="planning_world_list_id"
                            value={props.building.planning_world_list_id}
                            tooltip={dataFields.planning_world_list_id.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            placeholder="add ID here"
                            linkTargetFunction={(id: String) => { return "https://whc.unesco.org/en/list/" + id; }}
                            linkDescriptionFunction={() => { return "UNESCO Link"; }}
                        />
                        <Verification
                            slug="planning_world_list_id"
                            allow_verify={props.user !== undefined && props.building.planning_world_list_id !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("planning_world_list_id")}
                            user_verified_as={props.user_verified.planning_world_list_id}
                            verified_count={props.building.verified.planning_world_list_id}
                        />
                    </>
                }
                <hr/>
                <LogicalDataEntry
                    slug='planning_listed'
                    title={dataFields.planning_listed.title}
                    tooltip={dataFields.planning_listed.tooltip}
                    value={props.building.planning_listed}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_listed"
                    allow_verify={props.user !== undefined && props.building.planning_listed !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_listed")}
                    user_verified_as={props.user_verified.planning_listed}
                    verified_count={props.building.verified.planning_listed}
                />
                {(props.building.planning_listed == null || props.building.planning_listed == false) ? <></> :
                    <>
                        <SelectDataEntry
                            title={dataFields.planning_list_grade.title}
                            slug="planning_list_grade"
                            value={props.building.planning_list_grade}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.planning_list_grade.tooltip}
                            options={dataFields.planning_list_grade.items}
                        />
                        <NumericDataEntryWithFormattedLink
                            title={dataFields.planning_list_id.title}
                            slug="planning_list_id"
                            value={props.building.planning_list_id}
                            tooltip={dataFields.planning_list_id.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            placeholder="add ID here"
                            linkTargetFunction={(id: String) => { return "https://historicengland.org.uk/listing/the-list/list-entry/" + id; }}
                            linkDescriptionFunction={() => { return "Historic England Link"; }}
                        />
                    </>
                }
                <InfoBox>
                    Site / building listing Criteria (Options as per the Designation/Protection legend – Slide 12)
                </InfoBox>
                <hr/>
                <LogicalDataEntry
                    slug='planning_in_apa'
                    title={dataFields.planning_in_apa.title}
                    tooltip={dataFields.planning_in_apa.tooltip}
                    value={props.building.planning_in_apa}
                    copy={props.copy}
                    onChange={props.onChange}
                    mode={props.mode}
                />
                <Verification
                    slug="planning_in_apa"
                    allow_verify={props.user !== undefined && props.building.planning_in_apa !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_in_apa")}
                    user_verified_as={props.user_verified.planning_in_apa}
                    verified_count={props.building.verified.planning_in_apa}
                />
                {(props.building.planning_in_apa == null || props.building.planning_in_apa == false) ? <></> :
                    <>
                        <DataEntry
                            title={dataFields.planning_in_apa_url.title}
                            slug="planning_in_apa_url"
                            value={props.building.planning_in_apa_url}
                            tooltip={dataFields.planning_in_apa_url.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            isUrl={true}
                            placeholder="Please add relevant link here"
                        />
                        <Verification
                            slug="planning_in_apa_url"
                            allow_verify={props.user !== undefined && props.building.planning_in_apa_url !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("planning_in_apa_url")}
                            user_verified_as={props.user_verified.planning_in_apa_url}
                            verified_count={props.building.verified.planning_in_apa_url}
                        />
                    </>
                }
            </DataEntryGroup>
        </Fragment>
    );
};
const PlanningConservationContainer = withCopyEdit(PlanningConservationView);

export default PlanningConservationContainer;
