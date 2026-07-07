// map-app.tsx
import { parse as parseQuery } from 'query-string';
import React, { Fragment } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { parseJsonOrDefault } from '../helpers';
import { strictParseInt } from '../parse';
import { apiGet, apiPost } from './apiHelpers';
import BuildingView from './building/building-view';
import Categories from './building/categories';
import { EditHistory } from './building/edit-history/edit-history';
import MultiEdit from './building/multi-edit';
import Sidebar from './building/sidebar';
import ColouringMap from './map/map';
import { Building } from './models/building';
import Welcome from './pages/welcome';
import { PrivateRoute } from './route';

interface MapAppRouteParams {
    mode?: 'view' | 'edit' | 'multi-edit';
    cat?: string;
    building?: string;
}

interface MapAppProps extends RouteComponentProps<MapAppRouteParams> {
    building?: Building;
    building_like?: boolean;
    user?: any;
    revisionId?: number;
    user_verified?: object;
}

interface MapAppState {
    category: string;
    revision_id: number;
    building?: Building;
    building_like?: boolean;
    user_verified: object;
}

class MapApp extends React.Component<MapAppProps, MapAppState> {

    constructor(props: Readonly<MapAppProps>) {
        super(props);

        this.state = {
            category: this.getCategory(props.match.params.cat),
            revision_id: props.revisionId || 0,
            building: props.building,
            building_like: props.building_like,
            user_verified: props.user_verified || {}
        };
    }

    componentDidMount() {
        console.log('MapApp mounted', this.props.match.params);
        this.fetchLatestRevision();

        const buildingId = this.props.match.params.building;
        if (buildingId && !this.props.building) {
            this.fetchBuildingData(strictParseInt(buildingId));
        }
    }

    componentDidUpdate(prevProps: MapAppProps) {
        const prevCat = prevProps.match.params.cat;
        const nextCat = this.props.match.params.cat;

        if (prevCat !== nextCat) {
            const newCategory = this.getCategory(nextCat);
            if (newCategory !== undefined) {
                this.setState({ category: newCategory });
            }
        }
    }

    async fetchLatestRevision() {
        try {
            const { latestRevisionId } = await apiGet(`/api/buildings/revision`);
            this.increaseRevision(latestRevisionId);
        } catch (err) {
            console.error('fetchLatestRevision failed', err);
        }
    }

    async fetchBuildingData(buildingId: number) {
        try {
            const [
                building,
                building_uprns,
                building_like,
                user_verified
            ] = await Promise.all([
                apiGet(`/api/buildings/${buildingId}.json`),
                apiGet(`/api/buildings/${buildingId}/uprns.json`),
                apiGet(`/api/buildings/${buildingId}/like.json`),
                apiGet(`/api/buildings/${buildingId}/verify.json`)
            ]);

            building.uprns = building_uprns.uprns;

            this.setState({
                building,
                building_like: building_like.like,
                user_verified
            });

            this.increaseRevision(building.revision_id);
        } catch (err) {
            console.error('fetchBuildingData failed', err);
        }
    }

    getCategory(cat?: string) {
        if (!cat || cat === 'categories') return 'age';
        return cat;
    }

    getMultiEditDataString(): string {
        const q = parseQuery(this.props.location.search);
        if (Array.isArray(q.data)) throw new Error('Invalid data format');
        return q.data as string;
    }

    increaseRevision(revisionId: number) {
        if (+revisionId > this.state.revision_id) {
            this.setState({ revision_id: +revisionId });
        }
    }

    selectBuilding = (building?: Building) => {
        const mode = this.props.match.params.mode || 'view';
        const cat = this.props.match.params.cat || 'age';

        if (!building) {
            this.setState({ building: undefined });
            this.props.history.push(`/${mode}/${cat}`);
            return;
        }

        this.fetchBuildingData(building.building_id);
        this.props.history.push(`/${mode}/${cat}/${building.building_id}`);
    };

    colourBuilding = (building: Building) => {
        const cat = this.props.match.params.cat;

        if (cat === 'like') {
            this.likeBuilding(building.building_id);
            return;
        }

        const data = parseJsonOrDefault(this.getMultiEditDataString());
        if (data && !Object.values(data).some(v => v == null)) {
            this.updateBuilding(building.building_id, data);
        }
    };

    likeBuilding(buildingId: number) {
        apiPost(`/api/buildings/${buildingId}/like.json`, { like: true })
            .then(res => !res.error && this.increaseRevision(res.revision_id))
            .catch(err => console.error(err));
    }

    updateBuilding(buildingId: number, data: any) {
        apiPost(`/api/buildings/${buildingId}.json`, data)
            .then(res => !res.error && this.increaseRevision(res.revision_id))
            .catch(err => console.error(err));
    }

    render() {
        const { mode = 'view' } = this.props.match.params;
        const category = this.state.category;
        const building_id = this.state.building?.building_id;
        const viewEditMode = mode === 'multi-edit' ? undefined : mode;

        return (
            <Fragment>

                <PrivateRoute
                    path="/:mode(edit|multi-edit)"
                    render={() => null}
                />

                <Switch>

                    <Route exact path="/">
                        <Sidebar>
                            <Welcome />
                        </Sidebar>
                    </Route>

                    <Route exact path="/:mode/categories/:building?">
                        <Sidebar>
                            <Categories
                                mode={mode}
                                building_id={building_id}
                            />
                        </Sidebar>
                    </Route>

                    <Route
                        exact
                        path="/multi-edit/:cat"
                        render={() => (
                            <MultiEdit
                                category={category}
                                dataString={this.getMultiEditDataString()}
                                user={this.props.user}
                            />
                        )}
                    />

                    <Route exact path="/:mode/:cat/:building?">
                        <Sidebar>
                            <Categories
                                mode={mode}
                                building_id={building_id}
                            />
                            <BuildingView
                                mode={viewEditMode}
                                cat={category}
                                building={this.state.building}
                                building_like={this.state.building_like}
                                user_verified={this.state.user_verified}
                                selectBuilding={this.selectBuilding}
                                user={this.props.user}
                            />
                        </Sidebar>
                    </Route>

                    <Route exact path="/:mode/:cat/:building/history">
                        <Sidebar>
                            <Categories
                                mode={mode}
                                building_id={building_id}
                            />
                            <EditHistory building={this.state.building} />
                        </Sidebar>
                    </Route>

                    <Route
                        exact
                        path="/:mode(view|edit|multi-edit)"
                        render={props => (
                            <Redirect
                                to={`/${props.match.params.mode}/categories`}
                            />
                        )}
                    />

                </Switch>

                <ColouringMap
                    building={this.state.building}
                    mode={mode}
                    category={category}
                    revision_id={this.state.revision_id}
                    selectBuilding={this.selectBuilding}
                    colourBuilding={this.colourBuilding}
                />

            </Fragment>
        );
    }
}

export default MapApp;
