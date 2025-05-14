import { render, screen, fireEvent } from '@testing-library/react';
import { MoneyPotsDialog } from './MoneyPotsDialog';
import React from "react";

describe("MoneyPotsDialog Component", () => {
  const mockHandleSave = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnClose = jest.fn();
  const mockOnInputChange = jest.fn();

  const defaultProps = {
    buttonContent: "Add money",
    dialogTitle: "Add money to",
    target: 2000,
    initialAmount: 0,
    handleSave: mockHandleSave,
    calculateNewTotalAmount: (inputValue) => 159 + inputValue,
    onInputChange: mockOnInputChange,
    isOpen: true,
    onOpen: mockOnOpen,
    onClose: mockOnClose,
  };

  test("renders button with correct text", () => {
    render(<MoneyPotsDialog {...defaultProps} />);
    expect(screen.getByText("Add money")).toBeInTheDocument();
  });

  test("opens dialog when button is clicked", () => {
    render(<MoneyPotsDialog {...defaultProps} />);
    expect(screen.getByText("Add money to ‘Savings’")).toBeInTheDocument();
  });

  test("calls onOpen when button is clicked", () => {
    render(<MoneyPotsDialog {...defaultProps} isOpen={false} />);
    fireEvent.click(screen.getByText("Add money"));
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test("updates input value and calculates new total amount", () => {
    render(<MoneyPotsDialog {...defaultProps} />);
    const input = screen.getByLabelText("Target Amount ($)");
    fireEvent.change(input, { target: { value: "200" } });
    expect(defaultProps.onInputChange).toHaveBeenCalled();
  });
});
