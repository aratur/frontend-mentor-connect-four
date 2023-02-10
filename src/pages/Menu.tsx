import React from 'react';
import Button from '../components/Button';
import style from './menu.module.scss';
import logo from '../assets/images/logo.svg';

const Menu = () => (
  <main className={[style.menu, 'page'].join(' ')}>
    <div className={style.menu__container}>
      <img
        className={style.menu__logo}
        src={logo}
        alt="logo with four circles"
      />
      <div className={style.menu__buttons}>
        <Button buttonClass="vs_player" linkTo="/game">
          <div className="h1 heading_medium">Play vs player</div>
        </Button>
        <Button buttonClass="game_rules" linkTo="/rules">
          <div className="h2 heading_medium">Game rules</div>
        </Button>
      </div>
    </div>
  </main>
);

export default Menu;
