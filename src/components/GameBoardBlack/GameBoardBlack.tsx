import React from 'react';
import style from './game__board__black.module.scss';
import boardBlackLarge from '../../assets/images/board-layer-black-large.svg';
import boardBlackSmall from '../../assets/images/board-layer-black-small.svg';

const GameBoardBlack = () => (
  <picture className={style.game__board__black}>
    <source media="(min-width: 767px)" srcSet={boardBlackLarge} />
    <img src={boardBlackSmall} alt="board" />
  </picture>
);

export default GameBoardBlack;
