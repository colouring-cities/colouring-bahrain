import React, { Fragment } from 'react';
import { dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import Verification from '../data-components/verification';
import { DataEntryGroup } from '../data-components/data-entry-group';
import '../../map/map-button.css';

/** Land use options — same as map legend (Slide 8). */
const LAND_USE_OPTIONS = [
    'Residential',
    'Commercial',
    'Mixed Used (Residential / Commercial)',
    'Government buildings, Public Administration',
    'Educational',
    'Cultural',
    'Healthcare Facilities',
    'Hospitality',
    'Recreational',
    'Storage',
    'Religious',
    'Parking',
    'Utility',
    'Formal Parking',
    'Informal Parking',
    'Informal Community Space',
    'Public Square',
    'Unused land',
    'Unidentified',
];

const LandUseView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    const currentLandUse =
        (props.building?.current_landuse_group && props.building.current_landuse_group[0])
        || props.building?.current_landuse_order
        || null;

    const originalLandUse =
        (props.building?.typology_original_use && props.building.typology_original_use[0])
        || props.building?.typology_original_use_order
        || null;

    const onCurrentLandUseChange = (_slug: string, value: string) => {
        props.onChange('current_landuse_group', value ? [value] : null);
    };

    const onOriginalLandUseChange = (_slug: string, value: string) => {
        props.onChange('typology_original_use', value ? [value] : null);
    };

    const showOriginalLandUseMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onMapColourScale?.('original_landuse');
    };

    const originalMapActive = props.mapColourScale === 'original_landuse';

    return (
        <Fragment>
            <DataEntryGroup name="Current Land Use" collapsed={subcat==null || subcat!="1"}>
                <SelectDataEntry
                    title=""
                    slug="current_landuse_group"
                    value={currentLandUse}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={onCurrentLandUseChange}
                    tooltip={dataFields.current_landuse_group.tooltip}
                    options={LAND_USE_OPTIONS}
                />
                <Verification
                    slug="current_landuse_group"
                    allow_verify={props.user !== undefined && props.building?.current_landuse_group !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("current_landuse_group")}
                    user_verified_as={props.user_verified.current_landuse_group && props.user_verified.current_landuse_group.join(", ")}
                    verified_count={props.building?.verified?.current_landuse_group}
                />
            </DataEntryGroup>

            <DataEntryGroup name="Original (Historical) Use" collapsed={subcat==null || subcat!="2"}>
                <button
                    type="button"
                    className={`clickable-info-box${originalMapActive ? ' is-active' : ''}`}
                    onClick={showOriginalLandUseMap}
                    title="Show original land use on the map"
                >
                    Click here to see original land use
                </button>
                <SelectDataEntry
                    title={dataFields.typology_original_use.title}
                    slug="typology_original_use"
                    value={originalLandUse}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={onOriginalLandUseChange}
                    tooltip={dataFields.typology_original_use.tooltip}
                    options={LAND_USE_OPTIONS}
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
                    options={dataFields.typology_original_use_source_type.items}
                />
            </DataEntryGroup>
        </Fragment>
    );
};
const LandUseContainer = withCopyEdit(LandUseView);

export default LandUseContainer;
