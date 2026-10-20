import React, { Fragment } from 'react';
import withCopyEdit from '../data-container';
import { CategoryViewProps } from './category-view-props';
import InfoBox from '../../components/info-box';

/**
 * Green / Water Infrastructure building side panel — under development per client.
 */
const WaterGreenInfrastructureView: React.FunctionComponent<CategoryViewProps> = () => {
    return (
        <Fragment>
            <InfoBox type="warning">
                This section is under development.
            </InfoBox>
        </Fragment>
    );
};
const WaterGreenInfrastructureContainer = withCopyEdit(WaterGreenInfrastructureView);

export default WaterGreenInfrastructureContainer;
