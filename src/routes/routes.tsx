import React, { lazy } from 'react';
import Menu from '../pages/Menu';

const GameLazy = lazy(() => import('../pages/GameWithContext'));
const RulesLazy = lazy(() => import('../pages/Rules'));

const routes = [
  { path: '/', element: <Menu /> },
  { path: '/game', element: <GameLazy /> },
  { path: '/game/cpu', element: <GameLazy /> },
  { path: '/rules', element: <RulesLazy /> },
  { path: '*', element: <p>Incorrect URL</p> },
];

export default routes;
