1
  function fetchMapData() {
    if (!fetchMapData.promise) {
      fetchMapData.promise = d3json('assets/us-counties.topojson').then(

2 
  const fetchStatePopulationsMemo = memoizeOne(() => {
    return new Promise((resolve, reject) => {
      d3csv('assets/fips-pop-sta.csv')

3
  const fetchCountyPopulationsMemo = memoizeOne(() => {
    return new Promise((resolve, reject) => {
      d3csv('assets/fips-pop-cty.csv')

4
  const fetchStateDataMemo = memoizeOne((timeFilter) => {
    return new Promise((resolve, reject) => {
      const file = timeFilter === 'all' ? 'all' : '90d';
      Promise.all([
        d3csv(
          `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/state/${file}.csv`
        ),

5
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


####################

call-stacks

fetchMapData::


  render
	fetchMapData().then(() => {

fetchStatePopulationsMemo::

  fetchStateDataMemo = memoizeOne((timeFilter) => {
	Promise.all([
        d3csv(
          `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/state/${file}.csv`
        ),
	fetchStatePopulationsMemo(),

fetchCountyPopulationsMemo::

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


fetchStateDataMemo::

  function fetchStateData() {
    return fetchStateDataMemo(filters.time);
  }

fetchCountyDataMemo::

  function fetchCountyData(state) {
    return fetchCountyDataMemo(state, filters.time);
  }


  function fetchStateData() {
    return fetchStateDataMemo(filters.time);
  }

  function fetchCountyData(state) {
    return fetchCountyDataMemo(state, filters.time);
  }


fetchCountyDataMemo = memoizeOne((state, timeFilter) => {
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
