import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { startLogout } from '../../actions/auth';
import logo from '../../images/logo.png';
import { clearActiveEvent } from '../../actions/invent';
import { closeNavbar, toggleNavbar } from '../../actions/ui';
import { useWindowSize } from '../../hooks/useWindowSize';


export const Navbar = () => {

    const dispatch = useDispatch();
    const { navbar_opened } = useSelector( state => state.ui );
    const window_size = useWindowSize();


    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const handleClearActive = () => {
        dispatch( clearActiveEvent() );
    }

        // Navbar responsive
    const handleToggleNavbar = () => {
        dispatch( toggleNavbar() );
    }

    const handleCloseNavbar = () => {
        dispatch( closeNavbar() );
    }
    
    
    useEffect(() => {
            // Esto lo hago para que siempre esté el transform translate en 0 si el width es mayor a 700px    
        if ( window_size[0] > 700 ) {
            dispatch( closeNavbar() )
        }

    }, [ window_size, dispatch ] )



    return (
        <div className="navbar">

            <div className="navbar-content container">
                <div className="logo-title">
                    <img src={ logo } alt="logo" />
                    <h2> Kitchen Inventory </h2>
                </div>
    
                <div
                    className="btn-container"


                    style={ ( !navbar_opened )
                                ? { transform: 'translateX( 0% )' }
                                : { transform: 'translateX( 100% )' }
                    }
                    
                >
    
                    <Link to="/">
                        <button
                            onClick={  ()  => { handleClearActive(); handleCloseNavbar() } }
                        >
                            View Inventory
                        </button>
                    </Link>
    
                    <Link to="/add">
                        <button onClick={ handleCloseNavbar }>
                            Add Item
                        </button>
                    </Link>
    
                    <button
                        className="logout"
                        onClick={ handleLogout }
                    >
                        Log out
                    </button>
    
                    <i
                        className="fas fa-times"
                        onClick={ handleCloseNavbar }
                    >
                    </i>
                </div>

                <i
                    className="fas fa-bars"
                    onClick={ handleToggleNavbar }
                >
                </i>

            </div>

        </div>
    )
}
