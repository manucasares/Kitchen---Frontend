import { types } from "../types/types";


const initialState = {
    navbar_opened: window.innerWidth >= 700,
    showSelectImageWindow: false,
}


export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.uiCloseNavbar:
            return {
                ...state,
                navbar_opened: false
            };

        case types.uiToggleNavbar: 
            return {
                ...state,
                navbar_opened: !state.navbar_opened
            }

        case types.uiToggleSelectImage: 
            return {
                ...state,
                showSelectImageWindow: !state.showSelectImageWindow
            }

        case types.uiShowSpinner:
            return {
                ...state,
                spinnerShown: true
            }

        case types.uiHideSpinner:
            return {
                ...state,
                spinnerShown: false
            }
    
        default:
            return state;
    }

}