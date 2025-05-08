import { render, screen, fireEvent } from '@testing-library/react';
import { SelectDropdown } from './SelectDropdown';
import React from "react";

describe("SelectDropdown Component", () => {
    test("renders correct options", () => {
        render(<SelectDropdown label="Sort by" selectOptions={["Highest", "Lowest", "Oldest"]} onChange={jest.fn()} />);

        const label = screen.getByLabelText(/sort by/i);

        expect(label).toBeInTheDocument();

        fireEvent.mouseDown(screen.getByLabelText("Sort by"));
    
        const options = screen.getAllByRole("option");
    
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent("Highest");
        expect(options[1]).toHaveTextContent("Lowest");
        expect(options[2]).toHaveTextContent("Oldest");
    });

});
