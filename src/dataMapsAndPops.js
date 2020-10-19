import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { json as d3json, csv as d3csv } from 'd3-fetch';

const initialMapsAndPops = {
  map: null,
  countyFips: null,
  stateFips: null,
  resetMapAndPopsFn: null,
  d3map: null,
  d3CountyFips: null,
  d3StateFips: null,
};

// GET data from net
const getMapsAndPops = async (setLoading) => {
  // retrieve topo json (d3json)
  const getMaps = () => axios.get('assets/us-counties.topojson');
  // d3csv('assets/fips-pop-cty.csv')
  const getCountyFipsPops = (county) => axios.get('assets/fips-pop-cty.csv');
  // d3csv('assets/fips-pop-sta.csv')
  const getStateFipsPops = (state) => axios.get('assets/fips-pop-sta.csv');
  const d3Maps = () => d3json('assets/us-counties.topojson')
  const d3CountyFipsPops = () => d3csv('assets/fips-pop-cty.csv')
  const d3StateFipsPops = (state) => d3csv('assets/fips-pop-sta.csv')

  console.log('getMapsAndPops: start');
  setLoading(true);
  const results = await Promise.all([
    getMaps(),
    getCountyFipsPops(),
    getStateFipsPops(),
    d3Maps(),
    d3CountyFipsPops(),
    d3StateFipsPops(),
  ]).catch((e) => {
    console.log(`Error fetching initial data: ${e}`);
    setLoading(false);
    return initialMapsAndPops;
  });
  console.log('getMapsAndPops data loaded results:', results);
  setLoading(false);

  const data = {
    ...initialMapsAndPops,
    map: results[0],
    countyFips: results[1],
    stateFips: results[2],
    d3map: results[3],
    d3CountyFips: results[4],
    d3StateFips: results[5],
  };
  console.log('getMapsAndPops: returning', data);
  return data;
};

// REDUCER - STATE MANAGEMENT - BUSINESS LOGIC
const dataFetchReducer = (state, action) => {
  const type = action.type;
  console.log(
    'dataFetchReducer type:',
    type,
    'state:',
    state,
    'action',
    action
  );
  let new_state;
  switch (type) {
    case 'FETCH_INIT':
      new_state = { ...state, isLoading: true, isError: false };
    break;
    case 'FETCH_SUCCESS':
      new_state = {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    break;
    case 'FETCH_FAILURE':
      new_state = {
        ...state,
        isLoading: false,
        isError: true,
      };
    break;
    default:
      throw new Error();
  }

  console.log("dataFetchReducer returning new_state", new_state);

  return new_state;

};

// CUSTOM USE HOOK AND USE EFFECT
export const useMapAndPopsData = (setLoading) => {
  const [reload, setReload] = useState(0);
  const resetMapAndPopsFn = () => setReload((reload) => reload + 1);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: { ...initialMapsAndPops, resetMapAndPopsFn },
  });

  console.log('useMapAndPopsData entry');

  useEffect(() => {
    let didCancel = false;

    console.log('useEffect: entry')

    const fetchData = async () => {
      console.log('useMapAndPopsData: useEffect: fetchData');
      dispatch({ type: 'FETCH_INIT' });
      try {
        console.log('useMapAndPopsData: useEffect: FETCH_INIT dispatched');
        const result = await getMapsAndPops(setLoading);
        if (!didCancel) {
          console.log(
            'useMapAndPopsData: useEffect: dispatch success result:',
            result
          );
          const action = { type: 'FETCH_SUCCESS', payload: result };
          console.log(
            'useMapAndPopsData: useEffect: dispatch success action:',
            action
          );
          dispatch(action);
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      console.log('useEffect, returning didCancel=true');
      didCancel = true;
    };
  }, [reload, setLoading]);

  console.log('useMapAndPopsData returning state.data', state.data, 'state', state);
    
  return [state.data];
};
