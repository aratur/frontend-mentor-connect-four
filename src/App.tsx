import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes/routes';

const browserRouter = createBrowserRouter(routes);

const App = () => (
  <Suspense fallback={<div className="loader" />}>
    <RouterProvider router={browserRouter} />
  </Suspense>
);

export default App;
