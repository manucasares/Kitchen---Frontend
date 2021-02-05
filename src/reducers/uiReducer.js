import { types } from "../types/types";


export const uiReducer = ( state = {}, action ) => {

    switch ( action.type ) {

        case types.uiSetErrorMsg:
            return {
                ...state,
                errorMsg: action.payload
            };
    
        default:
            return state;
    }

}