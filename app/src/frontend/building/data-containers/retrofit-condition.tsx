import React, { Fragment } from 'react';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { dataFields } from '../../config/data-fields-config';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import DataEntry from '../data-components/data-entry';
import DataPickerDataEntry from '../data-components/date-picker-data-entry';
import SelectDataEntry from '../data-components/select-data-entry';
import Verification from '../data-components/verification';

const formatDateValue = (value: Date | string | null): string | null => {
    if (value == null) return null;
    if (typeof value === 'string') return value.slice(0, 10);
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const ASSESSMENT_CRITERIA_OPTIONS = [
    'Sorting',
    'Evaluation',
    'Study',
    'Completed',
];

const RetrofitConditionView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    const onInspectionDateChange = (slug: string, value: Date | string | null) => {
        props.onChange(slug, formatDateValue(value));
    };

    const showInspectionDetails = props.building.inspection_undergone === true;

    return (
        <Fragment>
            <DataEntryGroup name="Heritage Assessment Criteria" collapsed={subcat==null || subcat!="1"}>
                <SelectDataEntry
                    title="Current status of heritage assessment"
                    slug="heritage_assessment_criteria"
                    value={props.building.heritage_assessment_criteria}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                    options={ASSESSMENT_CRITERIA_OPTIONS}
                />
                <Verification
                    slug="heritage_assessment_criteria"
                    allow_verify={props.user !== undefined && props.building.heritage_assessment_criteria !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("heritage_assessment_criteria")}
                    user_verified_as={props.user_verified.heritage_assessment_criteria}
                    verified_count={props.building.verified.heritage_assessment_criteria}
                />
            </DataEntryGroup>
            <DataEntryGroup name="Inspection Requests" collapsed={subcat==null || subcat!="2"}>
                <LogicalDataEntry
                    slug="inspection_undergone"
                    title={dataFields.inspection_undergone.title}
                    tooltip={dataFields.inspection_undergone.tooltip}
                    value={props.building.inspection_undergone}
                    onChange={props.onChange}
                    mode={props.mode}
                    copy={props.copy}
                />
                <Verification
                    slug="inspection_undergone"
                    allow_verify={props.user !== undefined && props.building.inspection_undergone !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("inspection_undergone")}
                    user_verified_as={props.user_verified.inspection_undergone}
                    verified_count={props.building.verified.inspection_undergone}
                />
                {showInspectionDetails ? (
                    <>
                        <DataPickerDataEntry
                            title="Inspection date"
                            slug="inspection_date"
                            value={props.building.inspection_date}
                            tooltip={dataFields.inspection_date.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={onInspectionDateChange}
                        />
                        <Verification
                            slug="inspection_date"
                            allow_verify={props.user !== undefined && props.building.inspection_date !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("inspection_date")}
                            user_verified_as={props.user_verified.inspection_date}
                            verified_count={props.building.verified.inspection_date}
                        />
                        <DataEntry
                            title="Purpose of the Inspection"
                            slug="inspection_purpose"
                            value={props.building.inspection_purpose}
                            tooltip={dataFields.inspection_purpose.tooltip}
                            mode={props.mode}
                            copy={props.copy}
                            onChange={props.onChange}
                        />
                        <Verification
                            slug="inspection_purpose"
                            allow_verify={props.user !== undefined && props.building.inspection_purpose !== null && !props.edited}
                            onVerify={props.onVerify}
                            user_verified={props.user_verified.hasOwnProperty("inspection_purpose")}
                            user_verified_as={props.user_verified.inspection_purpose}
                            verified_count={props.building.verified.inspection_purpose}
                        />
                    </>
                ) : null}
            </DataEntryGroup>
        </Fragment>
    );
};
const RetrofitConditionContainer = withCopyEdit(RetrofitConditionView);

export default RetrofitConditionContainer;
