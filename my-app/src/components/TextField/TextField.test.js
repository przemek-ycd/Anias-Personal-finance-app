import { render, screen, fireEvent } from '@testing-library/react';
import { TextFieldComponent } from './TextField';
import React from "react";

describe("TextField Component", () => {
    const mockOnChange = jest.fn();
    test("renders input field with correct label", () => {
        render(<TextFieldComponent label="Pot" name="Pot" type="text" value="" onChange={mockOnChange} />);
        const input = screen.getByLabelText("Pot");
        fireEvent.change(input, { target: { value: "New Value" } });

        expect(input).toBeInTheDocument();
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
});