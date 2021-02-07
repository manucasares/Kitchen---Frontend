import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


import { setActiveItem } from '../../actions/invent';

export const Items = ( { items } ) => {


    const dispatch = useDispatch();

    const [ showCog, setShowCog ] = useState();


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
        <>
            {
                items.map( item => (

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
                            <p className="category"> { item.category } </p>
                            <p className="name"> { item.name } </p>
                            <p className="quantity"> { item.quantity } { item.units } </p>
                        </div>
                    </div>

                ))
            }
            
        </>
    )
}
 