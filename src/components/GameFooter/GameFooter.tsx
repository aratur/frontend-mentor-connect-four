import React, { useContext } from 'react';
import style from './game__footer.module.scss';
import Button from '../Button';
import { PlayerTurnContext } from '../../context/PlayerTurnContext';
import turnBackgroundRed from '../../assets/images/turn-background-red.svg';
import turnBackgroundYellow from '../../assets/images/turn-background-yellow.svg';
import Countdown from '../Countdown/Countdown';

type Props = {
  isPaused: boolean;
};

const GameFooter = (props: Props) => {
  const { isPaused } = props;
  const { playerTurn, status, setStatus } = useContext(PlayerTurnContext);

  const turnBackground =
    playerTurn === 1 ? turnBackgroundRed : turnBackgroundYellow;

  const winnerNumber = status.substring(status.length - 1);

  return (
    <footer className={style.game__footer}>
      <div className={style.game__footer__background} data-status={status} />
      <div className={style.game__turn}>
        <img src={turnBackground} alt="turn background" />
        <div className={style.game__turn__label} data-turn={playerTurn}>
          <h2 className="h2 heading_xs">Player {playerTurn}&apos;s turn</h2>
          <Countdown isPaused={isPaused} />
        </div>
      </div>
      <div className={style.game__winner} data-status={status}>
        <h2 className="h2 heading_xs">Player {winnerNumber}</h2>
        <h3 className="h3 heading_large">Wins</h3>
        <Button buttonClass="basic" onClick={() => setStatus('new')}>
          <h4 className="h4 heading_xs">Play again</h4>
        </Button>
      </div>
    </footer>
  );
};

export default GameFooter;
