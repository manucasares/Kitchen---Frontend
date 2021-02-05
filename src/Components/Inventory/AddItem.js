import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { isURL } from 'validator';


import { startCreateItem } from '../../actions/invent';


const initFormValues = {
    name: 'Manteca',
    quantity: '150',
    units: 'gr',
    category: 'Lacteos',
    url: 'https://img.huffingtonpost.com/asset/5e4fabd62300002d05ddd3bf.jpeg?ops=1200_630'
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



            // Actualizamos
        if ( active_item ) {


            // Creamos
        } else {

            dispatch( startCreateItem( formValues ) );

        }
    }


    return (
        <div className="add-item-window container">
        
            <form
                className="form"
                onSubmit={ handleCreateOrUpdate }
            >

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

                <button type="submit">
                    
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
