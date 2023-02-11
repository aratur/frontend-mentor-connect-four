import React, { useCallback, useContext } from 'react';
import style from './game__footer.module.scss';
import Button from '../Button';
import { GameStateContext } from '../../context/GameStateContext';
import PlayerTurnBackground from './PlayerTurnBackground';

import Countdown from '../Countdown/Countdown';

type Props = {
  isPaused: boolean;
  isCPU?: boolean;
};

const GameFooter = (props: Props) => {
  const { isPaused, isCPU = false } = props;
  const { playerTurn, status, setStatus } = useContext(GameStateContext);

  const winnerNumber = status.substring(status.length - 1);
  let label = `Player ${playerTurn}'s turn`;
  label = isCPU && playerTurn === 1 ? 'Your turn' : "cpu's turn";
  let winnerLabel = winnerNumber === '1' ? 'Player 1' : 'Player 2';
  winnerLabel =
    (isCPU && (winnerNumber === '1' ? 'Player 1' : 'CPU')) || winnerLabel;
  winnerLabel = (status === 'draw' && 'Nobody') || winnerLabel;

  const handlePlayAgainClicked = useCallback(
    () => setStatus('new'),
    [setStatus]
  );

  return (
    <footer className={style.game__footer}>
      <div className={style.game__footer__background} data-status={status} />
      <div
        className={style.game__turn}
        data-status={status}
        data-turn={playerTurn}
      >
        <PlayerTurnBackground className={style.game__turn__background} />
        <div className={style.game__turn__label} data-turn={playerTurn}>
          <h2 className="h2 heading_xs">{label}</h2>
          <Countdown isPaused={isPaused} />
        </div>
      </div>
      <div className={style.game__winner} data-status={status}>
        <h2 className="h2 heading_xs">{winnerLabel}</h2>
        <h3 className="h3 heading_large">Wins</h3>
        <Button buttonClass="basic" onClick={handlePlayAgainClicked}>
          <span className="h4 heading_xs">Play again</span>
        </Button>
      </div>
    </footer>
  );
};

export default GameFooter;
