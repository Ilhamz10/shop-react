import { IProduct } from "./product";

export interface IBasketState {
    basket: IProduct[];
    allPrice: number;
}

interface IBasketAddAction {
    type: BasketActionType.ADD_TO_BASKET;
    payload: IProduct;
}

interface ISetPriceAction{
    type: BasketActionType.SET_PRICE;
    payload: number;
}

interface IDeleteProduct{
    type: BasketActionType.DELETE_FROM_BASKET;
    payload: IProduct[];
}

interface IChangeProductCount{
    type: BasketActionType.CHANGE_PRODUCT_COUNT;
    payload: IProduct[];
}

export enum BasketActionType {
    ADD_TO_BASKET = 'ADD_TO_BASKET',
    SET_PRICE = 'SET_PRICE',
    DELETE_FROM_BASKET = 'DELETE_FROM_BASKET',
    CHANGE_PRODUCT_COUNT = 'CHANGE_PRODUCT_COUNT'
}

export type IBasketAction = IBasketAddAction | ISetPriceAction | IDeleteProduct | IChangeProductCount