import React from 'react';
import Header from './Header';
import Legend from './Legend';
import Viz from './Viz';

import './style.css';

const Covid = () => {
  return (
    <div class='wrapper'>
      <Header />
      <div role='button' class='back-to-states'>
        ← Back to states
      </div>
      <Legend />
      <Viz />
    </div>
  );
};

export default Covid;
