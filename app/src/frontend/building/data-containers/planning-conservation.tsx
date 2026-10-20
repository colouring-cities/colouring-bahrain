import React, { Fragment } from 'react';

import '../../map/map-button.css';
import { dataFields } from '../../config/data-fields-config';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import DataEntry from '../data-components/data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';
import { useDisplayPreferences } from '../../displayPreferences-context';

const PlanningConservationView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    const { conservation, conservationSwitchOnClick, darkLightTheme } = useDisplayPreferences();

    return (
        <Fragment>
            <DataEntryGroup name="Heritage Assets & Building Protection" collapsed={subcat==null || subcat!="1"}>
                <button className={`map-switcher-inline ${conservation}-state btn btn-outline btn-outline-dark ${darkLightTheme}`} onClick={conservationSwitchOnClick}>
                    {(conservation === 'enabled')? 'Click to hide Protection Zones' : 'Click to see Protection Zones'}
                </button>
                <LogicalDataEntry
                    slug="planning_world_heritage_site"
                    title={dataFields.planning_world_heritage_site.title}
                    tooltip={dataFields.planning_world_heritage_site.tooltip}
                    value={props.building.planning_world_heritage_site}
                    onChange={props.onChange}
                    mode={props.mode}
                    copy={props.copy}
                />
                <Verification
                    slug="planning_world_heritage_site"
                    allow_verify={props.user !== undefined && props.building.planning_world_heritage_site !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_world_heritage_site")}
                    user_verified_as={props.user_verified.planning_world_heritage_site}
                    verified_count={props.building.verified.planning_world_heritage_site}
                />
                <LogicalDataEntry
                    slug="planning_listed"
                    title={dataFields.planning_listed.title}
                    tooltip={dataFields.planning_listed.tooltip}
                    value={props.building.planning_listed}
                    onChange={props.onChange}
                    mode={props.mode}
                    copy={props.copy}
                />
                <Verification
                    slug="planning_listed"
                    allow_verify={props.user !== undefined && props.building.planning_listed !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_listed")}
                    user_verified_as={props.user_verified.planning_listed}
                    verified_count={props.building.verified.planning_listed}
                />
                <SelectDataEntry
                    title="What is its protection rating?"
                    slug="conservation_designation"
                    value={props.building.conservation_designation}
                    tooltip={dataFields.conservation_designation.tooltip}
                    options={dataFields.conservation_designation.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="conservation_designation"
                    allow_verify={props.user !== undefined && props.building.conservation_designation !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("conservation_designation")}
                    user_verified_as={props.user_verified.conservation_designation}
                    verified_count={props.building.verified.conservation_designation}
                />
                <DataEntry
                    title="Site / building listing Criteria"
                    slug="planning_listing_criteria"
                    value={props.building.planning_listing_criteria}
                    tooltip={dataFields.planning_listing_criteria.tooltip}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="planning_listing_criteria"
                    allow_verify={props.user !== undefined && props.building.planning_listing_criteria !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_listing_criteria")}
                    user_verified_as={props.user_verified.planning_listing_criteria}
                    verified_count={props.building.verified.planning_listing_criteria}
                />
                <LogicalDataEntry
                    slug="planning_in_apa"
                    title={dataFields.planning_in_apa.title}
                    tooltip={dataFields.planning_in_apa.tooltip}
                    value={props.building.planning_in_apa}
                    onChange={props.onChange}
                    mode={props.mode}
                    copy={props.copy}
                />
                <Verification
                    slug="planning_in_apa"
                    allow_verify={props.user !== undefined && props.building.planning_in_apa !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("planning_in_apa")}
                    user_verified_as={props.user_verified.planning_in_apa}
                    verified_count={props.building.verified.planning_in_apa}
                />
            </DataEntryGroup>
            <DataEntryGroup name="Heritage Value" collapsed={subcat==null || subcat!="2"}>
                <SelectDataEntry
                    title={dataFields.heritage_value.title}
                    slug="heritage_value"
                    value={props.building.heritage_value}
                    tooltip={dataFields.heritage_value.tooltip}
                    options={dataFields.heritage_value.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="heritage_value"
                    allow_verify={props.user !== undefined && props.building.heritage_value !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("heritage_value")}
                    user_verified_as={props.user_verified.heritage_value}
                    verified_count={props.building.verified.heritage_value}
                />
            </DataEntryGroup>
            <DataEntryGroup name="Historic Area Classifications" collapsed={subcat==null || subcat!="3"}>
                <p className="data-intro">
                    View classifications on the map when the Historic Area Classifications colour scale is active.
                </p>
            </DataEntryGroup>
        </Fragment>
    );
};
const PlanningConservationContainer = withCopyEdit(PlanningConservationView);

export default PlanningConservationContainer;
