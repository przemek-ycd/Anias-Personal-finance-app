import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PersonalFinanceApp from "./PersonalFinanceApp";

const mockStore = configureStore([]);

describe("PersonalFinanceApp", () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

  test("renders menu items", () => {
    render(
      <Provider store={store}>
        <PersonalFinanceApp />
      </Provider>
    );

    expect(screen.getByTestId("menu-item-overview")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item-budgets")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item-pots")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item-transactions")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item-recurringBills")).toBeInTheDocument();
  });

  test("handle button click", () => {
    render(
      <Provider store={store}>
        <PersonalFinanceApp />
      </Provider>
    );

    const toggleButton = screen.getByLabelText("menu-toggle-button");
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.queryByText(/minimize menu/i)).not.toBeInTheDocument();
  });
});