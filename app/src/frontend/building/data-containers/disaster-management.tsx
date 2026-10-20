import React, { Fragment } from 'react';
import InfoBox from '../../components/info-box';
import { DataEntryGroup } from '../data-components/data-entry-group';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import { dataFields } from '../../config/data-fields-config';
import SelectDataEntry from '../data-components/select-data-entry';
import { LogicalDataEntry } from '../data-components/logical-data-entry/logical-data-entry';
import Verification from '../data-components/verification';

const DisasterManagementView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Disaster Management Tool" collapsed={subcat==null || subcat!="1"}>
                <SelectDataEntry
                    title="General condition of the building"
                    slug="disaster_severity"
                    value={props.building.disaster_severity}
                    tooltip={dataFields.disaster_severity.tooltip}
                    options={dataFields.disaster_severity.items}
                    mode={props.mode}
                    copy={props.copy}
                    onChange={props.onChange}
                />
                <Verification
                    slug="disaster_severity"
                    allow_verify={props.user !== undefined && props.building.disaster_severity !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("disaster_severity")}
                    user_verified_as={props.user_verified.disaster_severity}
                    verified_count={props.building.verified.disaster_severity}
                />
                <LogicalDataEntry
                    slug="disaster_collapse_risk"
                    title={dataFields.disaster_collapse_risk.title}
                    tooltip={dataFields.disaster_collapse_risk.tooltip}
                    value={props.building.disaster_collapse_risk}
                    onChange={props.onChange}
                    mode={props.mode}
                    copy={props.copy}
                />
                <Verification
                    slug="disaster_collapse_risk"
                    allow_verify={props.user !== undefined && props.building.disaster_collapse_risk !== null && !props.edited}
                    onVerify={props.onVerify}
                    user_verified={props.user_verified.hasOwnProperty("disaster_collapse_risk")}
                    user_verified_as={props.user_verified.disaster_collapse_risk}
                    verified_count={props.building.verified.disaster_collapse_risk}
                />
            </DataEntryGroup>
            <DataEntryGroup name="Resilience Indicators & Risk Assessment" collapsed={subcat==null || subcat!="2"}>
                <InfoBox type="warning">
                    This section is under development.
                </InfoBox>
            </DataEntryGroup>
            <DataEntryGroup name="Heritage at Risk" collapsed={subcat==null || subcat!="3"}>
                <InfoBox type="warning">
                    This section is under development.
                </InfoBox>
            </DataEntryGroup>
        </Fragment>
    );
};

const DisasterManagementContainer = withCopyEdit(DisasterManagementView);

export default DisasterManagementContainer;
