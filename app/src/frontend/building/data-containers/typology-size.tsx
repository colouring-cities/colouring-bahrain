import React, { Fragment } from 'react';

import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import NumericDataEntry from '../data-components/numeric-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import InfoBox from '../../components/info-box';

const TypologySizeView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const switchToClassificationMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('typology_classification');
    };

    let total_floors = 0;
    if (props.building.size_storeys_attic != null) {
        total_floors += props.building.size_storeys_attic;
    }
    if (props.building.size_storeys_core != null) {
        total_floors += props.building.size_storeys_core;
    }
    if (props.building.size_storeys_basement != null) {
        total_floors += props.building.size_storeys_basement;
    }

    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Typology" collapsed={subcat==null || subcat!="1"}>
                {(props.mapColourScale != "typology_classification") ? 
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToClassificationMapStyle}>
                        Click to show typology classification.
                    </button>
                : <></>}
                <SelectDataEntry
                    title={dataFields.typology_classification.title}
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
                <SelectDataEntry
                    title={dataFields.typology_classification_source_type.title}
                    slug="typology_classification_source_type"
                    value={props.building.typology_classification_source_type}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.typology_classification_source_type.tooltip}
                    placeholder={dataFields.typology_classification_source_type.example}
                    options={dataFields.typology_classification_source_type.items}
                />
                {(props.building.typology_classification_source_type == commonSourceTypes[0] ||
                    props.building.typology_classification_source_type == commonSourceTypes[1] ||
                    props.building.typology_classification_source_type == null) ? <></> :
                    <MultiDataEntry
                        title={dataFields.typology_classification_source_links.title}
                        slug="typology_classification_source_links"
                        value={props.building.typology_classification_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.typology_classification_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                    />
                }
            </DataEntryGroup>
            <DataEntryGroup name="Number of Floors/Storeys" collapsed={subcat==null || subcat!="2"}>
                <NumericDataEntry
                    title={dataFields.size_storeys_core.title}
                    slug="size_storeys_core"
                    value={props.building.size_storeys_core}
                    mode={props.mode}
                    copy={props.copy}
                    tooltip={dataFields.size_storeys_core.tooltip}
                    onChange={props.onChange}
                    step={1}
                    min={0}
                />
                <Verification
                    slug="size_storeys_core"
                    allow_verify={props.user !== undefined && props.building.size_storeys_core !== null}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("size_storeys_core")}
                    user_verified_as={props.user_verified.size_storeys_core}
                    verified_count={props.building.verified.size_storeys_core}
                />
                <NumericDataEntry
                    title={dataFields.size_storeys_attic.title}
                    slug="size_storeys_attic"
                    value={props.building.size_storeys_attic}
                    mode={props.mode}
                    copy={props.copy}
                    tooltip={dataFields.size_storeys_attic.tooltip}
                    onChange={props.onChange}
                    step={1}
                    min={0}
                />
                <Verification
                    slug="size_storeys_attic"
                    allow_verify={props.user !== undefined && props.building.size_storeys_attic !== null}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("size_storeys_attic")}
                    user_verified_as={props.user_verified.size_storeys_attic}
                    verified_count={props.building.verified.size_storeys_attic}
                />
                <NumericDataEntry
                    title={dataFields.size_storeys_basement.title}
                    slug="size_storeys_basement"
                    value={props.building.size_storeys_basement}
                    mode={props.mode}
                    copy={props.copy}
                    tooltip={dataFields.size_storeys_basement.tooltip}
                    onChange={props.onChange}
                    step={1}
                    min={0}
                />
                <Verification
                    slug="size_storeys_basement"
                    allow_verify={props.user !== undefined && props.building.size_storeys_basement !== null}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("size_storeys_basement")}
                    user_verified_as={props.user_verified.size_storeys_basement}
                    verified_count={props.building.verified.size_storeys_basement}
                />
                <NumericDataEntry
                    title="Total number of floors"
                    slug="size_total_floors"
                    value={total_floors}
                    mode={props.mode}
                    copy={props.copy}
                    tooltip="Total number of floors, calculated from other values."
                    onChange={props.onChange}
                    step={1}
                    min={0}
                    disabled={true}
                />
                <InfoBox>
                    Is the staircase room connected to the facade? (Options as per the legend – Slide 11)
                </InfoBox>
                <SelectDataEntry
                    title={dataFields.size_storeys_source_type.title}
                    slug="size_storeys_source_type"
                    value={props.building.size_storeys_source_type}
                    options={dataFields.size_storeys_source_type.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_storeys_source_type.tooltip}
                />
                {(props.building.size_storeys_source_type == commonSourceTypes[0] ||
                    props.building.size_storeys_source_type == commonSourceTypes[1] ||
                    props.building.size_storeys_source_type == null) ? <></> :
                    <MultiDataEntry
                        title={dataFields.size_storeys_source_links.title}
                        slug="size_storeys_source_links"
                        value={props.building.size_storeys_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.size_storeys_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                    />
                }
            </DataEntryGroup>
            <DataEntryGroup name="Height" collapsed={subcat==null || subcat!="3"}>
                <NumericDataEntry
                    title={dataFields.size_height_apex.title}
                    slug="size_height_apex"
                    value={props.building.size_height_apex}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_height_apex.tooltip}
                    step={0.1}
                    min={0}
                />
                <Verification
                    slug="size_height_apex"
                    allow_verify={props.user !== undefined && props.building.size_height_apex !== null}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("size_height_apex")}
                    user_verified_as={props.user_verified.size_height_apex}
                    verified_count={props.building.verified.size_height_apex}
                />
                <SelectDataEntry
                    title={dataFields.size_height_apex_source_type.title}
                    slug="size_height_apex_source_type"
                    value={props.building.size_height_apex_source_type}
                    options={dataFields.size_height_apex_source_type.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.size_height_apex_source_type.tooltip}
                />
                {(props.building.size_height_apex_source_type == commonSourceTypes[0] ||
                    props.building.size_height_apex_source_type == commonSourceTypes[1] ||
                    props.building.size_height_apex_source_type == null) ? <></> :
                    <MultiDataEntry
                        title={dataFields.size_height_apex_source_links.title}
                        slug="size_height_apex_source_links"
                        value={props.building.size_height_apex_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.size_height_apex_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                    />
                }
            </DataEntryGroup>
        </Fragment>
    );
};
const TypologySizeContainer = withCopyEdit(TypologySizeView);

export default TypologySizeContainer;
