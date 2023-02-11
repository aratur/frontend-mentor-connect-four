import React, { PropsWithChildren, useMemo } from 'react';
import { Link } from 'react-router-dom';
import buttons from './button.module.scss';

type Props = {
  buttonClass:
    | 'vs_cpu'
    | 'vs_player'
    | 'game_rules'
    | 'quit'
    | 'white'
    | 'basic'
    | 'ok';
  onClick?: () => void;
  linkTo?: string;
};

const Button = (props: PropsWithChildren<Props>): React.ReactElement => {
  const { buttonClass: buttonType, children, onClick, linkTo } = props;

  const classNames = useMemo(
    () => [
      buttons.button_vs_cpu,
      buttons.button_vs_player,
      buttons.button_game_rules,
      buttons.button_quit,
      buttons.button_white,
      buttons.button_basic,
      buttons.button_ok,
    ],
    []
  );

  const className = useMemo(
    () =>
      [
        buttons.button,
        ...classNames.filter((c) => c.includes(buttonType)),
      ].join(' '),
    [buttonType, classNames]
  );

  return linkTo !== undefined ? (
    <Link to={`${linkTo}`} onClick={onClick} className={className}>
      {children}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
