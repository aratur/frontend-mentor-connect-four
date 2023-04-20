import React from 'react';
import style from './background.module.scss';
import boardBlackLarge from '../../../assets/images/board-layer-black-large.svg';
import boardBlackSmall from '../../../assets/images/board-layer-black-small.svg';

const Background = () => (
  <picture className={style.background}>
    <source media="(min-width: 767px)" srcSet={boardBlackLarge} />
    <img src={boardBlackSmall} alt="board" />
  </picture>
);

export default Background;
