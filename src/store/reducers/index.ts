import { combineReducers } from "redux";
import { basketReducer } from "./basketReducer";
import { productReducer } from "./productReducer";


export const rootReducer = combineReducers({
    product: productReducer,
    basket: basketReducer,
})

export type RootState = ReturnType<typeof rootReducer>