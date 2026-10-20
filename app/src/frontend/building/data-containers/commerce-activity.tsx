import React, { Fragment } from 'react';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';

/**
 * Commerce & Activity side panel — under development.
 */
const CommerceActivityView: React.FunctionComponent<CategoryViewProps> = () => {
    return (
        <Fragment>
            <InfoBox type="warning">
                This section is under development.
            </InfoBox>
        </Fragment>
    );
};
const CommerceActivityContainer = withCopyEdit(CommerceActivityView);

export default CommerceActivityContainer;
