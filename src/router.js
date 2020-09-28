////////////
// Router //
////////////

const filterKeys = {
  state: 'state',
  field: 'field',
  time: 'time',
  useLog: 'log',
  per100k: 'per100k',
  consistentY: 'consistentY',
};
const filterDefaults = {
  state: 'all',
  field: 'newCases',
  time: '14d',
  useLog: false,
  per100k: false,
  consistentY: true,
};

class Router {
  constructor(hist) {
    this.history = hist;
    this.history.listen(() => {
      // Update filter state variables and re-render
      this.parse();
      if (filters.state === 'all') {
        fetchAndRenderStates();
      } else {
        fetchAndRenderCounties(filters.state);
      }
    });
  }

  parse(firstParse = false) {
    const qs = parseQs(this.history.location.search);
    const keys = Object.keys(filterKeys);

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const qsKey = filterKeys[k];
      let v =
        qs[qsKey] != undefined ? qs[qsKey] : filterDefaults[k];
      // Coerce boolean filter values from string to boolean
      if (
        typeof filterDefaults[k] === 'boolean' &&
        typeof v === 'string'
      ) {
        v = v === '1';
      }
      if (filters[k] === v && !firstParse) {
        continue;
      }
      switch (k) {
        case 'state': {
          // Somehow URLs with plus instead of space are being used
          v = v.replace('+', ' ');
          filters.state = v;
          $('#state-select').val(v);
          break;
        }
        case 'field': {
          if (dataPointLabels[v]) {
            filters.field = v;
            $('#field-select').val(v);

            isTestingData =
              filters.field === 'tests' ||
              filters.field === 'newTests';
            if (isTestingData) {
              // Disable useLog if switching to testing data
              filters.useLog = false;
              $('#cb-use-log-scale').prop('checked', false);
              qs[filterKeys.useLog] = '0';

              $('.testing-legend').show();
              $('#filter-use-log-scale').hide();
            } else {
              $('.testing-legend').hide();
              $('#filter-use-log-scale').show();
            }
            if (v === 'newCases' || v === 'newDeaths') {
              $('.ma-legend .legend-field-label').text(
                dataPointLabels[v]
              );
              $('.ma-legend').show();
            } else {
              $('.ma-legend').hide();
            }
          }
          break;
        }
        case 'time': {
          filters.time = v;
          $('#time-select').val(v);
          break;
        }
        case 'useLog': {
          filters.useLog = v;
          $('#cb-use-log-scale').prop('checked', v);
          break;
        }
        case 'per100k': {
          filters.per100k = v;
          $('#cb-per-100k').prop('checked', v);
          break;
        }
        case 'consistentY': {
          filters.consistentY = v;
          $('#cb-consistent-y').prop('checked', v);
          break;
        }
      }
    }
  }

  push(obj) {
    this._update('push', obj);
  }

  replace(obj) {
    this._update('replace', obj);
  }

  _update(action, obj) {
    const query = {
      ...parseQs(this.history.location.search),
      ...obj,
    };
    this.history[action]({
      search: stringifyQs(query),
    });
  }
}

function parseQs(qs) {
  const query = qs[0] === '?' ? qs.substring(1) : qs;
  const vars = query ? query.split('&') : [];
  const obj = {};
  for (let i = 0; i < vars.length; i++) {
    const [k, v] = vars[i].split('=').map(decodeURIComponent);
    obj[k] = v;
  }
  return obj;
}
function stringifyQs(obj) {
  const result = Object.keys(obj)
    .map(k => {
      return `${encodeURIComponent(k)}=${encodeURIComponent(
        obj[k]
      )}`;
    })
    .join('&');
  return result ? `?${result}` : '';
}
export const router = new Router(
  history.createBrowserHistory()
);
router.parse(true);
