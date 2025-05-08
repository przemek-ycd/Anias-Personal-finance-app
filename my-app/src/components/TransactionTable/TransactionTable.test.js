import { render, screen } from '@testing-library/react';
import { TransactionTable } from './TransactionTable';
import React from "react";

const mockTransactions = [
    {
        name: "Emma Richardson",
        avatarUrl: "./images/avatars/emma-richardson.jpg",
        amount: 75.5,
        date: new Date("2024-08-19T14:23:11Z"),
    },
    {
        name: "Savory Bites Bistro",
        avatarUrl: "./images/avatars/savory-bites-bistro.jpg",
        amount: -55.5,
        date: new Date("2024-08-19T20:23:11Z"),
    },
];

describe("TransactionTable Component", () => {
    test("renders transaction details", () => {
        render(<TransactionTable  filteredTransactions={mockTransactions}/>);
        const dateElements = screen.getAllByText("Aug 19 2024");

        expect(screen.getByText("Emma Richardson")).toBeInTheDocument();
        expect(screen.getByText("+$75.5")).toBeInTheDocument();
        expect(screen.getByText("Savory Bites Bistro")).toBeInTheDocument();
        expect(screen.getByText("-$55.5")).toBeInTheDocument();
        expect(dateElements).toHaveLength(2);
    });
});