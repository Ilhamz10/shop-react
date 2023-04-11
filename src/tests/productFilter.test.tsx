import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { IProductState, ProductActionTypes } from "../types/product";
import Admin from "../components/admin/Admin";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../store";
import { productReducer } from "../store/reducers/productReducer";

let state: IProductState;

beforeEach(() => {
    state = {
        currentProduct: {},
        error: null,
        loading: false,
        filteredProducts: [],
        searchedProducts: [],
        products: [
            {
                id: 1,
                url: "/imgs/Bimax.png",
                barcode: 4604049097548,
                brand: "Nivea",
                description: "Порошок стиральный Автомат 100 пятен COMPACT",
                manufactor: "Griffon",
                name: "BIMAX",
                price: 10,
                size: 1500,
                sizeType: "г",
                typeOfCare: ["Уход за телом"],
                productCount: 5
            },
            {
                id: 2,
                url: "/imgs/Ariel.png",
                barcode: 4604049097548,
                brand: "Nivea",
                description: "Автмат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник",
                manufactor: "Griffon",
                name: "ARIEL",
                price: 20,
                size: 1000,
                sizeType: "г",
                typeOfCare: ["Уход за телом", "Уход за волосами"],
                productCount: 1
            }
        ]
    }
})

describe('', () => {
    test('', () => {
        let newState = productReducer(state, {type: ProductActionTypes.PRODUCTS_FILTER, payload: ["Уход за волосами"]});
        expect(newState.filteredProducts.length).toBe(1);
        expect(newState.filteredProducts[0].id).toEqual(2);

        newState = productReducer(state, {type: ProductActionTypes.PRODUCTS_FILTER, payload: ["Уход за телом"]});
        expect(newState.filteredProducts.length).toBe(2);

        newState = productReducer(state, {type: ProductActionTypes.PRODUCTS_FILTER, payload: ["Уход за ногами"]});
        expect(newState.filteredProducts.length).toBe(0);
    })
})