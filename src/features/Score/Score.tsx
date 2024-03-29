import React from 'react';
import style from './score.module.scss';
import playerOne from '../../assets/images/player-one.svg';
import playerTwo from '../../assets/images/player-two.svg';
import playerCPU from '../../assets/images/cpu.svg';

type Props = {
  player: 1 | 2;
  points?: number;
  isCPU?: boolean;
};

const Score = (props: Props) => {
  const { points = 0, player, isCPU = false } = props;
  let iconSrc = playerOne;
  let label = 'Player 1';
  if (player === 1) {
    label = (isCPU && 'You') || label;
  } else {
    iconSrc = (isCPU && playerCPU) || playerTwo;
    label = (isCPU && 'cpu') || 'Player 2';
  }
  return (
    <div
      className={[
        style.game__player,
        player === 1 ? style['score__player-1'] : style['score__player-2'],
      ].join(' ')}
    >
      <h3 className={['h3', style.score__label].join(' ')}>{label}</h3>
      <h4
        data-testid={`points-${player}`}
        className={['h4', style.score__points].join(' ')}
      >
        {points}
      </h4>
      <img
        src={iconSrc}
        alt="smiling face"
        className={
          player === 1
            ? style['score__icon-player-1']
            : style['score__icon-player-2']
        }
      />
    </div>
  );
};

export default Score;
