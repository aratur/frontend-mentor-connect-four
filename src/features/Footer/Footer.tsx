import React from 'react';
import style from './footer.module.scss';
import TurnSVG from './TurnSVG';
import useCountdown from '../../hooks/useCountdown';
import Winner from './Winner/Winner';
import usePlayerTurn from '../../hooks/usePlayerTurn';

type Props = {
  isPaused: boolean;
};

const Footer = (props: Props) => {
  const { isPaused } = props;
  const [countdown, resetCountDown] = useCountdown(isPaused);
  const [label, status, playerTurn] = usePlayerTurn(countdown, resetCountDown);

  return (
    <footer className={style.footer}>
      <div className={style.footer__background} data-status={status} />
      <div
        className={style.footer__turn}
        data-status={status}
        data-turn={playerTurn}
      >
        <TurnSVG className={style['footer__turn-svg']} />
        <div className={style.footer__label} data-turn={playerTurn}>
          <h2 className="h2 heading-xs">{label}</h2>
          <div className="countdown">
            <p className="heading-large">{countdown}s</p>
          </div>
        </div>
      </div>
      <Winner />
    </footer>
  );
};

export default Footer;
