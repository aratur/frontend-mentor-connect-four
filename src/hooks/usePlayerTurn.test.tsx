import React, { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { GameStateContextProvider } from '../store/GameStateContext';
import usePlayerTurn from './usePlayerTurn';

describe('usePlayerTurn', () => {
  const setStatus = vi.fn();

  beforeEach(() => {
    setStatus.mockClear();
  });

  it('returns correct label for human player', () => {
    const { result } = renderHook(() => usePlayerTurn(10, vi.fn()), {
      wrapper: ({ children }) => (
        <GameStateContextProvider>{children}</GameStateContextProvider>
      ),
    });
    expect(result.current[0]).toBe("Player 2's turn");
  });

  it('returns correct label for CPU player', () => {
    const { result } = renderHook(() => usePlayerTurn(10, vi.fn()), {
      wrapper: ({ children }) => (
        <GameStateContextProvider isCPU>{children}</GameStateContextProvider>
      ),
    });
    expect(result.current[0]).toBe("cpu's turn");
  });

  it('sets status to correct value when countdown reaches 0', async () => {
    vi.useFakeTimers();
    const resetCountDown = vi.fn();
    const { result } = renderHook(() => usePlayerTurn(0, resetCountDown), {
      wrapper: ({ children }) => (
        <GameStateContextProvider>{children}</GameStateContextProvider>
      ),
    });
    expect(result.current[1]).toBe('wonP1');
    expect(resetCountDown).toHaveBeenCalled();
  });
});
