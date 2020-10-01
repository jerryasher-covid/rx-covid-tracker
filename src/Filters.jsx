import React from 'react';

import { useCovidContext } from './CovidContext';
import { Select } from './components/Select';
import { Checkbox } from './components/Checkbox';
import { _CHOICES } from './data/constants';

const Filters = () => {
  const {
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
  } = useCovidContext();

  return (
    <div className="Filters filters">
      <div className="filter-item">
        <Select
          id="state-select"
          className="select-css"
          defaultValue={state}
          onChange={(value) => setState(value)}
          options={_CHOICES.STATES}
        />
      </div>
      <div className="filter-item">
        <Select
          id="field-select"
          className="select-css"
          defaultValue={tracker}
          onChange={(value) => setTracker(value)}
          options={_CHOICES.TRACKER}
        />
      </div>
      <div className="filter-item">
        <Select
          id="time-select"
          className="select-css"
          defaultValue={interval}
          onChange={(value) => setInterval(value)}
          options={_CHOICES.INTERVAL}
        />
      </div>
      <div className="filter-item">
        <Checkbox
          id="cb-per-100k"
          className="cb-input"
          checked={per100k}
          onChange={(value) => setPer100k(!per100k)}
          label={_CHOICES.PER_100K.label}
        />
      </div>
      <div className="filter-item" id="filter-use-log-scale">
        <Checkbox
          id="cb-use-log-scale"
          className="cb-input"
          checked={logScale}
          onChange={(value) => setLogScale(!logScale)}
          label={_CHOICES.LOG_SCALE.label}
        />{' '}
      </div>
      <div className="filter-item">
        <Checkbox
          id="cb-consistent-y"
          className="cb-input"
          checked={consistentYAxis}
          onChange={(value) => setConsistentYAxis(!consistentYAxis)}
          label={_CHOICES.Y_AXIS.label}
        />
      </div>
    </div>
  );
};

export default Filters;
