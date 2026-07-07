import React from 'react';
import './map-button.css';
import { LayerEnablementState } from '../config/map-config';

interface SimpleLayerButtonProps {
    label: string;
    state: LayerEnablementState;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const SimpleLayerButton: React.FC<SimpleLayerButtonProps> = ({ label, state, onClick }) => {
    return (
        <div className={`map-button simple-layer ${state}-state`}>
            <button className="btn btn-outline btn-outline-dark" type="button" onClick={onClick}>
                {label}
            </button>
        </div>
    );
};
