import React from 'react';
import { Link } from 'react-router-dom';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

import Categories from '../building/categories';
import './welcome.css';

const Welcome = () => (
    <div className="section-body welcome">
        <Categories mode="view"/>
        <h1 className="h3">Welcome to Colouring {config.cityName}!</h1>
        <p>
            Colouring {config.cityName} is a free knowledge exchange platform designed to provide open data
            on Historic Cities buildings, to help make them more sustainable.
        </p>
        <p>
            Colouring {config.cityName} is part of the Colouring Cities Research programme based at the
            Alan Turing Institute. The programme <strong>collaborates</strong> with local, regional,
            national and international partners to develop open platform code also of relevance to other cities.
        </p>
        <p>
            New datasets and features are added regularly, and we greatly appreciate any information you
            contribute. All submissions are carefully reviewed by the Colouring {config.cityName} team
            before being shared on the platform.
        </p>
        <p>
            All our data and code are free to download, use and share under our open licence terms.
        </p>
        <Link to="/view/categories"
            className="btn btn-outline-dark btn-lg btn-block">
            Start Colouring Here!
        </Link>
        <div className="image-row">
            <img className="cl-logo" src="/images/logo-cc.jpg?v=2" alt="Colouring Cities Research Programme"></img>
            <img className="turing-logo" src="/images/logo-turing.jpg?v=2" alt="Alan Turing Institute"></img>
        </div>
        <div className="image-row">
            <img className="baca-logo" src="/images/logo-baca.png?v=1" alt="Bahrain Authority for Culture & Antiquities"></img>
            <img className="uob-logo" src="/images/logo-uob.png?v=1" alt="University of Bahrain"></img>
        </div>
    </div>
);

export default Welcome;
