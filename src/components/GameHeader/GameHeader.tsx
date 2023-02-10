import React from 'react';
import logo from '../../assets/images/logo.svg';
import style from './game__header.module.scss';
import Button from '../Button';

type Props = {
  onMenuClick: () => void;
  onRestartClicked: () => void;
};

const GameHeader = (props: Props) => {
  const { onMenuClick, onRestartClicked } = props;
  return (
    <header className={style.game__header}>
      <Button buttonClass="basic" onClick={onMenuClick}>
        <h4 className="h4">Menu</h4>
      </Button>
      <img
        className={style.game__header__logo_center}
        src={logo}
        alt="logo with four dots"
      />
      <Button buttonClass="basic" onClick={onRestartClicked}>
        <h4 className="h4"> Restart</h4>
      </Button>
    </header>
  );
};

export default GameHeader;
