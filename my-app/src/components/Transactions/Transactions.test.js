import { render, screen, fireEvent } from '@testing-library/react';
import { Transactions } from './Transactions.tsx';
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Transactions Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      data: {
        transactions: [
            {
                "avatar": "./images/avatars/emma-richardson.jpg",
                "name": "Emma Richardson",
                "category": "General",
                "date": "2024-08-19T14:23:11Z",
                "amount": 75.5,
                "recurring": false
              },
              {
                "avatar": "./images/avatars/savory-bites-bistro.jpg",
                "name": "Savory Bites Bistro",
                "category": "Dining Out",
                "date": "2024-08-19T20:23:11Z",
                "amount": -55.5,
                "recurring": false
              },
        ],
      },
    });
  });

  test("renders transactions header correctly", () => {
    render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );

    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });

  test("filters transactions by search term", () => {
    render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Emma" } });

    expect(screen.getByText("Emma Richardson")).toBeInTheDocument();
    expect(screen.queryByText("Savory Bites Bistro")).not.toBeInTheDocument();
  });

  test("renders transactions table correctly", () => {
    render(
      <Provider store={store}>
        <Transactions />
      </Provider>
    );

    const dateElements = screen.getAllByText("Aug 19 2024");

    expect(screen.getByText("Recipient")).toBeInTheDocument();
    expect(screen.getByText("Transaction Date")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Emma Richardson")).toBeInTheDocument();
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("$75.5")).toBeInTheDocument();
    expect(screen.getByText("Savory Bites Bistro")).toBeInTheDocument();
    expect(screen.getByText("Dining Out")).toBeInTheDocument();
    expect(screen.getByText("-$55.5")).toBeInTheDocument();
    expect(dateElements.length).toBe(2);
  });
});
