import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import { useAuth } from '../auth-context';
import ErrorBox from '../components/error-box';
import { SpinnerIcon } from '../components/icons';
import InfoBox from '../components/info-box';
import SupporterLogos from '../components/supporter-logos';
import { registerSecretUnlockClick } from './signup-access';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

export const Login: React.FC = () => {
    const {isLoading, login } = useAuth();
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(undefined);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setError(undefined);

        login({ username, password }, setError);
    }, [username, password]);

    const onSecretHeadingClick = useCallback(() => {
        if (registerSecretUnlockClick()) {
            history.push('/sign-up.html');
        }
    }, [history]);

    const msgText = `Welcome to Colouring ${config.cityName}. You're one of the first people to use the site!`;

    return (
        <article>
            <section className="main-col">
                <h1
                    className="h2"
                    onClick={onSecretHeadingClick}
                    style={{ cursor: 'default', userSelect: 'none' }}
                >
                    Log in
                </h1>
                <InfoBox msg={msgText} />
                <ErrorBox msg={error} />
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Username*</label>
                    <input name="username" id="username"
                        className="form-control" type="text"
                        value={username} onChange={e => setUsername(e.target.value)}
                        placeholder="please note the user name you choose will be public" required
                    />

                    <label htmlFor="password">Password</label>
                    <input name="password" id="password"
                        className="form-control"
                        type={showPassword ? 'text' : 'password'}
                        value={password} onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <div className="form-check">
                        <input id="show_password" name="show_password"
                            className="form-check-input" type="checkbox"
                            checked={showPassword}
                            onChange={e => setShowPassword(e.target.checked)}
                        />
                        <label htmlFor="show_password" className="form-check-label">Show password?</label>
                    </div>

                    <Link to="/forgotten-password.html">Forgotten password?</Link>

                    <div className="buttons-container with-space">
                        <input type="submit" disabled={isLoading} value="Log In" className="btn btn-primary" />
                        {isLoading && <span><SpinnerIcon />Logging in...</span>}
                    </div>
                </form>
            </section>
            <hr />
            <section className="main-col">
                <SupporterLogos />
            </section>
        </article>
    )

};
