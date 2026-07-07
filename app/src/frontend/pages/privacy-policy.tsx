import React from 'react';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

const PrivacyPolicyPage = () => (
    <article>
        <section className="main-col">
            <h1 className="h2">Colouring {config.cityName} Privacy Policy</h1>

            <h2 className="h3">1. Introduction</h2>
            <p>
                This privacy policy explains how Colouring {config.cityName} uses the personal data we collect
                from you when you use our website. Colouring {config.cityName} is an open-source research project
                and part of the Colouring Cities Research Programme (CCRP). The project is developed by the
                Bahrain Authority for Culture and Antiquities, which acts as the data controller for the purposes
                of applicable data protection legislation. We are committed to protecting your privacy in accordance
                with the Bahrain Personal Data Protection Law (PDPL).
            </p>

            <h2 className="h3">2. What Data Do We Collect?</h2>
            <p>
                We actively discourage the provision of personal data. To use the site for viewing, no data is required.
                For contributors, we collect:
            </p>
            <ul>
                <li><strong>Username:</strong> We recommend you do not use your actual name.</li>
                <li><strong>Password:</strong> Stored as a secure cryptographic hash.</li>
                <li><strong>Email Address (Optional):</strong> Used only for password resets or in exceptional circumstances regarding account misuse.</li>
                <li><strong>Usage Data:</strong> We use third-party digital tools for traffic analysis and performance measurement to improve the user experience.</li>
            </ul>

            <h2 className="h3">3. Purpose and Legal Basis for Processing</h2>
            <p>We process your data for the following purposes:</p>
            <ul>
                <li>To enable secure login and contributions to the project.</li>
                <li>To provide a personalized user experience.</li>
                <li>To maintain a public record of contributions.</li>
            </ul>
            <p>
                <strong>Legal Basis:</strong> We process data based on your explicit consent provided upon registration
                and for our legitimate interests as a research project, provided these do not conflict with your
                fundamental rights.
            </p>
            <p>
                <strong>Engagement Data:</strong> Certain personal data may be required to monitor user engagement
                for purposes related to historical or scientific research. This data is not stored within, nor
                automatically processed by, the Colouring {config.cityName} platform. It is accessed and used solely
                by project administrators when necessary, for the purposes of information protection, verification,
                and maintaining the integrity of contributions.
            </p>

            <h2 className="h3">4. Data Storage and Security</h2>
            <p>
                Your data is stored in secure databases using industry-standard practices. We implement technical
                and organizational measures to protect against unauthorized access or disclosure. Data is transmitted
                over secure HTTPS connections.
            </p>

            <h2 className="h3">5. International Data Transfers</h2>
            <p>
                As part of an international research network, your data may be transferred to and stored on servers
                located outside the Kingdom of Bahrain. By providing your data and consenting to this policy, you
                acknowledge and agree to this transfer.
            </p>

            <h2 className="h3">6. Performance and Traffic Analysis</h2>
            <p>
                We utilize third-party analytics services to understand how users interact with our platform.
                These tools collect information sent by your browser, such as pages visited and time spent on the
                site, to help us measure and improve project performance. This data is processed in an aggregate
                form that does not identify individual users.
            </p>

            <h2 className="h3">7. Your Data Protection Rights</h2>
            <p>Under the Bahrain PDPL, you have the following rights:</p>
            <ul>
                <li><strong>Right to Access:</strong> You may request notification of whether your data is being processed and receive a copy of that data.</li>
                <li><strong>Right to Rectification:</strong> You may request the correction of inaccurate or incomplete data.</li>
                <li><strong>Right to Erasure:</strong> You may request the deletion of your data if it is no longer necessary for the project or if processing is illegal.</li>
                <li><strong>Right to Object:</strong> You may object to processing that causes material or moral damage or for direct marketing purposes.</li>
            </ul>

            <h2 className="h3">8. Public Contributions</h2>
            <p>
                Please note that when you contribute to Colouring {config.cityName}, you create a permanent, public
                record of all data added or changed. The database records your username and the timestamp of the
                edit, which is made publicly available.
            </p>

            <h2 className="h3">9. Contact Information</h2>
            <p>
                If you have questions regarding this policy or wish to exercise your rights, please contact our
                Data Protection representative ( email address or BACA address ). If we cannot address your concerns,
                you have the right to lodge a complaint with the Bahrain Personal Data Protection Authority.
            </p>

            <p><em>Last Updated: March 26, 2026.</em></p>
        </section>
    </article>
);

export default PrivacyPolicyPage;
