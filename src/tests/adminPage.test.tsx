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
            }
        ]
    }
})

describe('admin page tests', () => {
    test('add product from admin', () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Admin />
                </Provider>
            </MemoryRouter>
        )
        const openBtn = screen.getByTestId('add-product');
        userEvent.click(openBtn);
        screen.debug();
        let newProduct = {
            id: 2,
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
        }

        let newState = productReducer(state, {type: ProductActionTypes.CHANGE_PRODUCTS, payload: [...state.products, newProduct]});
        expect(newState.products.length).toBe(2);
    })
})