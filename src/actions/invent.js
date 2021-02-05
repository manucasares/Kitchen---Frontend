import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";



export const setActiveItem = ( item ) => ({
    type: types.inventSetActiveItem,
    payload: item
})

export const clearActiveEvent = () => ({ type: types.inventClearActiveEvent })

export const setActiveCategory = ( category ) => ({
    type: types.inventSetActiveCategory,
    payload: category
})

export const startCreateItem = ( item ) => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;


        
        try {
            const resp = await fetchConToken( 'invent', item, 'POST' );
            const body = await resp.json();
            
            if ( body.ok ) {

                    // Agregamos al item el id proveido por Mongo y el uid
                item.id = body.item.id;
                item.uid = uid;

                dispatch( createItem( item ) )
                Swal.fire({
                    text: 'Item added successfully!',
                    confirmButtonText: 'OK',
                    icon: 'success',
                    allowOutsideClick: false
                }).then( (result) => {

                        // Redirigimos a la url principal
                    if ( result.isConfirmed ) {
                        window.location = '/';
                    }
                });
            }
        } catch (error) {
           
            console.log(error);
        }
    }
}

export const startGetItems = ( uid ) => {

    return async( dispatch ) => {


        try {
            
            const resp = await fetchConToken( 'invent' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( setItems( body.items ) );
            }

        } catch (error) {
            console.log(error);    
        }

    }
}

const createItem = ( item ) => ({
    type: types.inventCreateItem,
    payload: item
})

const setItems = ( items ) => ({
    type: types.inventSetItem,
    payload: items
})