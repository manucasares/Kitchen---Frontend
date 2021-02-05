import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";
import { InventReducer } from "./InventReducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    invent: InventReducer
})