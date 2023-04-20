import React from 'react';
import Foreground from './Foreground/Foreground';
import Background from './Background/Background';
import Slots from './Slots/Slots';
import style from './game-board.module.scss';

const GameBoard = () => (
  <div className={style['game-board']}>
    <Foreground />
    <Background />
    <Slots />
  </div>
);

export default GameBoard;
