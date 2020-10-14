import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
// see https://github.com/axios/axios

const getMapData = () => {
  // retrieve topo json (d3json)
  return axios.get('assets/us-counties.topojson');
};

const getCountyFipsPopulationData = (county) => {
  // d3csv('assets/fips-pop-cty.csv')
  return axios.get('assets/fips-pop-cty.csv');
};

const getStateFipsPopulationData = (state) => {
  // d3csv('assets/fips-pop-sta.csv')
  return axios.get('assets/fips-pop-sta.csv');
};

const getInitialData = async (setLoading) => {
  console.log('getInitialData: start')
  setLoading(true);
  const results = await Promise.all([
    getMapData(),
    getCountyFipsPopulationData(),
    getStateFipsPopulationData(),
  ]).catch((e) => {
    console.log(`Error fetching initial data: ${e}`);
    setLoading(false);
  const initialData = {
    map: null,
    countyFips: null,
    stateFips: null,
  };
    return initialData;
  });

  setLoading(false);

  const initialData = {
    map: results[0],
    countyFips: results[1],
    stateFips: results[2],
  };
  console.log('getInitialData: returning', initialData);
  return initialData;
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export const useInitialData = (setLoading) => {
  const [initialize, setInitialState] = useState(null);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = getInitialData(setLoading);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [initialize, setLoading]);

  return [state, setInitialState];
};

/*
const getCountyCovidData = (timeDir, countyFips) => {
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    // d3csv(
    //   `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/county/${timeDir}/${fips}.csv`
    // ),
    `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/county/${timeDir}/${countyFips}.csv`,
    null
  );
};

const getStateCovidData = (stateFile) => {
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    // d3csv(
    // `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/state/${file}.csv`
    // ),
    `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/state/${stateFile}.csv`,
    null
  );
};
*/

// export {
//   // useCountyFipsPopulationData,
//   // useCountyCovidData,
//   getNationalData,
// };
