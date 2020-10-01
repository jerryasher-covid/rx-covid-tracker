import React from 'react';
import virusIcon from './assets/virus-icon.svg';

const Header = () => {
  return (
    <div className="HeaderWrapper wrapper">
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
    </div>
  );
};

export default Header;
