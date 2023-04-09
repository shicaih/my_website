import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  const params = useParams();

  return (
    <>
      <Header />
      <div className="App m-[30px] overflow-visible">
        <div className="text-8xl mt-[60px] font-['jost-bold']">
          WELCOME, STRANGER
        </div>
      </div>
    </>
  );
};

export default App;
