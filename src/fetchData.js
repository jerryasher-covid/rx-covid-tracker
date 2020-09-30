function coerceNumber(value) {
  return value === undefined ? null : Number(value);
}

function processStates(csv, popMap) {
  const nestedStates = d3nest()
    .key((k) => k.state)
    .entries(csv);

  const processed = processGroups(nestedStates, popMap, true);

  stateData = [];
  processed.forEach((group) => {
    if (group.key === 'US') {
      group.key = 'United States';
      usData = [group];
    } else {
      if (!stateToFipsMap[group.key]) {
        stateToFipsMap[group.key] = group.values[0].fips;
      }
      stateData.push(group);
    }
  });
}

function fetchMapData() {
  if (!fetchMapData.promise) {
    fetchMapData.promise = d3json('assets/us-counties.topojson').then((us) => {
      stateFeatures = topojson.feature(us, us.objects.states).features;
      stateBorders = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
      countyFeatures = topojson.feature(us, us.objects.counties).features;
    });
  }
  return fetchMapData.promise;
}

function processCounties(csv, popMap) {
  // First nest counties by state
  const nestedStates = d3nest()
    .key((k) => k.state)
    .entries(csv);

  const stateMap = {};

  nestedStates.forEach((state) => {
    const counties = d3nest()
      .key((k) => k.county)
      .entries(state.values);
    const byCounty = processGroups(counties, popMap, false);
    stateMap[state.key] = {
      key: state.key,
      counties: byCounty,
    };
  });

  countyData = stateMap;
}

function fetchStateData() {
  return fetchStateDataMemo(filters.time);
}

function fetchCountyData(state) {
  return fetchCountyDataMemo(state, filters.time);
}

function fetchAndRenderStates() {
  startLoading();
  fetchStateData()
    .then(() => {
      renderAllStates();
      completeLoading();
    })
    .catch((error) => {
      console.error(error);
      completeLoading();
    });
}

function fetchAndRenderCounties(state) {
  startLoading();
  fetchCountyData(state)
    .then(() => {
      renderCounties(state);
      completeLoading();
    })
    .catch((error) => {
      console.error(error);
      completeLoading();
    });
}

function processPopulations(pop) {
  const map = Object.assign({}, populationOverrides);
  pop.forEach((p) => {
    const fips = fipsRemapping[p.fips] || p.fips;
    if (populationOverrides[fips]) {
      map[fips] = populationOverrides[fips];
    } else {
      map[fips] = parseInt(p.pop);
    }
  });
  return map;
}

function processCounties(csv, popMap) {
  // First nest counties by state
  const nestedStates = d3nest()
    .key((k) => k.state)
    .entries(csv);

  const stateMap = {};

  nestedStates.forEach((state) => {
    const counties = d3nest()
      .key((k) => k.county)
      .entries(state.values);
    const byCounty = processGroups(counties, popMap, false);
    stateMap[state.key] = {
      key: state.key,
      counties: byCounty,
    };
  });

  countyData = stateMap;
}

function getValueKeys(withTesting) {
  const valueKeys = ['cases', 'deaths', 'newCases', 'newDeaths'];
  if (withTesting) {
    valueKeys.push(
      'positive',
      'negative',
      'pending',
      'tests',
      'newPositive',
      'newNegative',
      'newTests'
    );
  }
  return valueKeys;
}

function processGroups(groups, popMap, hasTesting) {
  const valueKeys = getValueKeys(hasTesting);

  groups.forEach((group) => {
    const newRows = [];
    for (let i = 0; i < group.values.length; i++) {
      const row = group.values[i];
      const [year, month, date] = row.date.split('-');

      let fips = row.fips;
      if (!fips && row.county) {
        fips = countyLabelToFips[row.county];
      }

      const parsed = {
        ...row,
        fips,
        date: new Date(Number(year), Number(month) - 1, Number(date)),
        cases: Number(row.cases),
        deaths: Number(row.deaths),
        newCases: Number(row.newCases),
      };
      valueKeys.forEach((key) => {
        parsed[key] = coerceNumber(parsed[key]);
      });

      newRows.push(parsed);

      // Add population-normalized data
      const pop = popMap[parsed.fips];
      if (pop) {
        parsed.pop = pop;
        const p100kFactor = pop / 1e5;
        valueKeys.forEach((key) => {
          if (typeof parsed[key] === 'number') {
            parsed[per100kKey(key)] = parsed[key] / p100kFactor;
          }
        });
      } else {
        group.noPopulation = true;
      }

      if (
        lastCasesDate === null ||
        parsed.date.getTime() > lastCasesDate.getTime()
      ) {
        lastCasesDate = parsed.date;
      }
    }
    group.values = newRows;
  });

  return groups;
}

const fetchStatePopulationsMemo = memoizeOne(() => {
  return new Promise((resolve, reject) => {
    d3csv('assets/fips-pop-sta.csv')
      .then((popCsv) => {
        const popMap = processPopulations(popCsv);
        resolve(popMap);
      })
      .catch(reject);
  });
});

function processPopulations(pop) {
  const map = Object.assign({}, populationOverrides);
  pop.forEach((p) => {
    const fips = fipsRemapping[p.fips] || p.fips;
    if (populationOverrides[fips]) {
      map[fips] = populationOverrides[fips];
    } else {
      map[fips] = parseInt(p.pop);
    }
  });
  return map;
}

const fetchCountyPopulationsMemo = memoizeOne(() => {
  return new Promise((resolve, reject) => {
    d3csv('assets/fips-pop-cty.csv')
      .then((popCsv) => {
        const popMap = processPopulations(popCsv);
        resolve(popMap);
      })
      .catch(reject);
  });
});

function populateStateSelect(stateData) {
  if (populateStateSelect.populated) {
    return;
  }
  populateStateSelect.populated = true;

  const stateOptions = stateData
    .slice(0)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((s) => `<option value="${s.key}">${s.key}</option>`)
    .join('');
  $('#state-select').html(
    `<option value="all" selected>All States</option>${stateOptions}`
  );
  if (filters.state !== 'all') {
    $('#state-select').val(filters.state);
  }
}

const fetchStateDataMemo = memoizeOne((timeFilter) => {
  return new Promise((resolve, reject) => {
    const file = timeFilter === 'all' ? 'all' : '90d';
    Promise.all([
      d3csv(
        `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/state/${file}.csv`
      ),
      fetchStatePopulationsMemo(),
    ])
      .then(([csv, statePop]) => {
        processStates(csv, statePop);
        populateStateSelect(stateData);
        resolve();
      })
      .catch(reject);
  });
});

const fetchCountyDataMemo = memoizeOne((state, timeFilter) => {
  return new Promise((resolve, reject) => {
    // Need to fetch state data first to make sure state => fips mapping is ready
    fetchStateData()
      .then(() => {
        const timeDir = timeFilter === 'all' ? 'all' : '90d';
        const fips = stateToFipsMap[state];
        if (!fips) {
          reject(new Error(`Could not find fips for state ${state}`));
          return;
        }

        Promise.all([
          d3csv(
            `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/county/${timeDir}/${fips}.csv`
          ),
          fetchCountyPopulationsMemo(),
        ])
          .then(([csv, countyPop]) => {
            processCounties(csv, countyPop);
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});
