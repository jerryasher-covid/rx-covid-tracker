import React, { createContext, useContext, useState, useEffect } from 'react';

export const CovidContext = createContext();
CovidContext.displayName = 'CovidState';
export const useCovidContext = () => useContext(CovidContext);

export function CovidContextProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const [state, setState] = useState('All States');
  const [tracker, setTracker] = useState('newCases');
  const [interval, setInterval] = useState('7d');
  const [per100k, setPer100k] = useState(false);
  const [logScale, setLogScale] = useState(false);
  const [consistentYAxis, setConsistentYAxis] = useState(false);

  const store = {
    loading,
    state,
    setState,
    tracker,
    setTracker,
    interval,
    setInterval,
    per100k,
    setPer100k,
    logScale,
    setLogScale,
    consistentYAxis,
    setConsistentYAxis,
  };

  function initializeContext() {
    setLoading(false);
  }

  useEffect(() => {
    initializeContext();
  }, []);

  return (
    <CovidContext.Provider value={store}>{children}</CovidContext.Provider>
  );
}
