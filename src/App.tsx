import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Menu from './pages/Menu';
import Rules from './pages/Rules';
import { GameStateContextProvider } from './context/GameStateContext';

const GameWithContext = () => (
  <GameStateContextProvider>
    <Game />
  </GameStateContextProvider>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* for online comparison */}
      <Route path="/" element={<Menu />} />
      <Route path="/game" element={<GameWithContext />} />
      <Route path="/game/cpu" element={<GameWithContext />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="*" element={<p>Incorrect URL</p>} />
    </Routes>
  </BrowserRouter>
);

export default App;
