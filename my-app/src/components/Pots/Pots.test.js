import { render, screen } from '@testing-library/react';
import { Pots } from './Pots.tsx';
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Pots Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
        data: {
            pots: [
                {
                    "name": "Savings",
                    "target": 2000.0,
                    "total": 159.0,
                    "theme": "#277C78"
                },
                {
                    "name": "Concert Ticket",
                    "target": 150.0,
                    "total": 110.0,
                    "theme": "#626070"
                },
            ],
        },
    });
    });

    test("renders Pots header correctly", () => {
        render(
        <Provider store={store}>
            <Pots />
        </Provider>
        );

        expect(screen.getByText("Pots")).toBeInTheDocument();
    });

    test("renders pots details correctly", () => {
        render(
            <Provider store={store}>
            <Pots />
            </Provider>
        );
        const totalSavedParagraphs = screen.getAllByText("Total Saved");

        expect(screen.getByText("$159.00")).toBeInTheDocument();
        expect(screen.getByText("$110.00")).toBeInTheDocument();
        expect(screen.getByText("8%")).toBeInTheDocument();
        expect(screen.getByText("73%")).toBeInTheDocument();
        expect(screen.getByText("Target of $2000.00")).toBeInTheDocument();
        expect(screen.getByText("Target of $150.00")).toBeInTheDocument();
        expect(totalSavedParagraphs.length).toBe(2);
    });
});
