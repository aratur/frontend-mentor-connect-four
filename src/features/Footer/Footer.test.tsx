import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Footer from './Footer';
import { GameStateContextProvider } from '../../store/GameStateContext';

// Mock useCountdown hook
vi.mock('../../hooks/useCountdown', () => ({
  __esModule: true,
  default: (isPaused: boolean) => [10, vi.fn()],
}));

// Test suite for Footer component
describe('Footer component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    render(<Footer isPaused={false} />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays correct turn label for human player', () => {
    render(<Footer isPaused={false} />);
    const label = screen.getByText(/Player 1's turn/i);
    expect(label).toBeInTheDocument();
  });

  it('displays correct turn label for CPU player', () => {
    render(<Footer isPaused={false} />, {
      wrapper: ({ children }) => (
        <GameStateContextProvider isCPU>{children}</GameStateContextProvider>
      ),
    });
    const label = screen.getByText(/cpu's turn/i);
    expect(label).toBeInTheDocument();
  });
});
