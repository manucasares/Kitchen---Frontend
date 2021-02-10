import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { LoginScreen } from '../Components/auth/LoginScreen'
import { RegisterScreen } from '../Components/auth/RegisterScreen'

export const AuthRouter = () => {

    return (
        <Router>
            <div className="auth-background">
                <div className="auth-window">
                    <Switch>

                        <Route exact path="/auth/login" component= { LoginScreen } />

                        <Route exact path="/auth/register" component= { RegisterScreen } />

                        <Redirect to="/auth/login" />

                    </Switch>
                </div>
            </div>
        </Router>
    )
}
