import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios, { AxiosResponse } from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Main from '../components/main/Main';
import { Provider } from 'react-redux';
import { store } from '../store';

jest.mock('axios');

describe('tests for App', () => {
    let response: AxiosResponse<any>;
    beforeEach(() => {
        response = {
            data: [
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
                    productCount: 1
                }
            ],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as any
        };
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('upload products', async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(response);
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Main />
                </Provider>
            </MemoryRouter>
        );
        const products = await screen.findAllByTestId('product');
        expect(products.length).toBe(1)
        expect(axios.get).toBeCalledTimes(1);
        screen.debug()
    });
})