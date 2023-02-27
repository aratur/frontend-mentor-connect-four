import React from 'react';
import { GameStateContextProvider } from '../context/GameStateContext';
import Game from './Game';

const GameWithContext = () => (
  <GameStateContextProvider>
    <Game />
  </GameStateContextProvider>
);

export default GameWithContext;
