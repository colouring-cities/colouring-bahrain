import React from 'react';
import { NavLink } from 'react-router-dom';

import './category-link.css';

interface CategoryLinkProps {
    mode: 'view' | 'edit' | 'multi-edit';
    building_id?: number;
    slug: string;
    title: string;
    help: string;
    inactive: boolean;
}

const CategoryLink: React.FC<CategoryLinkProps> = (props) => {
    let categoryLink = `/${props.mode}/${props.slug}`;
    if (props.building_id != undefined) categoryLink += `/${props.building_id}`;

    let className = "category-title";

    // Make inactive categories clickable so they navigate and show "Coming soon" in legend
    // They still have the inactive class for styling but are now navigable
    return (
        <NavLink
            className={`category-link background-${props.slug} ${props.inactive ? 'inactive' : ''}`}
            to={categoryLink}
            title={props.inactive ? 'Coming soon… Click more info for details.' : 'View/Edit Map'}>
                <h3 className={className}>{props.title}</h3>
        </NavLink>
    );
};

export { CategoryLink };