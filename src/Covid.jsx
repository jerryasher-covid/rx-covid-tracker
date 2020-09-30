import React from 'react';
import Header from './Header';
import Legend from './Legend';
import Viz from './Viz';

const Covid = () => {
  return (
    <div className="wrapper">
      <Header />
      <div role="button" className="back-to-states">
        ← Back to states
      </div>
      <Legend />
      <Viz />
    </div>
  );
};

export default Covid;
