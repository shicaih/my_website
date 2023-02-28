import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';

const GET_X = gql`
  query LookAtMe {
    allPost {
      name
    }
  }
`;

export const Header = () => (
  <div className="h-[30px] flex items-center justify-between">
    <Link className="text-center " to="/">
      Logo
    </Link>
    <div className="flex items-center justify-end">
      <Link className="text-center mr-10" to="/">
        All Project
      </Link>
      <Link className="text-center mr-10" to="/">
        Blog
      </Link>
      <Link className="text-center" to="/">
        About Me
      </Link>
    </div>
  </div>
);

const App = () => {
  // const { loading, error, data } = useQuery(GET_X);
  const params = useParams();
  return (
    <div className="App m-[30px] overflow-visible">
      <Header />
      <div className="h-[1px] bg-black" />
      <div className="text-8xl mt-[60px]">
        Welcome <br />
        to <br />
        Shicai's Universe
      </div>
      <div className="h-[1px] bg-black mt-[480px]" />
    </div>
  );
};

export default App;
