import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'



import { Navbar } from '../Components/Inventory/Navbar'
import { InventoryScreen } from '../Components/Inventory/InventoryScreen';
import { AddItem } from '../Components/Inventory/AddItem';


export const InventoryRouter = () => {

    return (
        <Router>

            <Navbar />

            <div>
                <Switch>

                    <Route exact path="/" component= { InventoryScreen } />
                    <Route exact path="/add" component= { AddItem } />

                    <Redirect to="/" />

                </Switch>
            </div>
        </Router>
    )
}
