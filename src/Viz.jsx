import React, { useEffect } from 'react';
import { useCovidContext } from './CovidContext';
import // json as d3json,
// csv as d3csv,
'd3-fetch';

const AllStatesButton = () => {
  const { setState } = useCovidContext();

  return (
    <button
      className="back-to-states"
      onClick={() => {
        console.log('onChange: back to states');
        setState('All States');
      }}
    >
      ← All States
    </button>
  );
};

const OverviewDailyChart = () => {
  return (
    <div id="viz-overview">
      VIZOVERVIEW
      <svg id="svg-overview" width="100" height="30">
        <g className="cell"></g>
      </svg>
    </div>
  );
};

const RegionMap = () => {
  return (
    <div id="viz-map" className="VizMap">
      VIZMAP
      <div id="viz-map-header">
        <div id="map-title">&nbsp;</div>
        <div id="map-legend">&nbsp;</div>
      </div>
      <svg id="svg-map" width="100" height="50">
        <rect id="map-backdrop" x="0" y="0" fill="transparent"></rect>
        <g id="map-g">
          <g id="map-states"></g>
          <g id="map-counties"></g>
          <path id="map-state-borders"></path>
        </g>
      </svg>
      <div id="map-no-data">No map data available</div>
    </div>
  );
};

const ChartGrid = () => {
  return <svg id="grid"></svg>;
};

const Viz = () => {
  const { loading, setLoading, state, timeFilter } = useCovidContext();

  // load count, state FIPS code
  // cache them

  useEffect(() => {
    const fetchStateData = () => {
      //      const file = timeFilter === 'all' ? 'all' : '90d';
      //      d3csv(
      //        `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/state/${file}.csv`
      //      );
    };

    setLoading(true);
    fetchStateData();
  }, [timeFilter, setLoading]);

  // load topomaps
  // cache them

  /* useEffect(()=> {
   *   setLoading((loading) => loading + 1)
   *
   * }, []);
   */
  const renderStates = () => {};

  const renderCounties = (state) => {};

  if (state === 'all_states') {
    renderStates();
  } else {
    renderCounties(state);
  }

  return (
    <div className="Viz">
      {loading}
      <div id="viz">
        <AllStatesButton />
        <div id="viz-top" className="VizTop">
          VIZTOP
          <OverviewDailyChart />
          <RegionMap />
        </div>
        <div id="viz-grid" className="VizGrid">
          VIZGRID
          <ChartGrid />
        </div>
      </div>
      <div id="tooltip"></div>
      <div className="testing-data-unavailable">
        Consistent county-level testing data is not yet available
      </div>
    </div>
  );
};

export default Viz;
