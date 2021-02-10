import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { setActiveCategory, setCategories, startGetItems } from '../../actions/invent';
import { searchItems } from '../../helpers/searchItems';
import { filterItemsByCategory } from '../../helpers/filterItemsByCategory';
import { Items } from './Items';


export const InventoryScreen = () => {

    const { items, active_category, categories } = useSelector( state => state.invent );
    const { uid } = useSelector( state => state.auth );
    const dispatch = useDispatch();


    const [ { search }, handleInputChange ] = useForm({
        search: ''
    })

    const [ filteredItems, setFilteredItems ] = useState([]);

        // Leemos los items desde Mongo
    useEffect(() => {
        dispatch( startGetItems() );
    }, [ dispatch ])

        // Definimos las categorías y seteamos la active_category
    useEffect(() => {
        
            // Definimos todas las categorias únicas
        const categories = items.map( item => item.category );
        const unique_categories = categories.filter( ( category, i, arr ) => arr.indexOf( category ) === i );
    
            // Agregamos 'Mostrar todo' como categoría
        if ( unique_categories.length !== 0 )
            unique_categories.unshift( 'Show all' );


            // Seteamos la active_category apenas se monte el componente.
        dispatch( setCategories( unique_categories ) );
        dispatch( setActiveCategory( unique_categories[ 0 ] ) )


    }, [ uid, dispatch, items ])

        // Filtramos los items según la categoría
    useEffect(() => {

        setFilteredItems( filterItemsByCategory( items, active_category ) );

        if ( search ) {
            setFilteredItems( filteredItems => searchItems( filteredItems, search ) );
        }

    }, [ items, active_category, search ])

        
    const handleSelectChange = ( { target } ) => {
        dispatch( setActiveCategory( target.value ) )
    }


    return (
        <div className="inventory-screen container animate__animated animate__fadeIn">
            
            {
                ( categories.length !== 0 ) &&
                    <>
                        <select
                            className="select"
                            value={ active_category }
                            onChange={ handleSelectChange }
                        >
                            
                            {
                                categories.map( category => (
    
                                    <option
                                        key={ category }
                                        value={ category }
                                    >
                                        { category }
                                    </option>
    
                                ))
                            }
    
                        </select>

                        <input
                            type="text"
                            className="search-input"
                            onChange={ handleInputChange }
                            value={ search }
                            name="search"
                            autoComplete="off"
                            placeholder="Search your item here..."
                        />
                    </>
            }

            <div className="item-container">

                {
                    ( items.length === 0)
                        ? <p> There are no items in your inventory. </p>
                        : <Items items={ filteredItems } />
                }

            </div>

        </div>
    )
}
