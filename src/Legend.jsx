import React from 'react';

const Legend = () => {
  return (
    <div className="LegendWrapper">
      <div className="legend ma-legend">
        <div className="legend-item">
          <div className="legend-square bg-primary1"></div>
          <div className="legend-field-label"></div>
        </div>
        <div className="legend-item">
          <div className="legend-line bg-primary2"></div>
          <div>7-day Moving Average</div>
        </div>
      </div>
      <div className="legend testing-legend">
        <div className="legend-item">
          <div className="legend-square bg-primary1"></div>
          <div>Positive Tests</div>
        </div>
        <div className="legend-item">
          <div className="legend-square bg-primary2"></div>
          <div>Negative Tests</div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
