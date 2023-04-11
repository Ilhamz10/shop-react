import { render, screen } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../store";
import Header from "../components/header/Header";

describe('tests for routes', () => {
    test('Route to basket page', () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </MemoryRouter>
        );
        const basketLink = screen.getByTestId('basket-link');
        userEvent.click(basketLink);
        expect(screen.getByTestId('basket-page')).toBeInTheDocument();
    });

    test('route to admin page', () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </MemoryRouter>
        );
        const adminLink = screen.getByTestId('admin-link');
        userEvent.click(adminLink);
        expect(screen.getByTestId('admin-page')).toBeInTheDocument();
    })
})