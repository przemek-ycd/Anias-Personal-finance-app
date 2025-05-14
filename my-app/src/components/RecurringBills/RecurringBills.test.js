import { render, screen } from '@testing-library/react';
import { RecurringBills } from './RecurringBills.tsx';
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("RecurringBills Component", () => {
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
                "recurring": true
              },
        ],
      },
    });
  });

  test("renders RecurringBills header correctly", () => {
    render(
      <Provider store={store}>
        <RecurringBills />
      </Provider>
    );
    const zeroAmountElements = screen.getAllByText("0 ($0.00)");
    const recurringAmountElements = screen.getAllByText("$55.5");

    expect(screen.getByText("Recurring Bills")).toBeInTheDocument();
    expect(screen.getByText("Total bills")).toBeInTheDocument();
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText("Paid Bills")).toBeInTheDocument();
    expect(screen.getByText("Total Upcoming")).toBeInTheDocument();
    expect(screen.getByText("1 ($55.50)")).toBeInTheDocument();
    expect(screen.getByText("Due Soon")).toBeInTheDocument();
    expect(zeroAmountElements.length).toBe(2);
    expect(recurringAmountElements.length).toBe(2);
  });
});
