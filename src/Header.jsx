import React from 'react';

const Header = () => {
  return (
    <div>
      <div class='flex-row flex-center'>
        <div>
          <a href='/' class='title-wrap'>
            <img
              src='assets/virus-icon.svg'
              title='virus by Nook Fulloption from the Noun Project'
              class='virus-icon'
              alt='icon of a virus by Nook Fulloption from the Noun Project'
            />
            <h1>US COVID-19 Tracker</h1>
          </a>
          <h3>
            Cases/Deaths data from{' '}
            <a
              href='https://github.com/nytimes/covid-19-data'
              target='_blank'
              rel='noreferrer noopener'
            >
              The New York Times
            </a>
            . Testing data from{' '}
            <a
              href='https://covidtracking.com/about-tracker/'
              // eslint-disable-next-line react/jsx-no-target-blank
              target='_blank'
            >
              The COVID Tracking Project
            </a>
            . Automatically updates with source data.
          </h3>
          <h4>
            Built by{' '}
            <a
              href='https://twitter.com/dschnr'
              rel='noreferrer noopener'
              target='_blank'
            >
              @dschnr
            </a>
            . Source code available{' '}
            <a href='https://github.com/schnerd/covid-tracker'>
              on Github
            </a>
            .
          </h4>
        </div>
      </div>
      <div class='filters'>
        <div class='filter-item'>
          <select id='state-select' class='select-css'>
            <option value='all' selected='selected'>
              All States
            </option>
          </select>
        </div>
        <div class='filter-item'>
          <select id='field-select' class='select-css'>
            <option value='newCases' selected='selected'>
              Daily New Cases
            </option>
            <option value='newDeaths'>Daily New Deaths</option>
            <option
              class='field-select-test-option'
              value='newTests'
            >
              Daily New Tests
            </option>
            <option value='cases'>Total Announced Cases</option>
            <option value='deaths'>
              Total Announced Deaths
            </option>
            <option
              class='field-select-test-option'
              value='tests'
            >
              Total Testing
            </option>
          </select>
        </div>
        <div class='filter-item'>
          <select id='time-select' class='select-css'>
            <option value='7d' selected='selected'>
              Last 7 days
            </option>
            <option value='14d' selected='selected'>
              Last 14 days
            </option>
            <option value='1mo'>Last 30 days</option>
            <option value='90d'>Last 90 days</option>
            <option value='all'>All</option>
          </select>
        </div>
        <div class='filter-item'>
          <label class='cb-container'>
            <input
              type='checkbox'
              class='cb-input'
              id='cb-per-100k'
            />{' '}
            <span class='cb-mark'></span>{' '}
            <span class='cb-label'>Per 100k People</span>
          </label>
        </div>
        <div class='filter-item' id='filter-use-log-scale'>
          <label class='cb-container'>
            <input
              type='checkbox'
              class='cb-input'
              id='cb-use-log-scale'
            />{' '}
            <span class='cb-mark'></span>{' '}
            <span class='cb-label'>Log Scale</span>
          </label>
        </div>
        <div class='filter-item'>
          <label class='cb-container'>
            <input
              type='checkbox'
              class='cb-input'
              id='cb-consistent-y'
              checked='checked'
            />{' '}
            <span class='cb-mark'></span>{' '}
            <span class='cb-label'>Consistent Y-Axis</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
