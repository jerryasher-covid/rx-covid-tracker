import React from 'react';
import virusIcon from './assets/virus-icon.svg';

const Header = () => {
  return (
    <div className="HeaderWrapper"> 
      <div className="flex-row flex-center">
        <div>
          <a href="/" className="title-wrap">
            <img
              src={virusIcon}
              title="virus by Nook Fulloption from the Noun Project"
              className="virus-icon"
              alt="icon of a virus by Nook Fulloption from the Noun Project"
            />
            <h1>US COVID-19 Tracker</h1>
          </a>
          <h3>
            Cases/Deaths data from{' '}
            <a
              href="https://github.com/nytimes/covid-19-data"
              target="_blank"
              rel="noreferrer noopener"
            >
              The New York Times
            </a>
            . Testing data from{' '}
            <a
              href="https://covidtracking.com/about-tracker/"
              // eslint-disable-next-line react/jsx-no-target-blank
              target="_blank"
            >
              The COVID Tracking Project
            </a>
            . Automatically updates with source data.
          </h3>
          <h4>
            Built by{' '}
            <a
              href="https://twitter.com/dschnr"
              rel="noreferrer noopener"
              target="_blank"
            >
              @dschnr
            </a>
            . Source code available{' '}
            <a href="https://github.com/schnerd/covid-tracker">on Github</a>.
          </h4>
        </div>
      </div>
      <div className="filters">
        <div className="filter-item">
          <select id="state-select" className="select-css" defaultValue="all">
            <option value="all">
              All States
            </option>
          </select>
        </div>
        <div className="filter-item">
          <select id="field-select" className="select-css" defaultValue="newCases">
            <option value="newCases">
              Daily New Cases
            </option>
            <option value="newDeaths">Daily New Deaths</option>
            <option className="field-select-test-option" value="newTests">
              Daily New Tests
            </option>
            <option value="cases">Total Announced Cases</option>
            <option value="deaths">Total Announced Deaths</option>
            <option className="field-select-test-option" value="tests">
              Total Testing
            </option>
          </select>
        </div>
        <div className="filter-item">
          <select id="time-select" className="select-css" defaultValue="7d">
            <option value="7d">
              Last 7 days
            </option>
            <option value="14d">
              Last 14 days
            </option>
            <option value="1mo">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All</option>
          </select>
        </div>
        <div className="filter-item">
          <label className="cb-container">
            <input type="checkbox" className="cb-input" id="cb-per-100k" />{' '}
            <span className="cb-mark"></span>{' '}
            <span className="cb-label">Per 100k People</span>
          </label>
        </div>
        <div className="filter-item" id="filter-use-log-scale">
          <label className="cb-container">
            <input type="checkbox" className="cb-input" id="cb-use-log-scale" />{' '}
            <span className="cb-mark"></span>{' '}
            <span className="cb-label">Log Scale</span>
          </label>
        </div>
        <div className="filter-item">
          <label className="cb-container" defaultChecked="cb-consistent-y">
            <input
              type="checkbox"
              className="cb-input"
              id="cb-consistent-y"
            />{' '}
            <span className="cb-mark"></span>{' '}
            <span className="cb-label">Consistent Y-Axis</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
