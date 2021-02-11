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
        const { active_image } = getState().invent;


        
        try {
            
                // Seteamos la url de la imagen
            item.url = active_image;

                // Petición a nuestro backend
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

export const startGetItems = () => {

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

export const startUpdateItem = ( item ) => {

    return async() => {

        try {
            
            const resp = await fetchConToken( `invent/${ item.id }`, item, 'PUT' );
            const body = await resp.json();
    
            if ( body.ok ) {

                Swal.fire({
                    text: 'Item updated successfully!',
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

export const startDelete = ( id ) => {

    return async( dispatch ) => {

        
        try {

            const resp = await fetchConToken( `invent/${ id }`, {}, 'DELETE' );
            const body = await resp.json();
            

            if ( body.ok ) {
                Swal.fire({
                    text: 'Your item was deleted successfully!',
                    allowOutsideClick: false,
                    icon: 'success'

                }).then( ( resp ) => {
                    if ( resp.isConfirmed ) {
                        window.location = '/';
                    }
                } ) 
            }

        } catch (error) {
            console.log(error);
        }


    }

}

export const setCategories = ( categories ) => ({
    type: types.inventSetCategories,
    payload: categories
})

export const startSearchImages = ( search ) => {

    return async( dispatch ) => {


            // Peticion a unsplash para obtener la URL de la imagen a usar

        try {
            
            const resp = await fetch( `https://api.unsplash.com/search/photos?query=${ search }&client_id=x11nv0YULidFeAUN4HZ98bjcc9S5RlLUn5mfyAXeF18&per_page=18` );
            const { results } = await resp.json();


            dispatch( setImagesResults( results ) );

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

const setImagesResults = ( results ) => ({
    type: types.inventSetImagesResults,
    payload: results
})

export const setActiveImage = ( image_url ) => ({
    type: types.inventSetActiveImage,
    payload: image_url
})