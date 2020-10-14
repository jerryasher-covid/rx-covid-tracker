import { fetchAndRenderStates } from './dataprocessing';
import { router } from './router';

import $ from 'jquery';
import * as history from 'history';
import * as topojson from 'topojson-client';
import './style.css';

const isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
  $(document.body).addClass('touch');
}

// Data
let stateData = null;
let countyData = null;
let usData = null;
// let lastData = null;

let stateToFipsMap = {};

// Map features
let stateFeatures = null;
let stateBorders = null;
let countyFeatures = null;

// Filter values
const filters = {
  state: 'all',
  field: 'newCases',
  time: '14d',
  useLog: false,
  per100k: false,
  consistentY: true,
};

// UI state
let firstCasesDate = new Date(2020, 0, 21);
let lastCasesDate = null;
let tooltipValue = null;
let tooltipShown = null;
let tooltipHideTimer = null;
let isTestingData = false;

///////////////
// Constants //
///////////////

const dataPointLabels = {
  cases: 'Total Cases',
  deaths: 'Total Deaths',
  tests: 'Total Tests',
  positive: 'Total Positive',
  pending: 'Total Pending',
  negative: 'Total Negative',
  newCases: 'New Cases',
  newDeaths: 'New Deaths',
  newTests: 'New Tests',
  newPositive: 'New Positive',
  newNegative: 'New Negative',
  pop: 'Est. Population',
};
Object.keys(dataPointLabels).forEach((k) => {
  dataPointLabels[per100kKey(k)] = dataPointLabels[k];
});

// On the map, "daily new" fields are averages
const mapDataPointLabels = { ...dataPointLabels };
Object.keys(mapDataPointLabels).forEach((key) => {
  if (key.indexOf('new') === 0) {
    mapDataPointLabels[key] = `Avg ${mapDataPointLabels[key].replace(
      'New',
      'Daily'
    )}`;
  }
});

const fieldHasMovingAverage = {
  newCases: true,
  newDeaths: true,
  [per100kKey('newCases')]: true,
  [per100kKey('newDeaths')]: true,
};

const timeLabels = {
  '7d': 'Last 7 days',
  '14d': 'Last 14 days',
  '1mo': 'Last 30 days',
  '90d': 'Last 90 days',
  all: 'All-time',
};

const MA_NUM_DAYS = 7;

const KANSAS_CITY_FAKE_FIPS = '29999';

// https://github.com/nytimes/covid-19-data#geographic-exceptions
const countyLabelToFips = {
  'New York City': '36061',
  'Kansas City': KANSAS_CITY_FAKE_FIPS,
};

const populationOverrides = {
  // Kansas City, MO edge cases. City is not a real county, it overlaps
  // with four other counties. Mayor posted a tweet with population estimates
  // for the city overall, and the parts of the counties that fall within the city.
  // https://twitter.com/QuintonLucasKC/status/1249756319805997058
  [KANSAS_CITY_FAKE_FIPS]: 505604,
  // Cass County, MO
  29037: 103610 - 85,
  // Jackson County, MO
  29095: 700307 - 313870,
  // Clay County, MO
  29047: 246365 - 137446,
  // Platte County, MO
  29165: 102985 - 54202,

  // New York City - Sum of the 5 boroughs due to NYT geographic exception
  36061: 8336817,
};

const fipsRemapping = {
  // Bronx -> NY
  36005: '36061',
  // Kings -> NY,
  36047: '36061',
  // Queens -> NY
  36081: '36061',
  // Richmond -> NY
  36085: '36061',
};

// const resizeWindow = throttle(() => {
//   if (lastData) {
//     render(lastData);
//   }
// }, 100);
// window.addEventListener('resize', resizeWindow);

export default function covid() {
  // window.addEventListener('resize', resizeWindow);

  // if (filters.state === 'all') {
  fetchAndRenderStates();
  // } else {
  //   fetchAndRenderCounties(filters.state);
  // }

  // attachEvents();
}
