import React from 'react';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json');

const DataCategoriesPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">Data Categories</h1>

            <h2 className="h3" id="mapping">Mapping</h2>
            <p>
                The platform first defines core spatial data—coordinates, addresses, and building footprints—for
                each building. This information acts as a reliable reference that supports data collection, mapping,
                and spatial analysis. Within Colouring {config.cityName}, buildings become darker in colour as more
                location categories are added, making it easy to identify areas where further data collection is needed.
            </p>

            <h2 className="h3" id="land-use">Land Use</h2>
            <p>
                This category captures data on the current type of activities occurring within each land, with
                residential use typically representing the dominant land use. The collected land use data provide
                detailed information on properties and building usage, enabling counts of building types and analyses
                of space allocation. These data support key research questions on the distribution of land uses across
                cities, the impacts of mixed-use configurations on urban efficiency, resilience, and sustainability,
                and the consequences of their loss, while also enabling comparative analyses and the development of
                more accurate land-use forecasting models.
            </p>

            <h2 className="h3" id="age-history">Age &amp; History</h2>
            <p>
                Building age records construction periods supporting assessments of heritage protection, adaptation
                potential, and building lifespan. This information is critical for analysing urban metabolism,
                demolition resilience, and building survival rates, and it also plays an important role in energy
                and urban sustainability research, particularly in emissions analysis and urban heat assessments.
            </p>
            <p>
                In the future, more precise dating that captures the exact year of construction will be incorporated,
                allowing for more accurate inference of building materials, construction methods, and original layouts.
            </p>

            <h2 className="h3" id="construction-design">Construction &amp; Design</h2>
            <p>
                Construction data focuses on the materiality of each building, including the types of materials used
                and façade characteristics. This information has important applications in areas such as fire safety,
                energy efficiency, and understanding developments in construction technology over time. It is
                particularly valuable for built environment professionals involved in the repair, management,
                conservation, retrofit, design, and construction of buildings.
            </p>
            <p>
                Understanding what kind of material is stocked where in the city is relevant to many other types of
                research, from calculating potential energy and construction waste flows, to targeting funds for
                retrofitting programmes, to geolocating vulnerable construction systems. Data on construction methods
                will be incorporated in the future to further support analysis of structural performance, durability,
                and adaptation potential.
            </p>
            <p>
                Design data captures information on architectural styles and elements, helping to identify areas with
                historic or aesthetic character, or concentrations of architecturally significant buildings. It also
                records information on designers and building awards, recognising quality and celebrating industry
                skills and expertise. More broadly, this section aims to support improvements in new-build quality by
                enabling analysis of building longevity, energy performance, and usability, helping to inform better
                building design in the future.
            </p>

            <h2 className="h3" id="morphology">Morphology</h2>
            <p>
                Building morphology describes buildings in terms of their typology, use, shape, and physical dimensions,
                including height and overall size. Geolocated morphological data enables analysis of relationships between
                adjacent buildings and supports the inference of construction methods, materials, and structural
                characteristics. The morphology layer includes key size attributes—such as building height, number of
                storeys, and plot ratio—which are essential for sustainability research, including the analysis and
                prediction of energy use, greenhouse gas emissions, and urban heat accumulation.
            </p>
            <p>
                Understanding the spatial distribution of different building typologies and sizes is particularly important
                for developing targeted retrofit strategies to improve energy efficiency. It also provides insight into
                how buildings are arranged and packed within the urban fabric. Analysing the survival rates of different
                typologies and identifying adaptable forms can help reduce unnecessary construction waste, support
                long-term urban resilience, and inform the design of more durable buildings.
            </p>
            <p>
                More broadly, building size and geometry data underpin a wide range of urban research applications,
                including 3D city modelling, analysis of height changes, housing capacity assessments, identification
                of areas suitable for densification, and the study of long-term transformations in urban form.
            </p>

            <h2 className="h3" id="conservation">Conservation</h2>
            <p>
                Conservation data records information related to heritage designations and protection status at multiple
                levels, from World Heritage to regional and national listings. It also maps heritage zones classifications
                within historic cities, helping to identify areas of cultural and historic significance.
            </p>
            <p>
                This layer captures information on the types of heritage values associated with buildings and urban areas
                within Bahrain&apos;s historic cities. Geolocated conservation data supports heritage management,
                conservation planning, and policy development by identifying protected assets and areas requiring
                sensitive intervention. It also enables analysis of the spatial distribution of heritage assets, helping
                to inform strategies for safeguarding historic environments while accommodating sustainable urban
                development.
            </p>

            <h2 className="h3" id="assessment">Assessment</h2>
            <p>
                Assessment data will record information related to heritage evaluation criteria and the building
                inspections requests. This will include data on buildings that have been assessed for their cultural,
                architectural, or historical significance.
            </p>
            <p>
                When developed, this layer will support heritage management and conservation decision-making by providing
                structured information on the condition, significance, and assessment status of buildings. Geolocated
                assessment data will also help identify priority areas for conservation, maintenance, or further study
                within Bahrain&apos;s historic urban environments.
            </p>

            <h2 className="h3" id="investment-engagement">Investment &amp; Engagement</h2>
            <p>
                The layer records engagement with buildings in two main ways: through property investment and through
                the sharing of information and materials. Investment data captures properties that have received funding,
                highlighting their economic contribution and impact on heritage sustainability, as well as identifying
                buildings open to potential investors.
            </p>
            <p>
                This data enables analysis of the spatial distribution and types of investment, the effects on heritage
                preservation, and interactions between owners and investors. It also supports studies of changes over
                time in invested properties and their surroundings which helps explore how heritage can serve as a driver
                for sustainable urban development.
            </p>
            <p>
                Engagement also includes contributions from property owners and the public, such as documents, images,
                and narratives related to intangible heritage. These contributions help enrich and expand the dataset,
                providing deeper insight into the value, history, and character of buildings and heritage assets.
            </p>

            <h2 className="h3" id="green-urban-infrastructure">Green/Urban Infrastructure Context</h2>
            <p>
                This layer captures data on greenery and urban infrastructure surrounding buildings. Greenery data includes
                tree counts, courtyards in traditional houses, front and back yards, and other vegetation. These
                indicators serve as proxies for greening intensity and support analysis of environmental capacity,
                adaptation potential, and the role of vegetation in moderating urban climate, improving thermal comfort,
                and reducing heat build-up and urban heat islands.
            </p>
            <p>
                Street and accessibility data records information such as street and pavement widths, distances to parks
                and public squares, car parking locations, and pedestrian and bicycle lanes. This information supports
                analysis of accessibility, connectivity, and the relationship between urban infrastructure and
                sustainable mobility.
            </p>
            <p>
                Together, these datasets provide a comprehensive understanding of both the green and built environment
                context, supporting research on environmental quality, urban resilience, and the integration of greenery
                and infrastructure in sustainable urban planning.
            </p>

            <h2 className="h3" id="commerce-activity">Commerce &amp; Activity</h2>
            <p>
                This layer captures data on commercial activities within the urban environment, including the distribution
                of historic markets (souqs) and their relationship to contemporary commercial practices. It also records
                the intangible heritage value of these markets and their continuity over time.
            </p>
            <p>
                Key attributes include the type of activity (e.g., food, textiles, metalwork, spices, services), the
                origin of products (local or imported), and primary and secondary goods categories.
            </p>
            <p>
                Geolocated commerce data supports analysis of spatial patterns, interactions between traditional and
                modern markets, and the role of commercial activity in preserving cultural heritage and sustaining
                orange economy.
            </p>

            <h2 className="h3" id="disaster-management">Disaster Management</h2>
            <p>
                This layer captures data on the condition and maintenance of buildings, including heritage properties,
                and identifies structures at risk. It also encourages the inclusion of new data types aimed at maximizing
                building longevity and minimizing emissions.
            </p>
            <p>
                The indicators record the severity of damage, exposure to risks, and urgency of required interventions.
                Geolocated disaster management data supports emergency planning, assessment of structural stability, and
                the forecasting of sustainable and resilient performance in the built environment.
            </p>

            <h2 className="h3" id="social">Social</h2>
            <p>
                This layer captures data on population density, distribution, and migration patterns, providing insight
                into social dynamics across the city.
            </p>
            <p>
                Geolocated social data supports analysis of demographic trends, population pressures, and the relationship
                between urban development and community patterns. It can inform planning, policy-making, and research on
                equitable access to services, social cohesion, and sustainable urban growth.
            </p>
        </section>
    </article>
);

export default DataCategoriesPage;
