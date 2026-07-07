import './community.css';
import React, { Fragment } from 'react';
import withCopyEdit from '../data-container';
import { DataEntryGroup } from '../data-components/data-entry-group';
import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';

const CommunityView: React.FunctionComponent<CategoryViewProps> = (props) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const subcat = queryParameters.get("sc");

    return (
        <Fragment>
            <DataEntryGroup name="Investment" collapsed={subcat==null || subcat!="1"}>
                <InfoBox type='warning'>
                    This section is under development.
                </InfoBox>
            </DataEntryGroup>
            <DataEntryGroup name="Engagement" collapsed={subcat==null || subcat!="2"}>
                <div className={`alert alert-dark`} role="alert" style={{ fontSize: 14, backgroundColor: "#f6f8f9" }}>
                    <i>
                        Do you have any information you would like to verify about this building?
                    </i>
                </div>
                <InfoBox type='warning'>
                    This section is under development. Fields will include: Full Name, Property Ownership / Supporting Evidence (CPR), and Attachments (supporting documents, plans, photos or recordings).
                </InfoBox>
            </DataEntryGroup>
        </Fragment>
    );
};
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;
