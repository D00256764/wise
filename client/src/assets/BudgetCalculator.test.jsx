import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BudgetCalculator from './BudgetCalculator';

describe('BudgetCalculator', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the budget calculator with empty inputs', () => {
    render(<BudgetCalculator />);
    expect(screen.getByText('Budget Calculator')).toBeInTheDocument();
    const inputs = screen.getAllByPlaceholderText('0');
    expect(inputs.length).toBeGreaterThan(0); // Multiple inputs with placeholder '0'
  });

  it('calculates total expenses correctly', () => {
    render(<BudgetCalculator />);
    
    const inputs = screen.getAllByPlaceholderText('0');
    const incomeInput = inputs[0]; // First input is income
    
    fireEvent.change(incomeInput, { target: { value: '3000' } });
    
    // Find rent and food inputs (they don't have labels with for attributes)
    const allInputs = screen.getAllByRole('spinbutton');
    const rentInput = allInputs.find(input => input.previousElementSibling?.textContent?.includes('rent'));
    const foodInput = allInputs.find(input => input.previousElementSibling?.textContent?.includes('food'));
    
    if (rentInput) fireEvent.change(rentInput, { target: { value: '1000' } });
    if (foodInput) fireEvent.change(foodInput, { target: { value: '400' } });
    
    fireEvent.change(incomeInput, { target: { value: '3000' } });
    fireEvent.change(rentInput, { target: { value: '1000' } });
    fireEvent.change(foodInput, { target: { value: '400' } });
    
    // Check if the calculation is displayed
    expect(screen.getByText(/Income: €3000.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Expenses: €1400.00/i)).toBeInTheDocument();
  });

  it('displays surplus correctly when income > expenses', () => {
    render(<BudgetCalculator />);
    
    const inputs = screen.getAllByRole('spinbutton');
    const incomeInput = inputs[0];
    const rentInput = inputs.find(input => input.previousElementSibling?.textContent?.includes('rent'));
    
    fireEvent.change(incomeInput, { target: { value: '2000' } });
    if (rentInput) fireEvent.change(rentInput, { target: { value: '1000' } });
    
    expect(screen.getByText(/Surplus/i)).toBeInTheDocument();
  });

  it('displays deficit correctly when expenses > income', () => {
    render(<BudgetCalculator />);
    
    const inputs = screen.getAllByRole('spinbutton');
    const incomeInput = inputs[0];
    const rentInput = inputs.find(input => input.previousElementSibling?.textContent?.includes('rent'));
    
    fireEvent.change(incomeInput, { target: { value: '500' } });
    if (rentInput) fireEvent.change(rentInput, { target: { value: '1000' } });
    
    expect(screen.getByText(/Deficit/i)).toBeInTheDocument();
  });
});
