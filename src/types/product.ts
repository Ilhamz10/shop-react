export interface IProductState {
    products: any[];
    loading: boolean;
    error: null | string;
    filteredProducts: any[];
    searchedProducts: any[];
    currentProduct: IProduct | any;
}

export enum ProductActionTypes {
    FETCH_PRODUCTS = 'FETCH_PRODUCTS',
    FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR',
    PRODUCTS_SORT = 'PRODUCTS_SORT',
    PRODUCTS_FILTER = 'PRODUCTS_FILTER',
    PRODUCTS_SEARCH = 'PRODUCTS_SEARCH',
    CHECK_FILTERS = 'CHECK_FILTERS',
    SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT',
    CHANGE_PRODUCTS = 'CHANGE_PRODUCTS'
}

interface IFetchProductsAction {
    type: ProductActionTypes.FETCH_PRODUCTS;
}

interface IFetchProductsSuccessAction {
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS | ProductActionTypes.CHANGE_PRODUCTS;
    payload: any[];
}

interface IFetchProductsErrorAction {
    type: ProductActionTypes.FETCH_PRODUCTS_ERROR;
    payload: string;
}

interface IProductsSort {
    type: ProductActionTypes.PRODUCTS_SORT;
    payload: any[];
}

interface IProductsFilter {
    type: ProductActionTypes.PRODUCTS_FILTER;
    payload: any[];
}

interface IProductsSearch {
    type: ProductActionTypes.PRODUCTS_SEARCH;
    payload: any[]
}

interface ICurrentProduct {
    type: ProductActionTypes.SET_CURRENT_PRODUCT,
    payload: IProduct
}

export type IProductAction = IFetchProductsAction | IFetchProductsSuccessAction | IFetchProductsErrorAction | IProductsSort | IProductsFilter | IProductsSearch | ICurrentProduct

export interface IProduct{
    id: number;
    url: string;
    name: string;
    sizeType: string;
    size: number;
    barcode: number;
    manufactor: string;
    brand: string;
    description: string;
    price: number;
    typeOfCare: string[];
    productCount: number;
}
