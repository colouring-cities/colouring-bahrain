import React, { Fragment } from 'react';

import { commonSourceTypes, dataFields } from '../../config/data-fields-config';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import { MultiDataEntry } from '../data-components/multi-data-entry/multi-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import InfoBox from '../../components/info-box';

const ConstructionDesignView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    const switchToCoreMaterialMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('construction_core_material');
    };

    return (
        <Fragment>
            <DataEntryGroup name="Construction" collapsed={subcat==null || subcat!="1"}>
                <DataEntryGroup name="Materials" collapsed={subcat==null || subcat!="1"}>
                    {props.mapColourScale != "construction_core_material" ?
                        <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToCoreMaterialMapStyle}>
                            Click to view core material data
                        </button>
                    : <></>}
                    <SelectDataEntry
                        title={dataFields.construction_core_material.title}
                        slug="construction_core_material"
                        value={props.building.construction_core_material}
                        tooltip={dataFields.construction_core_material.tooltip}
                        options={dataFields.construction_core_material.items}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                    <Verification
                        slug="construction_core_material"
                        allow_verify={props.user !== undefined && props.building.construction_core_material !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("construction_core_material")}
                        user_verified_as={props.user_verified.construction_core_material}
                        verified_count={props.building.verified.construction_core_material}
                    />
                    <SelectDataEntry
                        title={dataFields.construction_core_material_source_type.title}
                        slug="construction_core_material_source_type"
                        value={props.building.construction_core_material_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.construction_core_material_source_type.tooltip}
                        placeholder={dataFields.construction_core_material_source_type.example}
                        options={dataFields.construction_core_material_source_type.items}
                    />
                    {(props.building.construction_core_material_source_type == commonSourceTypes[0] ||
                        props.building.construction_core_material_source_type == commonSourceTypes[1] ||
                        props.building.construction_core_material_source_type == null) ? <></> :
                        <MultiDataEntry
                            title={dataFields.construction_core_material_source_links.title}
                            slug="construction_core_material_source_links"
                            value={props.building.construction_core_material_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_core_material_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    }
                    <hr/>
                    <SelectDataEntry
                        title={dataFields.construction_external_wall.title}
                        slug="construction_external_wall"
                        value={props.building.construction_external_wall}
                        tooltip={dataFields.construction_external_wall.tooltip}
                        options={dataFields.construction_external_wall.items}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                    <Verification
                        slug="construction_external_wall"
                        allow_verify={props.user !== undefined && props.building.construction_external_wall !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("construction_external_wall")}
                        user_verified_as={props.user_verified.construction_external_wall}
                        verified_count={props.building.verified.construction_external_wall}
                    />
                    <SelectDataEntry
                        title={dataFields.construction_external_wall_source_type.title}
                        slug="construction_external_wall_source_type"
                        value={props.building.construction_external_wall_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.construction_external_wall_source_type.tooltip}
                        placeholder={dataFields.construction_external_wall_source_type.example}
                        options={dataFields.construction_external_wall_source_type.items}
                    />
                    {(props.building.construction_external_wall_source_type == commonSourceTypes[0] ||
                        props.building.construction_external_wall_source_type == commonSourceTypes[1] ||
                        props.building.construction_external_wall_source_type == null) ? <></> :
                        <MultiDataEntry
                            title={dataFields.construction_external_wall_source_links.title}
                            slug="construction_external_wall_source_links"
                            value={props.building.construction_external_wall_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_external_wall_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    }
                    <hr/>
                    <SelectDataEntry
                        title={dataFields.construction_internal_wall.title}
                        slug="construction_internal_wall"
                        value={props.building.construction_internal_wall}
                        tooltip={dataFields.construction_internal_wall.tooltip}
                        options={dataFields.construction_internal_wall.items}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                    <Verification
                        slug="construction_internal_wall"
                        allow_verify={props.user !== undefined && props.building.construction_internal_wall !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("construction_internal_wall")}
                        user_verified_as={props.user_verified.construction_internal_wall}
                        verified_count={props.building.verified.construction_internal_wall}
                    />
                    <SelectDataEntry
                        title={dataFields.construction_internal_wall_source_type.title}
                        slug="construction_internal_wall_source_type"
                        value={props.building.construction_internal_wall_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.construction_internal_wall_source_type.tooltip}
                        placeholder={dataFields.construction_internal_wall_source_type.example}
                        options={dataFields.construction_internal_wall_source_type.items}
                    />
                    {(props.building.construction_internal_wall_source_type == commonSourceTypes[0] ||
                        props.building.construction_internal_wall_source_type == commonSourceTypes[1] ||
                        props.building.construction_internal_wall_source_type == null) ? <></> :
                        <MultiDataEntry
                            title={dataFields.construction_internal_wall_source_links.title}
                            slug="construction_internal_wall_source_links"
                            value={props.building.construction_internal_wall_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_internal_wall_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    }
                    <hr/>
                    <SelectDataEntry
                        title={dataFields.construction_ground_floor.title}
                        slug="construction_ground_floor"
                        value={props.building.construction_ground_floor}
                        tooltip={dataFields.construction_ground_floor.tooltip}
                        options={dataFields.construction_ground_floor.items}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                    <Verification
                        slug="construction_ground_floor"
                        allow_verify={props.user !== undefined && props.building.construction_ground_floor !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("construction_ground_floor")}
                        user_verified_as={props.user_verified.construction_ground_floor}
                        verified_count={props.building.verified.construction_ground_floor}
                    />
                    <SelectDataEntry
                        title={dataFields.construction_ground_floor_source_type.title}
                        slug="construction_ground_floor_source_type"
                        value={props.building.construction_ground_floor_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.construction_ground_floor_source_type.tooltip}
                        placeholder={dataFields.construction_ground_floor_source_type.example}
                        options={dataFields.construction_ground_floor_source_type.items}
                    />
                    {(props.building.construction_ground_floor_source_type == commonSourceTypes[0] ||
                        props.building.construction_ground_floor_source_type == commonSourceTypes[1] ||
                        props.building.construction_ground_floor_source_type == null) ? <></> :
                        <MultiDataEntry
                            title={dataFields.construction_ground_floor_source_links.title}
                            slug="construction_ground_floor_source_links"
                            value={props.building.construction_ground_floor_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_ground_floor_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    }
                    <hr/>
                    <SelectDataEntry
                        title={dataFields.construction_roof_covering.title}
                        slug="construction_roof_covering"
                        value={props.building.construction_roof_covering}
                        tooltip={dataFields.construction_roof_covering.tooltip}
                        options={dataFields.construction_roof_covering.items}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                    />
                    <Verification
                        slug="construction_roof_covering"
                        allow_verify={props.user !== undefined && props.building.construction_roof_covering !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("construction_roof_covering")}
                        user_verified_as={props.user_verified.construction_roof_covering}
                        verified_count={props.building.verified.construction_roof_covering}
                    />
                    <SelectDataEntry
                        title={dataFields.construction_roof_covering_source_type.title}
                        slug="construction_roof_covering_source_type"
                        value={props.building.construction_roof_covering_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.construction_roof_covering_source_type.tooltip}
                        placeholder={dataFields.construction_roof_covering_source_type.example}
                        options={dataFields.construction_roof_covering_source_type.items}
                    />
                    {(props.building.construction_roof_covering_source_type == commonSourceTypes[0] ||
                        props.building.construction_roof_covering_source_type == commonSourceTypes[1] ||
                        props.building.construction_roof_covering_source_type == null) ? <></> :
                        <MultiDataEntry
                            title={dataFields.construction_roof_covering_source_links.title}
                            slug="construction_roof_covering_source_links"
                            value={props.building.construction_roof_covering_source_links}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.construction_roof_covering_source_links.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    }
                </DataEntryGroup>
            </DataEntryGroup>
            <DataEntryGroup name="Architectural style" collapsed={subcat==null || subcat!="2"}>
                <InfoBox type='warning'>
                    This section is under development.
                </InfoBox>
            </DataEntryGroup>
            <DataEntryGroup name="Decorative Features" collapsed={subcat==null || subcat!="3"}>
                <InfoBox type='warning'>
                    This section is under development.
                </InfoBox>
            </DataEntryGroup>
            <DataEntryGroup name="Design/Team" collapsed={subcat==null || subcat!="4"}>
                <DataEntryGroup name="Designer" collapsed={subcat==null || subcat!="4"}>
                    <SelectDataEntry
                        slug='lead_designer_type'
                        title={dataFields.lead_designer_type.title}
                        value={props.building.lead_designer_type}
                        options={dataFields.lead_designer_type.items}
                        tooltip={dataFields.lead_designer_type.tooltip}
                        onChange={props.onChange}
                        mode={props.mode}
                        copy={props.copy}
                    />
                    <Verification
                        slug="lead_designer_type"
                        allow_verify={props.user !== undefined && props.building.lead_designer_type !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("lead_designer_type")}
                        user_verified_as={props.user_verified.lead_designer_type}
                        verified_count={props.building.verified.lead_designer_type}
                    />
                    <SelectDataEntry
                        slug='extension_lead_designer_type'
                        title={dataFields.extension_lead_designer_type.title}
                        value={props.building.extension_lead_designer_type}
                        options={dataFields.extension_lead_designer_type.items}
                        tooltip={dataFields.extension_lead_designer_type.tooltip}
                        onChange={props.onChange}
                        mode={props.mode}
                        copy={props.copy}
                    />
                    <Verification
                        slug="extension_lead_designer_type"
                        allow_verify={props.user !== undefined && props.building.extension_lead_designer_type !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("extension_lead_designer_type")}
                        user_verified_as={props.user_verified.extension_lead_designer_type}
                        verified_count={props.building.verified.extension_lead_designer_type}
                    />
                    <MultiDataEntry
                        title={dataFields.designers.title}
                        slug="designers"
                        value={props.building.designers}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.designers.tooltip}
                        placeholder=""
                        editableEntries={true}
                        disabled={true}
                    />
                    <Verification
                        slug="designers"
                        allow_verify={props.user !== undefined && props.building.designers !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("designers")}
                        user_verified_as={props.user_verified.designers}
                        verified_count={props.building.verified.designers}
                    />
                    <MultiDataEntry
                        title={dataFields.designers_links.title}
                        slug="designers_links"
                        value={props.building.designers_links}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.designers_links.tooltip}
                        placeholder="https://..."
                        editableEntries={true}
                        isUrl={true}
                    />
                    <SelectDataEntry
                        title={dataFields.designers_source_type.title}
                        slug="designers_source_type"
                        value={props.building.designers_source_type}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.designers_source_type.tooltip}
                        options={dataFields.designers_source_type.items}
                        placeholder={dataFields.designers_source_type.example}
                    />
                    {(props.building.designers_source_type == commonSourceTypes[0] ||
                        props.building.designers_source_type == commonSourceTypes[1] ||
                        props.building.designers_source_type == null) ? <></> :
                        <MultiDataEntry
                            title={dataFields.designers_source_link.title}
                            slug="designers_source_link"
                            value={props.building.designers_source_link}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                            tooltip={dataFields.designers_source_link.tooltip}
                            placeholder="https://..."
                            editableEntries={true}
                            isUrl={true}
                        />
                    }
                </DataEntryGroup>
                <DataEntryGroup name="Awards" collapsed={subcat==null || subcat!="5"}>
                    <LogicalDataEntry
                        slug='designer_awards'
                        title={dataFields.designer_awards.title}
                        tooltip={dataFields.designer_awards.tooltip}
                        value={props.building.designer_awards}
                        copy={props.copy}
                        onChange={props.onChange}
                        mode={props.mode}
                    />
                    <Verification
                        slug="designer_awards"
                        allow_verify={props.user !== undefined && props.building.designer_awards !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("designer_awards")}
                        user_verified_as={props.user_verified.designer_awards}
                        verified_count={props.building.verified.designer_awards}
                    />
                    {props.building.designer_awards ? (
                        <>
                            <MultiDataEntry
                                title={dataFields.awards_source_link.title}
                                slug="awards_source_link"
                                value={props.building.awards_source_link}
                                mode={props.mode}
                                copy={props.copy}
                                onChange={props.onChange}
                                tooltip={dataFields.awards_source_link.tooltip}
                                placeholder="https://..."
                                editableEntries={true}
                                isUrl={true}
                            />
                            <Verification
                                slug="awards_source_link"
                                allow_verify={props.user !== undefined && props.building.awards_source_link !== null && !props.edited}
                                onVerify={props.onVerify}
                                user_verified={props.user_verified.hasOwnProperty("awards_source_link")}
                                user_verified_as={props.user_verified.awards_source_link}
                                verified_count={props.building.verified.awards_source_link}
                            />
                        </>
                    ) : null}
                </DataEntryGroup>
            </DataEntryGroup>
        </Fragment>
    );
};
const ConstructionDesignContainer = withCopyEdit(ConstructionDesignView);

export default ConstructionDesignContainer;
