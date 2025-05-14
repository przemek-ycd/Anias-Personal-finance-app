import { render, screen } from '@testing-library/react';
import { LinearProgressBar } from './LinearProgressBar';
import React from "react";

describe("LinearProgressBar Component", () => {
    test("renders LinearProgressBar", () => {
        render(<LinearProgressBar height="35px" border="5px solid rgb(241, 239, 236)" backgroundColor="#277C78" value="25"/>);
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
    test("handles 100% progress", () => {
        render(
          <LinearProgressBar height="35px" border="5px solid rgb(241, 239, 236)" backgroundColor="#277C78" value="100"/>
        );
        expect(screen.getByRole("progressbar")).toHaveStyle({ width: "100%" });
      });
});