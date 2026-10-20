import React, { Fragment } from 'react';
import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import withCopyEdit from '../data-container';
import { PatternDataEntry } from '../data-components/pattern-data-entry';
import { CategoryViewProps } from './category-view-props';
import { DataEntryGroup } from '../data-components/data-entry-group';
import Verification from '../data-components/verification';
import SelectDataEntry from '../data-components/select-data-entry';
import InfoBox from '../../components/info-box';

const locationNumberPattern = "[1-9]\\d*[a-z]?(-([1-9]\\d*))?";

const FOOTPRINT_ISSUE_OPTIONS = [
    { value: 'Split', label: 'Should be split into two or more buildings.' },
    { value: 'Merged', label: 'Should be merged into one building.' },
    { value: 'Unregistered', label: 'Building is missing.' },
];

const LocationView: React.FunctionComponent<CategoryViewProps> = (props) => {
    return (
        <Fragment>
            <DataEntryGroup name="Individual Building/Property Address">
                <PatternDataEntry
                    title={dataFields.location_number.title}
                    slug="location_number"
                    value={props.building.location_number}
                    pattern={locationNumberPattern}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.location_number.tooltip}
                    maxLength={5}
                />
                <Verification
                    slug="location_number"
                    allow_verify={props.user !== undefined && props.building.location_number !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_number")}
                    user_verified_as={props.user_verified.location_number}
                    verified_count={props.building.verified.location_number}
                />
                <DataEntry
                    title={dataFields.location_street.title}
                    slug="location_street"
                    value={props.building.location_street}
                    tooltip={dataFields.location_street.tooltip}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    maxLength={30}
                />
                <Verification
                    slug="location_street"
                    allow_verify={props.user !== undefined && props.building.location_street !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_street")}
                    user_verified_as={props.user_verified.location_street}
                    verified_count={props.building.verified.location_street}
                />
                <DataEntry
                    title={dataFields.location_town.title}
                    slug="location_town"
                    value={props.building.location_town}
                    tooltip={dataFields.location_town.tooltip}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="location_town"
                    allow_verify={props.user !== undefined && props.building.location_town !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_town")}
                    user_verified_as={props.user_verified.location_town}
                    verified_count={props.building.verified.location_town}
                />
                <DataEntry
                    title={dataFields.location_postcode.title}
                    slug="location_postcode"
                    value={props.building.location_postcode}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    maxLength={20}
                    tooltip={dataFields.location_postcode.tooltip}
                />
                <Verification
                    slug="location_postcode"
                    allow_verify={props.user !== undefined && props.building.location_postcode !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_postcode")}
                    user_verified_as={props.user_verified.location_postcode}
                    verified_count={props.building.verified.location_postcode}
                />
                <DataEntry
                    title={dataFields.location_parcel_number.title}
                    slug="location_parcel_number"
                    value={props.building.location_parcel_number}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.location_parcel_number.tooltip}
                    maxLength={40}
                />
                <Verification
                    slug="location_parcel_number"
                    allow_verify={props.user !== undefined && props.building.location_parcel_number !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_parcel_number")}
                    user_verified_as={props.user_verified.location_parcel_number}
                    verified_count={props.building.verified.location_parcel_number}
                />
            </DataEntryGroup>

            <DataEntryGroup name="Building Footprint Issues">
                <InfoBox type="info">
                    Please let us know of any inaccuracies here
                </InfoBox>
                <SelectDataEntry
                    title="Select what is wrong with building footprint:"
                    slug="building_footprint_issues"
                    value={props.building.building_footprint_issues}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.building_footprint_issues.tooltip}
                    options={FOOTPRINT_ISSUE_OPTIONS}
                />
                <Verification
                    slug="building_footprint_issues"
                    allow_verify={props.user !== undefined && props.building.building_footprint_issues !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("building_footprint_issues")}
                    user_verified_as={props.user_verified.building_footprint_issues}
                    verified_count={props.building.verified.building_footprint_issues}
                />
            </DataEntryGroup>
        </Fragment>
    );
};
const LocationContainer = withCopyEdit(LocationView);

export default LocationContainer;
