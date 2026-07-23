import React from 'react';
import './map-button.css';
import { LayerEnablementState } from '../config/map-config';

interface SimpleLayerButtonProps {
    label: string;
    state?: LayerEnablementState;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /** When true, button stays in the normal disabled (purple) style; click is handled by onClick */
    comingSoon?: boolean;
}

export const SimpleLayerButton: React.FC<SimpleLayerButtonProps> = ({
    label,
    state = 'disabled',
    onClick,
    comingSoon = false,
}) => {
    // Coming-soon layers use the same purple disabled look as other off layers
    const visualState = comingSoon ? 'disabled' : state;

    return (
        <div className={`map-button simple-layer ${visualState}-state`}>
            <button className="btn btn-outline btn-outline-dark" type="button" onClick={onClick}>
                {label}
            </button>
        </div>
    );
};
