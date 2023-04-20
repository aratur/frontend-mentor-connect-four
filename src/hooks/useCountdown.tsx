import { useCallback, useEffect, useState } from 'react';

type UseCountdown = (
  paused?: boolean,
  initialCountDown?: number
) => [number, () => void];

const useCountdown: UseCountdown = (paused = false, initialCountDown = 30) => {
  const [countdown, setCountdown] = useState(initialCountDown);
  const resetCountDown = useCallback(
    () => setCountdown(initialCountDown),
    [initialCountDown]
  );

  useEffect(() => {
    const subtractOneSecond = () => {
      !paused && setCountdown(countdown - 1);
    };
    const handle = setTimeout(subtractOneSecond, 1000);
    return () => {
      clearTimeout(handle);
    };
  }, [countdown, paused]);

  return [countdown, resetCountDown];
};

export default useCountdown;
