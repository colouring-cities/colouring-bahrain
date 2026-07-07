import React from 'react';
import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import { DataEntryGroup } from '../data-components/data-entry-group';
import SelectDataEntry from '../data-components/select-data-entry';
import withCopyEdit from '../data-container';
import Verification from '../data-components/verification';
import { CategoryViewProps } from './category-view-props';

const DisasterManagementView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    const switchToIsSeverityMapStyle = (e) => {
        e.preventDefault();
        props.onMapColourScale('disaster_severity');
    };

    return (<>
        <DataEntryGroup name="Disaster Management Tool" collapsed={subcat==null || subcat!="1"}>
            {(props.mapColourScale != "disaster_severity") ? 
                <button className={`map-switcher-inline disabled-state btn btn-outline btn-outline-dark key-button`} onClick={switchToIsSeverityMapStyle}>
                    Click to show general condition of the building.
                </button>
            : <></>}
            <SelectDataEntry
                slug='disaster_severity'
                title={dataFields.disaster_severity.title}
                value={props.building.disaster_severity}
                options={dataFields.disaster_severity.items}
                tooltip={dataFields.disaster_severity.tooltip}
                onChange={props.onChange}
                mode={props.mode}
                copy={props.copy}
            />
            <Verification
                slug="disaster_severity"
                allow_verify={props.user !== undefined && props.building.disaster_severity !== null && !props.edited}
                onVerify={props.onVerify}
                user_verified={props.user_verified.hasOwnProperty("disaster_severity")}
                user_verified_as={props.user_verified.disaster_severity}
                verified_count={props.building.verified.disaster_severity}
            />
            <InfoBox type='warning'>
                Is there a visible risk of collapse? (Field under development)
            </InfoBox>
        </DataEntryGroup>
        <DataEntryGroup name="Resilience Indicators & Risk Assessment" collapsed={subcat==null || subcat!="2"}>
            <InfoBox type='warning'>
                This section is under development.
            </InfoBox>
        </DataEntryGroup>
        <DataEntryGroup name="Heritage at Risk" collapsed={subcat==null || subcat!="3"}>
            <InfoBox type='warning'>
                This section is under development.
            </InfoBox>
        </DataEntryGroup>
    </>);
};

const DisasterManagementContainer = withCopyEdit(DisasterManagementView);

export default DisasterManagementContainer;
