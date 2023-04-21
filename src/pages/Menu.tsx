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
        <Button variant="vs_cpu" linkTo="/game/cpu">
          <span className="h1 heading-medium">Play vs CPU</span>
        </Button>
        <Button variant="vs_player" linkTo="/game">
          <span className="h1 heading-medium">Play vs player</span>
        </Button>
        <Button variant="game_rules" linkTo="/rules">
          <span className="h2 heading-medium">Game rules</span>
        </Button>
      </div>
    </div>
  </main>
);

export default Menu;
