import { render, screen } from '@testing-library/react';
import { Budgets, DetailsItemComponent } from './Budgets.tsx';
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

// This is required by Recharts
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Budgets Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      data: {
        budgets: [
            {
                "category": "Dining Out",
                "maximum": 75.0,
                "theme": "#F2CDAC"
            },
            {
                "category": "Bills",
                "maximum": 750.0,
                "theme": "#82C9D7"
            },
        ],
        transactions: [
            {
                "avatar": "./images/avatars/spark-electric-solutions.jpg",
                "name": "Spark Electric Solutions",
                "category": "Bills",
                "date": "2024-07-02T09:25:51Z",
                "amount": -100.0,
                "recurring": true
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

  test("renders budgets header correctly", () => {
    render(
      <Provider store={store}>
        <Budgets />
      </Provider>
    );

    expect(screen.getByText("Budgets")).toBeInTheDocument();
  });

  test("renders DetailsItem component correctly", () => {
    render(
      <Provider store={store}>
        <DetailsItemComponent category="Bills" theme="#82C9D7" maximum={750} />
      </Provider>
    );
    expect(screen.getByText("Maximum of $750")).toBeInTheDocument();
    expect(screen.getByText("Spent")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Latest Spending")).toBeInTheDocument();
    expect(screen.getByText("$650")).toBeInTheDocument();
    expect(screen.getByText("Spark Electric Solutions")).toBeInTheDocument();
    expect(screen.getByText("Jul 02 2024")).toBeInTheDocument();
  });

  test("renders budgets details correctly", () => {
    render(
      <Provider store={store}>
        <Budgets />
      </Provider>
    );

    expect(screen.getByText("Spending Summary")).toBeInTheDocument();
    expect(screen.getByText("$155.50")).toBeInTheDocument();
    expect(screen.getByText("of $825.00 limit")).toBeInTheDocument();
  });

});
