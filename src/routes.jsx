import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import ProjectPage from './views/ProjectPage';
import ErrorPage from './views/ErrorPage';

export default createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'project/:projectSlug/',
    element: <ProjectPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/love',
    element: <div>Hello</div>,
  },
]);
