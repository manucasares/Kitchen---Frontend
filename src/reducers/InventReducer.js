import { types } from "../types/types";


const initialValue = {
    
    active_item: null,
    items: [
        // {
        //     id: 123,
        //     name: 'Banana',
        //     category: 'Proteins',
        //     quantity: 200,
        //     units: 'OZ',
        //     url: 'https://i.imgur.com/omKp4Lk.jpg',
        // },
        // {
        //     id: 1234,
        //     name: 'Banana',
        //     category: 'Grains',
        //     quantity: 200,
        //     units: 'OZ',
        //     url: 'https://static3.abc.es/media/bienestar/2019/07/25/platano-beneficios-kIyF--1024x512@abc.jpg',
        // },
    ],
    categories: [ 'Proteins', 'Grains' ],
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
    
        default:
            return state;
    }
}
