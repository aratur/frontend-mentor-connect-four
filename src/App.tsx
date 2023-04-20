import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './pages/Menu';

const GameLazy = lazy(() => import('./pages/GameWithContext'));
const RulesLazy = lazy(() => import('./pages/Rules'));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div className="loader" />}>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game" element={<GameLazy />} />
        <Route path="/game/cpu" element={<GameLazy />} />
        <Route path="/rules" element={<RulesLazy />} />
        <Route path="*" element={<p>Incorrect URL</p>} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
