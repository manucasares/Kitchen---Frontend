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
            
            // Petición al traductor
            const translatorResp = await fetch( `https://api.mymemory.translated.net/get?q=${ item.name.toLowerCase() }&langpair=es|en` );
            const { responseData } = await translatorResp.json();

            console.log(responseData.translatedText);
            
            // Peticion a unsplash para obtener la URL de la imagen a usar
            const unsplashResp = await fetch( `https://api.unsplash.com/search/photos?query=${ responseData.translatedText }&client_id=x11nv0YULidFeAUN4HZ98bjcc9S5RlLUn5mfyAXeF18` );
            const { results } = await unsplashResp.json();
            
                // Seteamos la url de unsplash a nuestro item 
            item.url = results[0].urls.small;

                // Petición a nuestro backend
            const backendResp = await fetchConToken( 'invent', item, 'POST' );
            const backendBody = await backendResp.json();
            


            if ( backendBody.ok ) {

                    // Agregamos al item el id proveido por Mongo y el uid
                item.id = backendBody.item.id;
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

    return async( dispatch ) => {

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


const createItem = ( item ) => ({
    type: types.inventCreateItem,
    payload: item
})

const setItems = ( items ) => ({
    type: types.inventSetItem,
    payload: items
})