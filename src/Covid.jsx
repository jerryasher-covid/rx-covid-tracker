import React from 'react';
import Header from './Header';
import Filters from './Filters';
import Legend from './Legend';
import Viz from './Viz';

import { CovidContextProvider } from './CovidContext';

const Covid = () => {
  return (
    <CovidContextProvider>
      <div className="wrapper">
        <Header />
        <Filters />
        <Legend />
        <Viz />
      </div>
    </CovidContextProvider>
  );
};

export default Covid;
