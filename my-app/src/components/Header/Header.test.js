import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  const mockOnOpen = jest.fn();

  test("renders header details correctly", () => {
    render(
        <Header title="Pot" onOpen={mockOnOpen} />
    );
    expect(screen.getByText("Pots")).toBeInTheDocument();
    const button = screen.getByText("+ Add New Pot");
    fireEvent.click(button);
    expect(button).toHaveTextContent('+ Add New Pot');
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
  });
});
