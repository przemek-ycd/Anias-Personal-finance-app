import { render, screen, fireEvent } from '@testing-library/react';
import { MoneyManageDialog } from './MoneyManageDialog';
import React from "react";

const mockOnClose = jest.fn();
const mockOnSave = jest.fn();

const defaultProps = {
    open: true,
    onClose: mockOnClose,
    title: "Add New Pot",
    description: "Create a Pot to set savings targets",
    formData: { newName: "", newTarget: "", color: "" },
    onSave: mockOnSave,
};

describe("MoneyManageDialog Component", () => {
    test("renders dialog with title and description", () => {
        render(<MoneyManageDialog {...defaultProps} />);
        expect(screen.getByText("Add New Pot")).toBeInTheDocument();
        expect(screen.getByText("Create a Pot to set savings targets")).toBeInTheDocument();
    });
    
    test("handles closing when close button is clicked", () => {
        render(<MoneyManageDialog {...defaultProps} />);
        fireEvent.click(screen.getByText("X"));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("handle Save button", () => {
        const customProps = {
            ...defaultProps,
            formData: {
                newName: "Savings",
                newTarget: "2000.0",
                color: "#277C78"
            },
        };

        render(<MoneyManageDialog {...customProps} />);

        fireEvent.click(screen.getByText("Save"));

        expect(mockOnSave).toHaveBeenCalledTimes(1);
        expect(mockOnSave).toHaveBeenCalledWith({
            newName: "Savings",
            newTarget: "2000.0",
            color: "#277C78"
        });
    });
});