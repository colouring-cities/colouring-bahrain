import React from 'react';

import { CategoryLink } from './category-link';
import { ListWrapper } from '../components/list-wrapper';

import './categories.css';

interface CategoriesProps {
    mode: 'view' | 'edit' | 'multi-edit';
    building_id?: number;
}

const Categories: React.FC<CategoriesProps> = (props) => (
    <ListWrapper className='data-category-list'>
        <CategoryLink
            title="Location"
            slug="location"
            help="https://pages.colouring.bh/location"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Current Use"
            slug="use"
            help="https://pages.colouring.bh/use"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Type"
            slug="type"
            help="https://pages.colouring.bh/buildingtypology"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Age"
            slug="age"
            help="https://pages.colouring.bh/age"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Size &amp; Shape"
            slug="size"
            help="https://pages.colouring.bh/shapeandsize"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Construction"
            slug="construction"
            help="https://pages.colouring.bh/construction"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Streetscape"
            slug="streetscape"
            help="https://pages.colouring.bh/greenery"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Team"
            slug="team"
            help="https://pages.colouring.bh/team"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Planning"
            slug="planning"
            help="https://pages.colouring.bh/planning"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Sustainability"
            slug="sustainability"
            help="https://pages.colouring.bh/sustainability"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Dynamics"
            slug="dynamics"
            help="https://pages.colouring.bh/dynamics"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Community"
            slug="community"
            help="https://pages.colouring.bh/community"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
    </ListWrapper>
);

export default Categories;
