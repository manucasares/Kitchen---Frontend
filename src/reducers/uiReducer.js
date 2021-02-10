import { types } from "../types/types";


const initialState = {
    navbar_opened: window.innerWidth >= 700
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
    
        default:
            return state;
    }

}