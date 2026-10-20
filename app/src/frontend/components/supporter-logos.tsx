import React, { Fragment } from 'react';

import './supporter-logos.css';

const SupporterLogos = () => (
    <Fragment>
        <h2 className="h3 partner-logos-heading">Lead organisations and project partners</h2>
        <div className="partner-logos" aria-label="Lead organisations and project partners">
            <img
                className="partner-logo partner-logo-cc"
                src="/images/logo-cc.jpg?v=2"
                alt="Colouring Cities Research Programme"
            />
            <img
                className="partner-logo partner-logo-turing"
                src="/images/logo-turing.jpg?v=2"
                alt="Alan Turing Institute"
            />
            <img
                className="partner-logo partner-logo-baca"
                src="/images/logo-baca.png?v=1"
                alt="Bahrain Authority for Culture & Antiquities"
            />
            <img
                className="partner-logo partner-logo-uob"
                src="/images/logo-uob.png?v=1"
                alt="University of Bahrain"
            />
        </div>
    </Fragment>
);

export default SupporterLogos;
