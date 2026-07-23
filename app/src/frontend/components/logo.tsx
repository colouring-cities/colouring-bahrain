import React from 'react';
import './logo.css';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

interface LogoProps {
    variant: 'default' | 'animated' | 'gray';
}

/**
 * Logo
 *
 * As link to homepage, used in top header
 */
const Logo: React.FunctionComponent<LogoProps> = (props) => {
    const variantClass = props.variant === 'default' ? '' : props.variant;
    return (
        <div className={`logo ${variantClass}`} >
            <LogoGrid />
            <h1 className="logotype">
                <span>Colouring</span>
                <span>{config.cityName}</span>
            </h1>
        </div>
    );
};

const LogoGrid: React.FunctionComponent = () => (
    <div className="grid">
        <div className="row">
            <div className="cell background-mapping"></div>
            <div className="cell background-age-history"></div>
            <div className="cell background-morphology"></div>
            <div className="cell background-construction-design"></div>
        </div>
        <div className="row">
            <div className="cell background-land-use"></div>
            <div className="cell background-conservation"></div>
            <div className="cell background-assessment"></div>
            <div className="cell background-investment-engagement"></div>
        </div>
        <div className="row">
            <div className="cell background-disaster-management"></div>
            <div className="cell background-green-urban-infrastructure"></div>
            <div className="cell background-commerce-activity"></div>
            <div className="cell background-social"></div>
        </div>
    </div>
);

export { Logo };
