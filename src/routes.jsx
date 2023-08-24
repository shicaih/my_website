import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import ProjectPage from './views/ProjectPage';
import CodePage from './views/CodePage';
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
    path: 'code/:projectSlug/',
    element: <CodePage />,
    errorElement: <ErrorPage />,
  },
]);
