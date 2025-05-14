import { render, screen } from '@testing-library/react';
import { ChartItems } from './Chart';
import React from "react";

describe('Chart Component', () => {
    const mockProps = {
      category: 'Entertainment',
      color: '#277C78',
      spentMoneyValue: 25,
    };
  
    test('renders chart details correctly', () => {
      render(<ChartItems {...mockProps} />);
      
      const categoryElement = screen.getByText(/Entertainment/i);
      const amountElement = screen.getByText(/\$25/i);
      
      expect(categoryElement).toBeInTheDocument();
      expect(amountElement).toBeInTheDocument();
      expect(categoryElement).toHaveStyle('border-left: 3px solid #277C78');
    });
  });
