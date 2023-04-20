import React from 'react';
import style from './foreground.module.scss';
import boardWhiteLarge from '../../../assets/images/board-layer-white-large.svg';
import boardWhiteSmall from '../../../assets/images/board-layer-white-small.svg';

const Foreground = () => (
  <picture className={style.foreground}>
    <source media="(min-width: 767px)" srcSet={boardWhiteLarge} />
    <img src={boardWhiteSmall} alt="board" />
  </picture>
);

export default Foreground;
