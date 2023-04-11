import { stat } from "fs";
import { BasketActionType, IBasketAction, IBasketState } from "../../types/basket";
import { IProduct } from "../../types/product";

const initialState: IBasketState = {
    basket: [],
    allPrice: 0
}

export const basketReducer = (state = initialState, action: IBasketAction) => {
    switch(action.type){
        case BasketActionType.ADD_TO_BASKET:
            return {...state, basket: [...state.basket, action.payload]}
        case BasketActionType.SET_PRICE:
            return {...state, allPrice: action.payload}
        case BasketActionType.DELETE_FROM_BASKET:
            return {...state, basket: state.basket.filter((prod) => prod.id !== action.payload)}
        case BasketActionType.CHANGE_PRODUCT_COUNT:
            return {...state, basket: state.basket.map(prod => {
                if(action.payload.change < 0){
                    if (prod.id === action.payload.id && prod.productCount !== 1)
                        prod.productCount = prod.productCount + action.payload.change
                } else{
                    prod.productCount = prod.productCount + action.payload.change
                }
                return prod
            })}
        default:
            return state
    }
}