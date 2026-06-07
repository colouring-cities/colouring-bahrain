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
            title="Mapping"
            slug="location"
            help="https://pages.colouring.bh/location"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Land Use"
            slug="use"
            help="https://pages.colouring.bh/use"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Commerce & Activity"
            slug="type"
            help="https://pages.colouring.bh/buildingtypology"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Age & History"
            slug="age"
            help="https://pages.colouring.bh/age"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Morphology"
            slug="size"
            help="https://pages.colouring.bh/shapeandsize"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Construction & Design"
            slug="construction"
            help="https://pages.colouring.bh/construction"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Green / Urban Infrastructure"
            slug="streetscape"
            help="https://pages.colouring.bh/greenery"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Investment & Engagement"
            slug="team"
            help="https://pages.colouring.bh/team"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Assessment"
            slug="sustainability"
            help="https://pages.colouring.bh/sustainability"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Conservation"
            slug="planning"
            help="https://pages.colouring.bh/planning"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Disaster Management"
            slug="dynamics"
            help="https://pages.colouring.bh/dynamics"
            inactive={true}
            mode={props.mode}
            building_id={props.building_id}
        />
        <CategoryLink
            title="Social"
            slug="community"
            help="https://pages.colouring.bh/community"
            inactive={false}
            mode={props.mode}
            building_id={props.building_id}
        />
    </ListWrapper>
);

export default Categories;
