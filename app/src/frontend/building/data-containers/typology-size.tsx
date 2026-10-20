import React, { Fragment } from 'react';

import { dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import { DataEntryGroup } from '../data-components/data-entry-group';

const TypologySizeView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Typology" collapsed={subcat==null || subcat!="1"}>
                <SelectDataEntry
                    title="Typology"
                    slug="typology_classification"
                    value={props.building.typology_classification}
                    tooltip={dataFields.typology_classification.tooltip}
                    options={dataFields.typology_classification.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="typology_classification"
                    allow_verify={props.user !== undefined && props.building.typology_classification !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("typology_classification")}
                    user_verified_as={props.user_verified.typology_classification}
                    verified_count={props.building.verified.typology_classification}
                />
            </DataEntryGroup>

            <DataEntryGroup name="Number of Floors/Storeys" collapsed={subcat==null || subcat!="2"}>
                <SelectDataEntry
                    title="Number of Floors/Storeys"
                    slug="size_floors_category"
                    value={props.building.size_floors_category}
                    tooltip={dataFields.size_floors_category.tooltip}
                    options={dataFields.size_floors_category.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="size_floors_category"
                    allow_verify={props.user !== undefined && props.building.size_floors_category !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("size_floors_category")}
                    user_verified_as={props.user_verified.size_floors_category}
                    verified_count={props.building.verified.size_floors_category}
                />
                <LogicalDataEntry
                    slug="staircase_connected_to_facade"
                    title="Is the staircase room connected to the facade?"
                    value={props.building.staircase_connected_to_facade}
                    onChange={props.onChange}
                    mode={props.mode}
                    copy={props.copy}
                />
                <Verification
                    slug="staircase_connected_to_facade"
                    allow_verify={props.user !== undefined && props.building.staircase_connected_to_facade !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("staircase_connected_to_facade")}
                    user_verified_as={props.user_verified.staircase_connected_to_facade}
                    verified_count={props.building.verified.staircase_connected_to_facade}
                />
            </DataEntryGroup>

            <DataEntryGroup name="Height" collapsed={subcat==null || subcat!="3"}>
                <NumericDataEntry
                    title="Total building height (m)"
                    slug="size_height_apex"
                    value={props.building.size_height_apex}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    step={0.1}
                    min={0}
                    tooltip={dataFields.size_height_apex.tooltip}
                />
                <Verification
                    slug="size_height_apex"
                    allow_verify={props.user !== undefined && props.building.size_height_apex !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("size_height_apex")}
                    user_verified_as={props.user_verified.size_height_apex}
                    verified_count={props.building.verified.size_height_apex}
                />
            </DataEntryGroup>
        </Fragment>
    );
};
const TypologySizeContainer = withCopyEdit(TypologySizeView);

export default TypologySizeContainer;
