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

type MaterialField = {
    valueSlug: string;
    sourceSlug: string;
    linksSlug: string;
};

const MATERIAL_FIELDS: MaterialField[] = [
    {
        valueSlug: 'construction_core_material',
        sourceSlug: 'construction_core_material_source_type',
        linksSlug: 'construction_core_material_source_links',
    },
    {
        valueSlug: 'construction_external_wall',
        sourceSlug: 'construction_external_wall_source_type',
        linksSlug: 'construction_external_wall_source_links',
    },
    {
        valueSlug: 'construction_internal_wall',
        sourceSlug: 'construction_internal_wall_source_type',
        linksSlug: 'construction_internal_wall_source_links',
    },
    {
        valueSlug: 'construction_ground_floor',
        sourceSlug: 'construction_ground_floor_source_type',
        linksSlug: 'construction_ground_floor_source_links',
    },
    {
        valueSlug: 'construction_windows_material',
        sourceSlug: 'construction_windows_material_source_type',
        linksSlug: 'construction_windows_material_source_links',
    },
    {
        valueSlug: 'construction_door_material',
        sourceSlug: 'construction_door_material_source_type',
        linksSlug: 'construction_door_material_source_links',
    },
];

const ConstructionDesignView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Construction" collapsed={subcat==null || subcat!="1"}>
                <DataEntryGroup name="Materials" collapsed={subcat==null || subcat!="1"}>
                    {MATERIAL_FIELDS.map((field, index) => {
                        const fieldConfig = dataFields[field.valueSlug];
                        const sourceConfig = dataFields[field.sourceSlug];
                        const linksConfig = dataFields[field.linksSlug];
                        const value = props.building[field.valueSlug];
                        const sourceValue = props.building[field.sourceSlug];
                        return (
                            <Fragment key={field.valueSlug}>
                                {index > 0 ? <hr/> : null}
                                <SelectDataEntry
                                    title={fieldConfig.title}
                                    slug={field.valueSlug}
                                    value={value}
                                    tooltip={fieldConfig.tooltip}
                                    options={fieldConfig.items}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                />
                                <Verification
                                    slug={field.valueSlug}
                                    allow_verify={props.user !== undefined && value !== null && !props.edited}
                                    onVerify={props.onVerify}
                                    user_verified={props.user_verified.hasOwnProperty(field.valueSlug)}
                                    user_verified_as={props.user_verified[field.valueSlug]}
                                    verified_count={props.building.verified[field.valueSlug]}
                                />
                                <SelectDataEntry
                                    title={sourceConfig.title}
                                    slug={field.sourceSlug}
                                    value={sourceValue}
                                    mode={props.mode}
                                    copy={props.copy}
                                    onChange={props.onChange}
                                    tooltip={sourceConfig.tooltip}
                                    options={sourceConfig.items}
                                />
                                {(sourceValue == commonSourceTypes[0] ||
                                    sourceValue == commonSourceTypes[1] ||
                                    sourceValue == null) ? <></> :
                                    <MultiDataEntry
                                        title={linksConfig.title}
                                        slug={field.linksSlug}
                                        value={props.building[field.linksSlug]}
                                        mode={props.mode}
                                        copy={props.copy}
                                        onChange={props.onChange}
                                        tooltip={linksConfig.tooltip}
                                        placeholder="https://..."
                                        editableEntries={true}
                                        isUrl={true}
                                    />
                                }
                            </Fragment>
                        );
                    })}
                </DataEntryGroup>
            </DataEntryGroup>

            <DataEntryGroup name="Architectural style" collapsed={subcat==null || subcat!="2"}>
                <InfoBox type="warning">
                    This section is under development.
                </InfoBox>
            </DataEntryGroup>

            <DataEntryGroup name="Decorative Features" collapsed={subcat==null || subcat!="3"}>
                <InfoBox type="warning">
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
                    <MultiDataEntry
                        title={dataFields.extension_designers.title}
                        slug="extension_designers"
                        value={props.building.extension_designers}
                        mode={props.mode}
                        copy={props.copy}
                        onChange={props.onChange}
                        tooltip={dataFields.extension_designers.tooltip}
                        placeholder=""
                        editableEntries={true}
                    />
                    <Verification
                        slug="extension_designers"
                        allow_verify={props.user !== undefined && props.building.extension_designers !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("extension_designers")}
                        user_verified_as={props.user_verified.extension_designers}
                        verified_count={props.building.verified.extension_designers}
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
                    />
                    <Verification
                        slug="designers"
                        allow_verify={props.user !== undefined && props.building.designers !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("designers")}
                        user_verified_as={props.user_verified.designers}
                        verified_count={props.building.verified.designers}
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
                        slug="designer_awards"
                        title={dataFields.designer_awards.title}
                        value={props.building.designer_awards}
                        onChange={props.onChange}
                        mode={props.mode}
                        copy={props.copy}
                    />
                    <Verification
                        slug="designer_awards"
                        allow_verify={props.user !== undefined && props.building.designer_awards !== null && !props.edited}
                        onVerify={props.onVerify}
                        user_verified={props.user_verified.hasOwnProperty("designer_awards")}
                        user_verified_as={props.user_verified.designer_awards}
                        verified_count={props.building.verified.designer_awards}
                    />
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
                </DataEntryGroup>
            </DataEntryGroup>
        </Fragment>
    );
};
const ConstructionDesignContainer = withCopyEdit(ConstructionDesignView);

export default ConstructionDesignContainer;
