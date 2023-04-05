import axios from "axios"
import { Dispatch } from "redux"
import { IProductAction, ProductActionTypes } from "../../types/product"

export const fetchProducts = () => {
    return async (dispatch: Dispatch<IProductAction>) => {
        try {
            dispatch({ type: ProductActionTypes.FETCH_PRODUCTS })
            const response = await axios.get('./data.json')
            let products = JSON.parse(localStorage.getItem('products') as any)
            if (products === null) products = []
            if (products.length === 0)
                localStorage.setItem('products', JSON.stringify(response.data))
            dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS, payload: products.length === 0 ? response.data : products })
        } catch (e) {
            dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_ERROR, payload: 'Error' })
        }
    }
}