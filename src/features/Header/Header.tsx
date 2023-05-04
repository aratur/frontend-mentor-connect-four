import React from 'react';
import logo from '../../assets/images/logo.svg';
import style from './header.module.scss';
import { Button } from '../../components';

type Props = {
  onMenuClick: () => void;
  onRestartClicked: () => void;
};

const GameHeader = (props: Props) => {
  const { onMenuClick, onRestartClicked } = props;
  return (
    <header role="banner" className={style.header}>
      <Button variant="basic" onClick={onMenuClick}>
        <span className="h4">Menu</span>
      </Button>
      <img
        className={style.header__logo}
        src={logo}
        alt="logo with four dots"
      />
      <Button variant="basic" onClick={onRestartClicked}>
        <span className="h4">Restart</span>
      </Button>
    </header>
  );
};

export default GameHeader;
