import { BasketActionType, IBasketState } from "../types/basket"
import { basketReducer } from "../store/reducers/basketReducer"

let state: IBasketState;

beforeEach(() => {
    state = {
        basket: [
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
        ],
        allPrice: 0
    }
})

describe('tests fot basket', () => {
    test('delete product from basket', () => {
        const newState = basketReducer(state, { type: BasketActionType.DELETE_FROM_BASKET, payload: 1 })
        expect(newState.basket.length).toBe(0)
    })

    test('add to basket new product', () => {
        const newProduct = {
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
        const newState = basketReducer(state, { type: BasketActionType.ADD_TO_BASKET, payload: newProduct })
        expect(newState.basket.length).toBe(2);
    })

    test('test change product count', () => {
        let newState = basketReducer(state, {type: BasketActionType.CHANGE_PRODUCT_COUNT, payload: {id: 1, change: -1}})
        expect(newState.basket[0].productCount).toEqual(4);

        newState = basketReducer(state, {type: BasketActionType.CHANGE_PRODUCT_COUNT, payload: {id: 1, change: 3}})
        expect(newState.basket[0].productCount).toEqual(7);
    })
})