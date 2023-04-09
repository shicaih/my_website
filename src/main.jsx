import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RouterProvider } from 'react-router-dom';
import Router from './routes';
import './index.css';

const client = new ApolloClient({
  uri: 'https://qkpbnng0.apicdn.sanity.io/v1/graphql/production/default',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={Router} />
    </ApolloProvider>
  </React.StrictMode>,
);
