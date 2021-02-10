import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as EmailValidator from 'email-validator';

import { useForm } from '../../hooks/useForm';

import { startLogin } from '../../actions/auth';
import logo from '../../images/logo.png';



export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ { email, password }, handleInputChange ] = useForm({
        email: '',
        password: ''
    });


    const handleSubmit = ( e ) => {

        e.preventDefault();

        if ( !email.trim() || !password.trim() ) {
            
            Swal.fire( 'Error', 'There are empty fields.', 'error' )
            return;
        }

        if ( !EmailValidator.validate( email ) ) {

            Swal.fire( 'Error', 'The email entered is not valid.', 'error' );
            return;
        }

        dispatch( startLogin( email, password ) );
    }

    return (

        <div className="animate__animated animate__fadeIn">
            <div className="logo-title">
    
                <img className="logo" src={ logo } alt="logo" />
    
                <h2> Kitchen Inventory </h2>
    
            </div>
    
            <form
                className="login-form"
                onSubmit={ handleSubmit }
            >
    
                <input
                    type="text"
                    placeholder="Email"
                    value={ email }
                    name="email"
                    onChange={ handleInputChange }
                    autoComplete="off"

                />
    
                <input
                    type="password"
                    placeholder="Password"
                    value={ password }
                    name="password"
                    onChange={ handleInputChange }
                    autoComplete="off"

                />
    
                <button type="submit">
                    Log in
                </button>
    
            </form>
    
            <Link className="link" to="/auth/register">
                New user? Register here!
            </Link>
        </div>
    )
}
