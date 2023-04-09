import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import ErrorPage from './views/ErrorPage';

export default createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
]);
