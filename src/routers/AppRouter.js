import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'


import { startChecking } from '../actions/auth';
import { Spinner } from '../Components/Spinner';


import { InventoryRouter } from './InventoryRouter';
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {


    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [ dispatch ])

    if ( checking ) {
        return <Spinner />;
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated= { !!uid }
                    />

                    <PrivateRoute
                        path="/"
                        component={ InventoryRouter }
                        isAuthenticated= { !!uid }
                    />


                    <Redirect to="/auth" />

                </Switch>
            </div>
        </Router>
    )
}
