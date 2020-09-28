import React from 'react';

const Legend = () => {
  return (
    <div>
      <div class='legend ma-legend'>
        <div class='legend-item'>
          <div class='legend-square bg-primary1'></div>
          <div class='legend-field-label'></div>
        </div>
        <div class='legend-item'>
          <div class='legend-line bg-primary2'></div>
          <div>7-day Moving Average</div>
        </div>
      </div>
      <div class='legend testing-legend'>
        <div class='legend-item'>
          <div class='legend-square bg-primary1'></div>
          <div>Positive Tests</div>
        </div>
        <div class='legend-item'>
          <div class='legend-square bg-primary2'></div>
          <div>Negative Tests</div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
