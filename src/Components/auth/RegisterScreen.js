import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';


import { startRegister } from '../../actions/auth';


export const RegisterScreen = () => {
    
    const dispatch = useDispatch();

    const [ { name, email, password, password2 }, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })


    const handleRegister = ( e ) => {
        e.preventDefault();

        // Si hay algun campo vacío
        if ( [ name, email, password, password2 ].some( value => !value.trim() ) ) {

            Swal.fire( 'Error', 'There are empty fields.', 'error' );
            return;
        }

        if ( !validator.isEmail( email ) ) {

            Swal.fire( 'Error', 'Write a valid email.', 'error' );
            return;
        }

        if ( password !== password2 || password.length < 6 ) {

            Swal.fire( 'Error', 'Password is too short or are different.', 'error' );
            return;
        }

        dispatch( startRegister( name, email, password ) );
    }

    return (

        <div className="animate__animated animate__fadeIn">
            <h2> Create an Account! </h2>

            <form onSubmit= { handleRegister }>

                <input
                    type="text"
                    placeholder="Name"
                    autoComplete="off"
                    value= {name}
                    name= "name"
                    onChange= { handleInputChange }
                />

                <input
                    type="text"
                    placeholder="Email"
                    autoComplete="off"
                    value= {email}
                    name= "email"
                    onChange= { handleInputChange }
                />
    
                <input
                    type="password"
                    placeholder="Password"
                    value= {password}
                    name= "password"
                    onChange= { handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Repeat password"
                    value= {password2}
                    name= "password2"
                    onChange= { handleInputChange }
                />

                <button type="submit">
                    Create Account
                </button>

            </form>

            <p> Already have an Account? </p>

            <Link to="/login" className="link"> Log in here! </Link>

        </div>
    )
}
