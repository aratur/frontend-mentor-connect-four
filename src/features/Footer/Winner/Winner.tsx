import React, { useCallback, useContext } from 'react';
import style from './winner.module.scss';
import { GameStateContext } from '../../../context/GameStateContext';
import { Button } from '../../../components';

const Winner = () => {
  const { status, setStatus, isCPU } = useContext(GameStateContext);
  const winnerNumber = status.substring(status.length - 1);

  let winnerLabel = winnerNumber === '1' ? 'Player 1' : 'Player 2';
  winnerLabel =
    (isCPU && (winnerNumber === '1' ? 'Player 1' : 'CPU')) || winnerLabel;
  winnerLabel = (status === 'draw' && 'Nobody') || winnerLabel;

  const handlePlayAgainClicked = useCallback(
    () => setStatus('new'),
    [setStatus]
  );

  return (
    <div className={style.winner} data-status={status}>
      <h2 className="h2 heading-xs">{winnerLabel}</h2>
      <h3 className="h3 heading-large">Wins</h3>
      <Button variant="basic" onClick={handlePlayAgainClicked}>
        <span className="h4 heading-xs">Play again</span>
      </Button>
    </div>
  );
};

export default Winner;
