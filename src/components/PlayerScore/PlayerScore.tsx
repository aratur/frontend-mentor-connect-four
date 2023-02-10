import React from 'react';
import style from './player_score.module.scss';
import playerOne from '../../assets/images/player-one.svg';
import playerTwo from '../../assets/images/player-two.svg';

type Props = {
  player: 1 | 2;
  points?: number;
};

const PlayerScore = (props: Props) => {
  const { points = 0, player } = props;

  return (
    <div
      className={[
        style.game__player,
        player === 1 ? style.game__player_1 : style.game__player_2,
      ].join(' ')}
    >
      <h3 className={['h3', style.game__player__name_fnt].join(' ')}>
        Player {player}
      </h3>
      <h4 className={['h4', style.game__player__points_fnt].join(' ')}>
        {points}
      </h4>
      <img
        src={player === 1 ? playerOne : playerTwo}
        alt="smiling face"
        className={
          player === 1 ? style.game__player_1__icon : style.game__player_2__icon
        }
      />
    </div>
  );
};

export default PlayerScore;
