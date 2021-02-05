import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import { setActiveCategory, setActiveItem, startGetItems } from '../../actions/invent';


export const InventoryScreen = () => {

    const { items, categories, active_category } = useSelector( state => state.invent );
    const { uid } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const [ showCog, setShowCog ] = useState();
    const [ filteredItemsByCategory, setFilteredItemsByCategory ] = useState([]);


        // Seteamos la active_category apenas se monte el componente.
        // Leemos los items desde Mongo
    useEffect(() => {

        if ( categories[0] ) {
            dispatch( setActiveCategory( categories[0] ) )
        }

        dispatch( startGetItems( uid ) );
    }, [ uid, categories, dispatch ])

    useEffect(() => {
        
        console.log(items);
        console.log(`active category ${ active_category }`);
        setFilteredItemsByCategory( items.filter( item => item.category === active_category ) );

    }, [ items, active_category ])


    const handleInputChange = ( { target } ) => {
        dispatch( setActiveCategory( target.value ) )
    }

    // Cog UI
    const handleShowCog = ( id ) => {
        setShowCog( id );
    }

    const handleHideCog = () => {
        setShowCog( null );
    }


    const handleOpenItem = ( item ) => {

        dispatch( setActiveItem( item ) );
    }



    return (
        <div className="inventory-screen container">
            
            {
                ( categories.length !== 0 ) &&
                    <select
                        className="select"
                        value={ active_category }
                        onChange={ handleInputChange }
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
            }

            <div className="item-container">

                {
                    ( items.length === 0)
                        ? <p> There are no items in your inventory. </p>
                        : filteredItemsByCategory.map( item => (

                            <div
                                className="item-card"
                                key={ item.id }
                                onMouseOver={ () => handleShowCog( item.id ) }
                                onMouseLeave={ handleHideCog }
                            >
                                
                                <div
                                    className="img"
                                    style={{
                                        background: `url(${ item.url }) no-repeat center center / cover`
                                    }}
                                >
    
                                </div>
    
                                <div className="text-container">
                                    {
                                        ( item.id === showCog ) &&
                                            <Link to="add">
                                                <i
                                                    className="fas fa-cog"
                                                    onClick={ () => handleOpenItem( item ) }
                                                ></i>
                                            </Link>
                                    }
                                    <p className="name"> { item.name } </p>
                                    <p className="quantity"> { item.quantity } { item.units } </p>
                                </div>
                            </div>
                        ))
                }

            </div>

        </div>
    )
}
