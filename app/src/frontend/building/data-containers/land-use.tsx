import React, { Fragment } from 'react';
import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import Verification from '../data-components/verification';
import { DataEntryGroup } from '../data-components/data-entry-group';

const LandUseView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const switchToLandUseMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('landuse');
    };

    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Current Land Use" collapsed={subcat==null || subcat!="1"}>
                {(props.mapColourScale != "landuse") ? 
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToLandUseMapStyle}>
                        Click to see specific land use.
                    </button>
                : <></>}
                <MultiDataEntry
                    title={dataFields.current_landuse_group.title}
                    slug="current_landuse_group"
                    value={props.building?.current_landuse_group}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    confirmOnEnter={true}
                    tooltip={dataFields.current_landuse_group.tooltip}
                    placeholder="Enter new land use group here"
                    copyable={true}
                    autofill={true}
                    showAllOptionsOnEmpty={true}
                />
                <Verification
                    slug="current_landuse_group"
                    allow_verify={props.user !== undefined && props.building?.current_landuse_group !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("current_landuse_group")}
                    user_verified_as={props.user_verified.current_landuse_group && props.user_verified.current_landuse_group.join(", ")}
                    verified_count={props.building?.verified?.current_landuse_group}
                />
                <SelectDataEntry
                    title={dataFields.current_landuse_source.title}
                    slug="current_landuse_source"
                    value={props.building?.current_landuse_source}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.current_landuse_source.tooltip}
                    placeholder={dataFields.current_landuse_source.example}
                    options={dataFields.current_landuse_source.items}
                />
                {(props.building?.current_landuse_source == commonSourceTypes[0] ||
                    props.building?.current_landuse_source == commonSourceTypes[1] ||
                    props.building?.current_landuse_source == null) ? <></> :
                    <MultiDataEntry
                        title={dataFields.current_landuse_link.title}
                        slug="current_landuse_link"
                        value={props.building?.current_landuse_link}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.current_landuse_link.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                    />
                }
                <DataEntry
                    title={dataFields.current_landuse_order.title}
                    tooltip={dataFields.current_landuse_order.tooltip}
                    slug="current_landuse_order"
                    value={props.building?.current_landuse_order}
                    mode={props.mode}
                    disabled={true}
                    copy={props.copy}
                    onChange={props.onChange}
                />
            </DataEntryGroup>
            <DataEntryGroup name="Original (Historical) Use" collapsed={subcat==null || subcat!="2"}>
                {(props.mapColourScale != "original_landuse") ? 
                    <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToLandUseMapStyle}>
                        Click here to see original land use.
                    </button>
                : <></>}
                <MultiDataEntry
                    title={dataFields.typology_original_use.title}
                    slug="typology_original_use"
                    value={props.building?.typology_original_use}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    confirmOnEnter={true}
                    tooltip={dataFields.typology_original_use.tooltip}
                    placeholder="Type new land use group here"
                    copyable={true}
                    autofill={true}
                    showAllOptionsOnEmpty={true}
                />
                <Verification
                    slug="typology_original_use"
                    allow_verify={props.user !== undefined && props.building?.typology_original_use !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("typology_original_use")}
                    user_verified_as={props.user_verified.typology_original_use}
                    verified_count={props.building?.verified?.typology_original_use}
                />
                <SelectDataEntry
                    title={dataFields.typology_original_use_source_type.title}
                    slug="typology_original_use_source_type"
                    value={props.building?.typology_original_use_source_type}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    tooltip={dataFields.typology_original_use_source_type.tooltip}
                    placeholder={dataFields.typology_original_use_source_type.example}
                    options={dataFields.typology_original_use_source_type.items}
                />
                {(props.building?.typology_original_use_source_type == commonSourceTypes[0] ||
                    props.building?.typology_original_use_source_type == commonSourceTypes[1] ||
                    props.building?.typology_original_use_source_type == null) ? <></> :
                    <MultiDataEntry
                        title={dataFields.typology_original_use_source_links.title}
                        slug="typology_original_use_source_links"
                        value={props.building?.typology_original_use_source_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.typology_original_use_source_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                    />
                }
                {props.mode != 'view' &&
                    <div className={`alert alert-dark`} role="alert" style={{ fontSize: 13, backgroundColor: "#f6f8f9" }}>
                        <i>
                            Below is a more general classification for the original land use of this building, automatically derived from the information above.
                        </i>
                    </div>
                }
                <DataEntry
                    title={dataFields.typology_original_use_order.title}
                    tooltip={dataFields.typology_original_use_order.tooltip}
                    slug="typology_original_use_order"
                    value={props.building?.typology_original_use_order}
                    mode={props.mode}
                    disabled={true}
                    copy={props.copy}
                    onChange={props.onChange}
                />
            </DataEntryGroup>
        </Fragment>
    );
};
const LandUseContainer = withCopyEdit(LandUseView);

export default LandUseContainer;
