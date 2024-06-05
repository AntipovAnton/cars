import React from 'react';
import { render, screen } from "@testing-library/react";
import App from "./App";
import { ICar } from "./types/types";
import axios from "axios";

jest.mock('axios');

const cars: ICar[] = [
    {
        "id": 1,
        "name": "Lancer Evolution",
        "brand": "Mitsubishi",
        "description": "Aenean.",
        "specification": "Morbi non lectus.",
        "rating": 4,
        "reviewsCount": 3,
        "price": 8000.93,
        "image": "http://dummyimage.com/464x442.png/ff4444/ffffff"
    }, {
        "id": 2,
        "name": "Accent",
        "brand": "Hyundai",
        "description": "Morbi.",
        "specification": "Duis bibendum.",
        "rating": 3,
        "reviewsCount": 0,
        "price": 544874.94,
        "image": "http://dummyimage.com/423x400.png/5fa2dd/ffffff"
    }
];

describe("App Test", () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    test('render app, loading and display cars', async () => {
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: cars }));
        render(<App />);
        const element = screen.getByTestId('listing-page-spin-wrapper');
        expect(element).toBeInTheDocument();
        expect((await screen.findAllByTestId('skeleton-wrapper'))).toHaveLength(2);
        expect(await screen.findAllByTestId('car')).toHaveLength(2);
        expect(screen.queryAllByTestId('skeleton-wrapper')).toHaveLength(0);
        expect(axios.get).toHaveBeenCalledTimes(1);
        // screen.debug();
    });

    test('fetch cars and got an error', async () => {
        // @ts-ignore
        axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
        render(<App />);
        expect((await screen.findByText('Something went wrong'))).toBeInTheDocument();
        // screen.debug();
    });
});