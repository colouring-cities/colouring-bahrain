import React, { Fragment } from 'react';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import { DataEntryGroup } from '../data-components/data-entry-group';
import InfoBox from '../../components/info-box';

const RetrofitConditionView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Heritage Assessment Criteria" collapsed={subcat==null || subcat!="1"}>
                <InfoBox type='info'>
                    This section is under development.
                </InfoBox>
            </DataEntryGroup>
            <DataEntryGroup name="Inspection Requests" collapsed={subcat==null || subcat!="2"}>
                <InfoBox type='warning'>
                    This section is under development. Fields will include: Has the building undergone an inspection?, Inspection date, and Purpose of the inspection.
                </InfoBox>
            </DataEntryGroup>
        </Fragment>
    );
};
const RetrofitConditionContainer = withCopyEdit(RetrofitConditionView);

export default RetrofitConditionContainer;
