import React, { createContext, useContext, useState } from 'react';

import { useMapAndPopsData } from './dataMapsAndPops.js';

export const CovidContext = createContext();
CovidContext.displayName = 'CovidState';
export const useCovidContext = () => useContext(CovidContext);

export function CovidContextProvider({ children }) {
  const [loading, setLoading] = useState(0);

  const [state, setState] = useState('All States');
  const [tracker, setTracker] = useState('newCases');
  const [timeFilter, setTimeFilter] = useState('7d');
  const [per100k, setPer100k] = useState(false);
  const [useLogScale, setUseLogScale] = useState(false);
  const [consistentYAxis, setConsistentYAxis] = useState(false);

  const [
    { map, countyFips, stateFips, resetMapAndPopsFn },
  ] = useMapAndPopsData(setLoading);

  const _Context = {
    loading,
    setLoading,
    state,
    setState,
    tracker,
    setTracker,
    timeFilter,
    setTimeFilter,
    per100k,
    setPer100k,
    useLogScale,
    setUseLogScale,
    consistentYAxis,
    setConsistentYAxis,

    map,
    countyFips,
    stateFips,
    resetMapAndPopsFn,
    // githubStateDataAll
    // githubStateData90d,
  };

  return (
    <CovidContext.Provider value={_Context}>{children}</CovidContext.Provider>
  );
}
