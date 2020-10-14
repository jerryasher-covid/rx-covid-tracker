  if (filters.state === 'all') {
    fetchAndRenderStates();
  } else {
    fetchAndRenderCounties(filters.state);
  }


filters.state == all

    fetchAndRenderStates();
    ----------
    startLoading();
    fetchStateData()
        fetchStateDataMemo
  const fetchStateDataMemo = memoizeOne((timeFilter) => {
      Promise.all([
        d3csv(
          `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/state/${file}.csv`
        ),
        fetchStatePopulationsMemo(),
      ])
      d3csv('assets/fips-pop-sta.csv')
        .then(([csv, statePop]) => {
          processStates(csv, statePop);
          populateStateSelect(stateData);
          resolve();
        })
  });
        renderAllStates();
        completeLoading();

else

    fetchAndRenderCounties(filters.state);
    startLoading();
    fetchCountyData(state)
        fetchCountyDataMemo(state, filters.time);
            fetchStateData()
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
                d3csv('assets/fips-pop-cty.csv')
                const popMap = processPopulations(popCsv);
          resolve(popMap);





          ])
            .then(([csv, countyPop]) => {
              processCounties(csv, countyPop);




        renderCounties(state);
        completeLoading();
      })
