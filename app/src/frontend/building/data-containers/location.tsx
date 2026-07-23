import React, { Fragment } from 'react';
import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import withCopyEdit from '../data-container';
import { PatternDataEntry } from '../data-components/pattern-data-entry';
import { CategoryViewProps } from './category-view-props';
import { DataEntryGroup } from '../data-components/data-entry-group';
import Verification from '../data-components/verification';
import InfoBox from '../../components/info-box';

const locationNumberPattern = "[1-9]\\d*[a-z]?(-([1-9]\\d*))?";
const postcodeCharacterPattern = "^[A-Z]{1,2}[0-9]{1,2}[A-Z]?(\\s*[0-9][A-Z]{1,2})?$";

const LocationView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Individual Building/Property Address" collapsed={subcat==null || subcat!="1"}>
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
                    disabled={true}
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
                    disabled={true}
                />
                <Verification
                    slug="location_town"
                    allow_verify={props.user !== undefined && props.building.location_town !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("location_town")}
                    user_verified_as={props.user_verified.location_town}
                    verified_count={props.building.verified.location_town}
                />
                <PatternDataEntry
                    title={dataFields.location_postcode.title}
                    slug="location_postcode"
                    value={props.building.location_postcode}
                    pattern={postcodeCharacterPattern}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    maxLength={8}
                    valueTransform={x=>x.toUpperCase()}
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
                    title={dataFields.size_parcel_geometry.title}
                    slug="size_parcel_geometry"
                    value={props.building.size_parcel_geometry}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_parcel_geometry.tooltip}
                    placeholder="https://..."
                    isUrl={true}
                />
                <Verification
                    slug="size_parcel_geometry"
                    allow_verify={props.user !== undefined && props.building.size_parcel_geometry !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("size_parcel_geometry")}
                    user_verified_as={props.user_verified.size_parcel_geometry}
                    verified_count={props.building.verified.size_parcel_geometry}
                />
            </DataEntryGroup>
            <DataEntryGroup name="Building Footprint Issues" collapsed={subcat==null || subcat!="2"}>
                <InfoBox>
                    Please let us know of any inaccuracies here. Select what is wrong with the building footprint.
                </InfoBox>
                <InfoBox type='warning'>
                    This section is under development. Options will follow the footprint issues legend (Slide 7).
                </InfoBox>
            </DataEntryGroup>
        </Fragment>
    );
};
const LocationContainer = withCopyEdit(LocationView);

export default LocationContainer;
