import React from 'react';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

const DataAccuracyPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">Data Accuracy Agreement</h1>
            <p>
                Colouring {config.cityName} data are provided &quot;as is&quot;, without warranty of any kind,
                express or implied, including but not limited to the warranties of merchantability, accuracy,
                fitness for a particular purpose and non-infringement. In no event shall the Bahrain Authority for
                Culture and Antiquities be liable for any reliance that you place on or how you use the data nor
                any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising
                from, out of or in connection with the data or the use or other dealings in the data.
            </p>
            <p>
                Colouring {config.cityName} data are derived from surveys and multiple other sources and may contain
                inconsistencies. Efforts are made to include as many attributes as possible to help users contribute
                to the reliability and suitability of the data for specific uses, whether for educational research,
                or other purposes. Contributors are encouraged to provide sources and help to verify data wherever
                possible.
            </p>
            <p>
                As information on sources is essential, Bahrain Authority for Culture and Antiquities maintain an
                ongoing process to verify the data and update it where possible.
            </p>
        </section>
    </article>
);

export default DataAccuracyPage;
