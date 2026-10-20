import React, { Fragment } from 'react';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';

const CommunityView: React.FunctionComponent<CategoryViewProps> = () => {
    return (
        <Fragment>
            <InfoBox type="warning">
                This section is under development.
            </InfoBox>
        </Fragment>
    );
};
const CommunityContainer = withCopyEdit(CommunityView);

export default CommunityContainer;
