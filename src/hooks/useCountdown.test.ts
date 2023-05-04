import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useCountdown from './useCountdown';

describe('useCountdown', () => {
  it('should initialize countdown to initialCountDown', () => {
    const { result } = renderHook(() => useCountdown());
    expect(result.current[0]).toEqual(30);
  });

  it('should initialize countdown to provided initialCountDown', () => {
    const { result } = renderHook(() => useCountdown(false, 60));
    expect(result.current[0]).toEqual(60);
  });

  it('should count down by 1 each second', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCountdown(false, 3));
    expect(result.current[0]).toEqual(3);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toEqual(2);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toEqual(1);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toEqual(0);
  });

  it('should not count down when paused is true', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCountdown(true));
    expect(result.current[0]).toEqual(30);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toEqual(30);
  });

  it('should reset countdown to initialCountDown when resetCountDown is called', () => {
    const { result } = renderHook(() => useCountdown(false, 5));
    expect(result.current[0]).toEqual(5);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toEqual(5);
  });
});
