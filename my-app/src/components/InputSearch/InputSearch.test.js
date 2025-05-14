import { render, screen, fireEvent } from '@testing-library/react';
import { InputSearch } from './InputSearch';
import React from "react";

describe("InputSearch Component", () => {
    test("renders input field with correct label", () => {
        render(<InputSearch searchTerm="" onChange={jest.fn()} />);
        const input = screen.getByLabelText(/search/i);
        expect(input).toBeInTheDocument();
    });

    test("handles initial search term", () => {
        render(<InputSearch searchTerm="Test Value" onChange={jest.fn()} />);
        const input = screen.getByDisplayValue("Test Value");
        expect(input).toBeInTheDocument();
    });

    test("handles input change correctly", () => {
        const mockOnChange = jest.fn();
        render(<InputSearch searchTerm="Test Value" onChange={mockOnChange} />);
        const input = screen.getByLabelText(/search/i);

        fireEvent.change(input, { target: { value: "New value" } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith("New value");
    });
});