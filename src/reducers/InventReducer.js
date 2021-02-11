import { types } from "../types/types";


const initialValue = {
    
    active_item: null,
    items: [],
    categories: [],
    active_category: '',
}

export const InventReducer = ( state = initialValue, action ) => {


    switch ( action.type ) {

        case types.inventSetActiveItem:
            return {
                ...state,
                active_item: action.payload
            };

        case types.inventClearActiveEvent:
            return {
                ...state,
                active_item: null
            }

        case types.inventSetActiveCategory:
            return {
                ...state,
                active_category: action.payload
            }

        case types.inventCreateItem:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ]
            }

        case types.inventSetItem:
            return {
                ...state,
                items: action.payload
            }

        case types.inventSetCategories:
            return {
                ...state,
                categories: action.payload
            }

        case types.inventSetImagesResults:
            return {
                ...state,
                images_results: action.payload
            }

        case types.inventSetActiveImage:
            return {
                ...state,
                active_image: action.payload
            }
    
        default:
            return state;
    }
}
