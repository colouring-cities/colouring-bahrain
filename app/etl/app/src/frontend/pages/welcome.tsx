import React from 'react';
import { Link } from 'react-router-dom';

import './welcome.css';

const Welcome = () => (
    <div className="section-body welcome">
        <h1 className="h2">Welcome to Colouring Bahrain!</h1>
        <p>
            Colouring Bahrain is a free knowledge exchange platform designed to provide open data on Historic Cities buildings, to help make them more sustainable.
        </p>
        <p>
            Colouring Bahrain is part of the Colouring Cities Research programme based at the Alan Turing Institute. The programme collaborates with local, regional, national and international partners to develop open platform code also of relevance to other cities.
        </p>
        <p>
            New datasets and features are added regularly, and we greatly appreciate any information you contribute. All submissions are carefully reviewed by the Colouring Bahrain team before being shared on the platform. 
        </p>
        <p>
            All our <Link to="/data-extracts.html">data</Link> and <a href="https://github.com/colouring-bahrain/colouring-bahrain">code</a> are 
            free to download, use and share under our open licence terms.
        </p>
    </div>
);

export default Welcome;
