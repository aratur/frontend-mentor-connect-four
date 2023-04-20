import React from 'react';
import Button from '../components/Button';
import style from './rules.module.scss';

const Rules = () => (
  <div className={[style.rules, 'page'].join(' ')}>
    <main className={style.rules__main}>
      <h1 className="h1 heading-large">Rules</h1>
      <section className={style.rules__section}>
        <h2 className="h2 heading-small fnt-purple">Objective</h2>
        <p>
          Be the first player to connect 4 of the same colored discs in a row
          (either vertically, horizontally, or diagonally).
        </p>
      </section>
      <section className={style.rules__section}>
        <h2 className="h2 heading-small fnt-purple">How to play</h2>
        <ol>
          <li>Red goes first in the first game.</li>
          <li>
            Players must alternate turns, and only one disc can be dropped in
            each turn.
          </li>
          <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
          <li>
            The starter of the previous game goes second on the next game.
          </li>
        </ol>
      </section>
      <Button variant="ok" linkTo="/" />{' '}
    </main>
  </div>
);

export default Rules;
