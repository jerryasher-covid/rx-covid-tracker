import React from 'react';

const Viz = () => {
  return (
    <div className="Viz">
      <div id="viz">
        <div role="button" className="back-to-states">
          ← All States
        </div>
        <div id="viz-top" className="VizTop">
          <div id="viz-overview">
            <svg id="svg-overview" width="100" height="30">
              <g className="cell"></g>
            </svg>
          </div>
          <div id="viz-map" className="VizMap">
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
        </div>
        <div id="viz-grid" className="VizGrid">
          <svg id="grid"></svg>
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
