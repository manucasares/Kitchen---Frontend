import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { isURL } from 'validator';


import { startCreateItem, startDelete, startUpdateItem } from '../../actions/invent';


const initFormValues = {
    name: '',
    quantity: '',
    units: '',
    category: '',
    url: ''
}

export const AddItem = () => {

    const { active_item } = useSelector( state => state.invent );
    const dispatch = useDispatch();

    const [ formValues, setFormValues ] = useState( initFormValues );
    
    const { name, quantity, units, category, url } = formValues;
    

    useEffect(() => {

        if ( active_item ) {
            setFormValues( active_item );
        } else {
            setFormValues( initFormValues );
        }   
        
    }, [ active_item, setFormValues ]);
    

    const handleInputChange = ( { target }) => {

        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })
    }


    const handleCreateOrUpdate = ( e ) => {
        e.preventDefault();

            // Si hay campos vacíos
        if ( [ name, quantity, units, category, url ].some( field => !field ) ) {
            Swal.fire( 'Error', 'There are empty fields.', 'error' );
            return;
        }

            // Si quantity no es un número
        if ( isNaN( quantity ) ) {
            Swal.fire( 'Error', 'Quantity specified must be a number.', 'error' );
            return;
        }

            // Si no es una URL valida
        if ( !isURL( url ) ) {
            Swal.fire( 'Error', 'Image URL specified is not valid.', 'error' );
            return;
        }

        if ( active_item ) {
            
                // Actualizamos
            dispatch( startUpdateItem( formValues ) );
        } else {
            
                // Creamos
            dispatch( startCreateItem( formValues ) );
        }
    }

    const handleDelete = ( e ) => {
        e.preventDefault();

        Swal.fire({
            text: 'Are you sure you want to delete this item permanently?',
            showDenyButton: true,
            denyButtonText: 'Delete',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            allowOutsideClick: false,
            showConfirmButton: false
        }).then( ( resp ) => {
            if ( resp.isDenied ) {

                    // Eliminamos item
                dispatch( startDelete( active_item.id ) );
            }
        })

    }


    return (
        <div className="add-item-window container">
        
            <form className="form" >

                <div>
                    <p> Item name: </p>
                    <input
                        type="text"
                        value={ name }
                        name="name"
                        onChange= { handleInputChange }
                        autoComplete="off"
                    />
                </div>

                <div>
                    <p> Item quantity: </p>
                    <input
                        type="text"
                        value={ quantity }
                        name="quantity"
                        onChange= { handleInputChange }
                        autoComplete="off"
                    />
                </div>

                <div>
                    <p> Item units: </p>
                    <input
                        type="text"
                        value={ units }
                        name="units"
                        onChange= { handleInputChange }
                        autoComplete="off"
                    />
                </div>

                <div>
                    <p> Item category: </p>
                    <input
                        type="text"
                        value={ category }
                        name="category"
                        onChange= { handleInputChange }
                        autoComplete="off"
                    />
                </div>   

                <div>
                    <p> Image URL: </p>
                    <input
                        type="text"
                        value={ url }
                        name="url"
                        onChange= { handleInputChange }
                        autoComplete="off"
                        placeholder="https://i.imgur.com/omKp4Lk.jpg"
                    />
                </div>

                {
                    ( active_item ) &&
                        <button
                            className="btn-red"
                            onClick={ handleDelete }
                        >
                            Delete item
                        </button>
                }

                <button
                    className="btn-green"
                    onClick={ handleCreateOrUpdate }
                >
                    
                    {
                        ( active_item )
                            ? 'Update item'
                            : 'Create item'
                    }

                </button>

            </form>

        </div>
    )
}
