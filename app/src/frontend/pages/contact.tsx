import React from 'react';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json');

const GITHUB_URL = 'https://github.com/colouring-cities/colouring-bahrain/';

const ContactPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">Contact</h1>

            <p>
                Colouring {config.cityName} has been designed as a sustainable, low-cost open data/knowledge
                exchange platform that can be replicated by other cities using its open source code.
            </p>

            <p>
                It is developed by a small, dedicated team at Bahrain Authority for Culture and Antiquities.
                We are unable to answer individual queries, but we welcome constructive comments on how to improve
                the site, and on other types of data and new features you might like to see.
            </p>

            <p>
                You can send us comments or ask questions on:{' '}
                <a href="mailto:admin@colouring.bh">admin@colouring.bh</a>
            </p>

            <p>
                To view our technical site and platform code please visit Github at:{' '}
                <a href={GITHUB_URL}>{GITHUB_URL}</a>
            </p>

            <p>
                For press enquiries please contact Bahrain Authority for Culture and Antiquities at:{' '}
                <a href="mailto:colouringbahrain@culture.gov.bh">colouringbahrain@culture.gov.bh</a>.
            </p>
        </section>
    </article>
);

export default ContactPage;
