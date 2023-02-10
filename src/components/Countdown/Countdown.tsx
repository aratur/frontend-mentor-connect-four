import React, { useContext, useEffect, useState } from 'react';
import { PlayerTurnContext } from '../../context/PlayerTurnContext';

type Props = {
  isPaused: boolean;
  initCountDown?: number;
};

const Countdown = (props: Props) => {
  const { isPaused, initCountDown = 30 } = props;
  // const initCountDown = 30; // seconds;
  const [countdown, setCountdown] = useState(initCountDown);
  const [copyPlayerTurn, setCopyPlayerTurn] = useState(0);

  const { playerTurn, status, setStatus } = useContext(PlayerTurnContext);

  useEffect(() => {
    if (copyPlayerTurn !== playerTurn) {
      // reset countdown on playerTurn change
      setCountdown(initCountDown);
      setCopyPlayerTurn(playerTurn);
    }
  }, [playerTurn, copyPlayerTurn, initCountDown]);

  useEffect(() => {
    const subtractOneSecond = () => {
      // if a player runs out of time the opponent is rewarded with a win;
      if (countdown === 1 && !['wonP2', 'wonP1'].includes(status)) {
        setStatus(playerTurn === 1 ? 'wonP2' : 'wonP1');
      } else {
        !isPaused && setCountdown(countdown - 1);
      }
    };
    const handle = setTimeout(subtractOneSecond, 1000);
    return () => {
      clearTimeout(handle);
    };
  }, [countdown, status, isPaused, playerTurn, setStatus]);

  return (
    <div className="countdown">
      <p className="heading_large">{countdown}s</p>
    </div>
  );
};

export default Countdown;
