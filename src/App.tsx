import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Menu from './pages/Menu';
import Rules from './pages/Rules';
import { PlayerContextProvider } from './context/PlayerTurnContext';

const GameWithContext = () => (
  <PlayerContextProvider>
    <Game />
  </PlayerContextProvider>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* for online comparison */}
      <Route path="/" element={<GameWithContext />} />
      <Route path="/" element={<Menu />} />
      <Route path="/game" element={<GameWithContext />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="*" element={<p>Incorrect URL</p>} />
    </Routes>
  </BrowserRouter>
);

export default App;
