import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { startLogout } from '../../actions/auth';
import logo from '../../images/logo.png';
import { clearActiveEvent } from '../../actions/invent';

export const Navbar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const handleClearActive = () => {
        dispatch( clearActiveEvent() );
    }


    return (
        <div className="navbar">

            <div className="navbar-content container">
                <div className="logo-title">
                    <img src={ logo } alt="logo" />
                    <h2> Kitchen Inventory </h2>
                </div>
    
                <div className="btn-container">
    
                    <Link to="/">
                        <button onClick={ handleClearActive } > View Inventory </button>
                    </Link>
    
                    <Link to="/add">
                        <button> Add Item </button>
                    </Link>
    
                    <button
                        className="logout"
                        onClick={ handleLogout }
                    >
                        Log out
                    </button>
    
                </div>
            </div>


        </div>
    )
}
