import React, { useContext, useEffect, useState } from 'react';
import style from './footer.module.scss';
import { GameStateContext } from '../../context/GameStateContext';
import TurnSVG from './TurnSVG';
import useCountdown from '../../hooks/useCountdown';
import Winner from './Winner/Winner';

type Props = {
  isPaused: boolean;
};

const GameFooter = (props: Props) => {
  const { isPaused } = props;
  const [copyPlayerTurn, setCopyPlayerTurn] = useState(0);
  const { playerTurn, status, isCPU, setStatus } = useContext(GameStateContext);
  const [countdown, resetCountDown] = useCountdown(isPaused);

  useEffect(() => {
    if (copyPlayerTurn !== playerTurn) {
      // reset countdown on playerTurn change
      resetCountDown();
      setCopyPlayerTurn(playerTurn);
    }
  }, [playerTurn, copyPlayerTurn, resetCountDown]);

  useEffect(() => {
    if (countdown === 0 && !['wonP2', 'wonP1'].includes(status)) {
      setStatus(playerTurn === 1 ? 'wonP2' : 'wonP1');
    }
  }, [countdown, playerTurn, setStatus, status]);

  let label = `Player ${playerTurn}'s turn`;
  if (isCPU) label = playerTurn === 1 ? 'Your turn' : "cpu's turn";

  return (
    <footer className={style.footer}>
      <div className={style.footer__background} data-status={status} />
      <div
        className={style.footer__turn}
        data-status={status}
        data-turn={playerTurn}
      >
        <TurnSVG className={style['footer__turn-svg']} />
        <div className={style.footer__label} data-turn={playerTurn}>
          <h2 className="h2 heading-xs">{label}</h2>
          <div className="countdown">
            <p className="heading-large">{countdown}s</p>
          </div>
        </div>
      </div>
      <Winner />
    </footer>
  );
};

export default GameFooter;
