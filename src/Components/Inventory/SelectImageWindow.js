import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startSearchImages, setActiveImage, startUpdateItem, startCreateItem } from '../../actions/invent';
import { toggleSelectImage } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const SelectImageWindow = ({ formValues }) => {

    const dispatch = useDispatch();
    const { images_results, active_image, active_item } = useSelector( state => state.invent );

    const [ { search }, handleInputChange ] = useForm({
        search: ''
    })

    const handleSearch = ( e ) => {
        e.preventDefault();

        dispatch( startSearchImages( search ) );

    }

    const closeSelectImageWindow = () => {
        dispatch( toggleSelectImage() );
    }

    const handleActiveImage = ( image_url ) => {
  
        dispatch( setActiveImage( image_url ) );
    }

    const handleCreateOrUpdate = () => {

        if ( active_item ) {
            
            formValues.url = active_image;
                // Actualizamos
            dispatch( startUpdateItem( formValues ) );
        } else {
            
                // Creamos
            dispatch( startCreateItem( formValues ) );
        }


    }

    return (
        <div className="select-image-background animate__animated animate__fadeIn">

            <div className="select-image-container auth-window">

                <form onSubmit={ handleSearch }>
                    <input
                        type="text"
                        value= { search }
                        name="search"
                        onChange={ handleInputChange }
                        autoComplete="off"
                        placeholder="Search for an image for your item here..."
                    />
                </form>

                {
                    ( images_results ) &&
                        <div className="search-results">
                            {
                                images_results.map( ({ urls, id }) => (
    
                                    <div
                                        className="result"
                                        key={ id }
                                        style={{
                                            background: `url( ${ urls.small } ) no-repeat center center / cover`,
                                            boxShadow: `${ urls.small === active_image ? '0 0 0 3px #1e9deb' : 'none' }`
                                        }}
                                        onClick={ () => handleActiveImage( urls.small ) }
                                    ></div>
    
                                ))
                            }
                        </div>
                }
                
                {
                    ( active_image ) &&
                        <button
                            className="animate__animated animate__fadeIn"
                            onClick={ handleCreateOrUpdate }
                        >
                            {
                                ( active_item )
                                    ? 'Update item'
                                    : 'Create item' 
                            }
                        </button>
                }

                
                <i
                    className="fas fa-times"
                    onClick={ closeSelectImageWindow }
                >
                </i>

            </div>
            
        </div>
    )
}
