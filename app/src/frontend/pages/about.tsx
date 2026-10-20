import React from 'react';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json');

const AboutPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">About the Colouring {config.cityName} Project</h1>

            <p>
                Colouring {config.cityName} is a free knowledge exchange platform, designed to collate, generate,
                visualise, open spatial data on every building across Muharraq and potentially other cities. It also
                releases open platform code to enable its design to be easily reproduced.
            </p>
            <p>
                If you live in, research, design, build, manage, or care for Bahrain&apos;s buildings—or have a
                professional or academic interest in the built environment—this platform has been developed to enable
                you to share your expertise and contribute to enhancing the city&apos;s sustainability. We invite
                contributions from academia, government, and industry to support the development of accurate,
                informative, and visually compelling maps that represent the city&apos;s buildings. Colouring{' '}
                {config.cityName} is part of the international Colouring Cities Research Programme. The development is
                led by the Bahrain Authority for Culture and Antiquities, responsible for preserving urban heritage
                and historical areas.
            </p>

            <h2 className="h3">Why do we need Colouring {config.cityName}?</h2>
            <p>
                The building stock forms the core of a city&apos;s physical and cultural fabric and represents one of
                society&apos;s most valuable and enduring resources. In historic cities such as those found across
                Bahrain, buildings and streets are not only functional assets but also carriers of collective memory,
                identity, and heritage value. The quality, condition, and management of these buildings—particularly
                residential structures, which make up the majority of the stock—have a direct impact on quality of
                life, cultural continuity, and urban character. However, geospatial and attribute data on buildings,
                which are essential for understanding, managing, and safeguarding historic urban areas, remain
                fragmented and difficult to access in Bahrain, as in many other countries.
            </p>
            <p>
                Bahrain&apos;s urban landscape reflects multiple layers of development, from traditional architecture
                to post-oil modern expansion. Managing this diverse building stock presents significant challenges,
                particularly in historic cities where pressures for redevelopment, densification, and infrastructure
                upgrades can place heritage assets at risk. Effective decision-making requires detailed knowledge of
                building age, construction type, use, condition, and heritage status, yet such information is rarely
                available in an integrated or openly accessible form.
            </p>
            <p>
                In recent years, Bahrain has shown increasing interest in smart city approaches as a means of improving
                urban management, service delivery, and planning efficiency. Smart city initiatives rely on accurate,
                up-to-date, and spatially linked data, including data on buildings and the public realm. For historic
                cities, this creates an opportunity to combine digital innovation with heritage-sensitive planning,
                supporting evidence-based conservation, targeted retrofit, and informed development control.
            </p>
            <p>
                Tracking change within the building stock—such as refurbishment, adaptation, demolition, and changes of
                use—is particularly important in historic areas, where incremental transformation can cumulatively erode
                cultural significance. Systematic data on these processes would support better monitoring of historic
                urban landscapes, help prioritise conservation efforts, and enable more balanced negotiations between
                preservation and growth.
            </p>
            <p>
                This context has generated a growing demand among researchers, heritage professionals, planners, and
                policymakers for detailed, accessible building data to support analysis, monitoring, and urban modelling.
                While some countries have begun to release large-scale building attribute datasets, access to such
                information in Bahrain remains limited, including for academic and public-interest research.
            </p>
            <p>
                Colouring {config.cityName}, as part of the Colouring Cities Research Programme, has been established in
                response to these challenges. It proposes a new model of open knowledge exchange centred on an open,
                collaborative database designed to document and visualise building attributes relevant to cities,
                including age, form, use, and heritage significance. Supported by open-source platform code, the
                initiative enables replication and adaptation across different national contexts. The overarching aim
                of Colouring {config.cityName} and the Colouring Cities Research Programme is to support more informed,
                transparent, and inclusive management of cities, in alignment with the United Nations&apos; 2016 New
                Urban Agenda and its emphasis on culturally sensitive, resilient, and well-managed urban development.
            </p>

            <h2 className="h3">What are we collecting?</h2>
            <p>
                Our platform collects data on the physical form, quality and performance of Bahrain&apos;s buildings, as
                well as their lifespans and history. This includes temporal data on building age, architectural
                typology, construction materials, and their planning context. Over the coming years, and with the
                support of partners and contributors, our goal is to provide free, spatially enabled statistics on the
                location, use, age, size, street context, designers and builders, planning and heritage status,
                adaptability, repairability, and site history of buildings across Bahrain.
            </p>

            <h2 className="h3">How are we collecting data?</h2>
            <p>
                We are currently evaluating multiple methods of data capture, including the bulk upload of existing
                surveyed datasets, building-level crowdsourcing, automated approaches (such as deriving building
                characteristics from available datasets, including age and height), and the integration of continuously
                updated data sources, particularly in relation to planning information. Data ethics—encompassing
                considerations of privacy, potential misuse, and responsible application—as well as data accuracy,
                constitute key areas of ongoing research.
            </p>
        </section>
    </article>
);

export default AboutPage;
