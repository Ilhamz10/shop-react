import { IProductAction, IProductState, ProductActionTypes } from "../../types/product"

const initialState: IProductState = {
    products: [],
    loading: false,
    error: null,
    filteredProducts: [],
    searchedProducts: [],
    currentProduct: {}
}

export const productReducer = (state = initialState, action: IProductAction): IProductState => {
    switch (action.type) {
        case ProductActionTypes.FETCH_PRODUCTS:
            return { ...state, loading: true, error: null, products: [] }
        case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload }
        case ProductActionTypes.FETCH_PRODUCTS_ERROR:
            return { ...state, loading: false, error: action.payload, products: [] }
        case ProductActionTypes.CHANGE_PRODUCTS:
            return {...state, products: action.payload}
        case ProductActionTypes.PRODUCTS_SORT:
            if (state.filteredProducts.length === 0)
                return { ...state, products: action.payload }
            return { ...state, filteredProducts: action.payload }
        case ProductActionTypes.PRODUCTS_FILTER:
            return { ...state, filteredProducts: (state.searchedProducts.length !== 0 && !state.searchedProducts.includes('Извините') ? state.searchedProducts : state.products).filter(product => product.typeOfCare.some((care: string) => action.payload.includes(care))) }
        case ProductActionTypes.PRODUCTS_SEARCH:
            return { ...state, searchedProducts: action.payload }
        case ProductActionTypes.SET_CURRENT_PRODUCT:
            return {...state, currentProduct: action.payload}
        default:
            return state
    }
}