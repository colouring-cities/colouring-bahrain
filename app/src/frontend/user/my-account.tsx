import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth-context';
import ConfirmationModal from '../components/confirmation-modal';
import ErrorBox from '../components/error-box';
import { SpinnerIcon } from '../components/icons';

export const MyAccountPage: React.FC = () => {
    const { isLoading, user, userError, logout, generateApiKey, deleteAccount } = useAuth();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [error, setError] = useState(undefined);

    const handleLogout = useCallback((e) => {
        e.preventDefault();
        logout(setError);
    }, [logout]);

    const handleGenerateKey = useCallback(async (e) => {
        e.preventDefault();
        
        setError(undefined);
        generateApiKey(setError);
    }, [generateApiKey]);

    const handleDeleteAccount = useCallback(() => {
        setError(undefined);
        deleteAccount(setError);
    }, [deleteAccount])

    if(!user && isLoading) {
        return (
            <article>
                <section className="main-col">
                    <SpinnerIcon spin={true} /> Loading user info... 
                </section>
            </article>
        );
    }

    return (
        <article>
            <section className="main-col">
                { !isLoading && <ErrorBox msg={userError} /> }
                {!userError && (<>
                    <h1 className="h1">Welcome, {user.username}!</h1>
                    <ErrorBox msg={error} />
                    <form onSubmit={handleLogout}>
                        <div className="buttons-container">
                            <Link to="/edit/age-history" className="btn btn-warning"><h1>Start colouring</h1></Link>
                            <input className="btn btn-secondary" type="submit" value="Log out"/>
                        </div>
                    </form>

                    <hr/>
                    <h2 className="h2">My Details</h2>
                    <h3 className="h3">Username</h3>
                    <p>{user.username}</p>
                    <h3 className="h3">Email Address</h3>
                    <p>{user.email || '-'}</p>
                    <h3 className="h3">Registered</h3>
                    <p>{user.registered.toString()}</p>

                    <hr/>

                    <h2 className="h2">Technical details</h2>
                    <p>Are you a software developer? If so, you might be interested in these.</p>
                    <h3 className="h3">API key</h3>
                    <p>{user.api_key || '-'}</p>
                    <form onSubmit={handleGenerateKey} className="form-group mb-3">
                        <input className="btn btn-secondary" type="submit" value="Generate API key"/>
                    </form>

                    <hr />

                    <h2 className="h2">Account actions</h2>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            setShowDeleteConfirm(true);
                        }}
                        className="form-group mb-3"
                    >
                        <input className="btn btn-danger" type="submit" value="Delete account" />
                    </form>

                    <ConfirmationModal
                        show={showDeleteConfirm}
                        title="Confirm account deletion"
                        description="Are you sure you want to delete your account? This cannot be undone."
                        confirmButtonText="Delete account"
                        confirmButtonClass="btn-danger"
                        onConfirm={() => handleDeleteAccount()}
                        onCancel={() => setShowDeleteConfirm(false)}
                    />
                </>)}
            </section>
        </article>
    );
};
