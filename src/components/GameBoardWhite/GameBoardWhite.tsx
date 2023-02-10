import React from 'react';
import style from './game__board__white.module.scss';
import boardWhiteLarge from '../../assets/images/board-layer-white-large.svg';
import boardWhiteSmall from '../../assets/images/board-layer-white-small.svg';

const GameBoardWhite = () => (
  <picture className={style.game__board__white}>
    <source media="(min-width: 767px)" srcSet={boardWhiteLarge} />
    <img src={boardWhiteSmall} alt="board" />
  </picture>
);

export default GameBoardWhite;
