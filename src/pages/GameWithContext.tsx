import React from 'react';
import { GameStateContextProvider } from '../store/GameStateContext';
import Game from './Game';

const GameWithContext = () => (
  <GameStateContextProvider>
    <Game />
  </GameStateContextProvider>
);

export default GameWithContext;
