import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderItem from "./HeaderItem";

describe("HeaderItem Component", () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

  test("renders HeaderItem title correctly", () => {
    render(
        <HeaderItem name="Savings" color="#277C78" onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    expect(screen.getByText("Savings")).toBeInTheDocument();
  });

  test("handle edit button", () => {
    render(
        <HeaderItem name="Savings" color="#277C78" onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    const menuButton = screen.getByRole('button', {
      name: /icon ellipsis/i,
    });
    fireEvent.click(menuButton);
  
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);
  
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  test("handle delete button", () => {
    render(
        <HeaderItem name="Savings" color="#277C78" onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    const menuButton = screen.getByRole('button', {
      name: /icon ellipsis/i,
    });
    fireEvent.click(menuButton);
  
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
  
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
