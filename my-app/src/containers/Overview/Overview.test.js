import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import {Overview} from "./Overview";

// This is required by Recharts
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const mockStore = configureStore([]);

describe("Overview component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
          data: {
            balance: {
                "current": 4836.0,
                "income": 3814.25,
                "expenses": 1700.5
              },
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


  test("renders overview header correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Overview />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  test("renders balance summary correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Overview />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getByText("$4836.00")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("$3814.25")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("$1700.50")).toBeInTheDocument();
  });

  test("renders pots section correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Overview />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Pots")).toBeInTheDocument();
    expect(screen.getByText("Total Saved")).toBeInTheDocument();
    expect(screen.getByText("$269")).toBeInTheDocument();
    expect(screen.getByText("Savings")).toBeInTheDocument();
    expect(screen.getByText("$159.00")).toBeInTheDocument();
    expect(screen.getByText("Concert Ticket")).toBeInTheDocument();
    expect(screen.getByText("$110.00")).toBeInTheDocument();

  });

  test("renders budgets section correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Overview />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Budgets")).toBeInTheDocument();
    expect(screen.getByText("Dining Out")).toBeInTheDocument();
    expect(screen.getByText("$55.5")).toBeInTheDocument();
    expect(screen.getByText("Bills")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  test("renders transactions section correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Overview />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Spark Electric Solutions")).toBeInTheDocument();
    expect(screen.getByText("-$55.5")).toBeInTheDocument();
    expect(screen.getByText("Jul 02 2024")).toBeInTheDocument();
    expect(screen.getByText("Savory Bites Bistro")).toBeInTheDocument();
    expect(screen.getByText("-$100")).toBeInTheDocument();
    expect(screen.getByText("Aug 19 2024")).toBeInTheDocument();
  });

  test("renders recurring bills section correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Overview />
        </MemoryRouter>
      </Provider>
    );
    const zeroAmountElements = screen.getAllByText("0 ($0.00)");

    expect(screen.getByText("Recurring Bills")).toBeInTheDocument();
    expect(screen.getByText("Paid Bills")).toBeInTheDocument();
    expect(screen.getByText("1 ($100.00)")).toBeInTheDocument();
    expect(screen.getByText("Total Upcoming")).toBeInTheDocument();
    expect(screen.getByText("Due Soon")).toBeInTheDocument();
    expect(zeroAmountElements.length).toBe(2);
  });
});