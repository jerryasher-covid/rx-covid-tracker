export const _STATES_DICT = {
  Alabama: 'AL',
  Alaska: 'AK',
  'American Samoa': 'AS',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District of Columbia': 'DC',
  'Federated States of Micronesia': 'FM',
  Florida: 'FL',
  Georgia: 'GA',
  Guam: 'GU',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  'Marshall Islands': 'MH',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Northern Mariana Islands': 'MP',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Palau: 'PW',
  Pennsylvania: 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  'Virgin Islands': 'VI',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};

export const _CHOICES = {
  TRACKER: [
    { option: 'newCases', label: 'Daily New Cases' },
    { option: 'newDeaths', label: 'Daily New Deaths' },
    { option: 'newTests', label: 'Daily New Tests' },
    { option: 'cases', label: 'Total Announced Cases' },
    { option: 'deaths', label: 'Total Announced Deaths' },
    { option: 'tests', label: 'Total Testing' },
  ],
  INTERVAL: [
    { option: '7d', label: 'Last 7 days' },
    { option: '14d', label: 'Last 14 days' },
    { option: '1mo', label: 'Last 30 days' },
    { option: '90d', label: 'Last 90 days' },
    { option: 'all', label: 'All' },
  ],
  PER_100K: { option: 'per_100k', label: 'Per 100k People' },
  LOG_SCALE: { option: 'log_scale', label: 'Log Scale' },
  Y_AXIS: { option: 'y-axis', label: 'Consistent Y-Axis' },
  STATES: [
    { option: 'All States', label: 'All States' },
    ...Object.entries(_STATES_DICT).map(([state, abbrev]) => ({
      option: state,
      label: state,
    })),
  ],
};