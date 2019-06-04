const { RESTDataSource } = require('apollo-datasource-rest');
const { google } = require('googleapis');
const R = require('ramda');

const { SHEET_ID, CLIENT_EMAIL } = process.env;
const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const API_PATH = 'https://sheets.googleapis.com/v4/spreadsheets/';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
const jwt = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, [SCOPE]);

// turns integers into column notation
// ie: 1=>A, 26=>Z, 27=>AA, etc
function toColumn(num) {
  let range = '';
  while (num > 26) {
    range = range.concat(String.fromCharCode(64 + (Math.floor(num / 26))));
    num = (num % 26) + 1;
  }
  return range.concat(String.fromCharCode(64 + num));
}

function getTrendSlope(points) {
  const n = points.length;
  const sumOfProducts = points.reduce((acc, val) => acc + (val.x * val.y), 0);
  const sumOfX = points.reduce((acc, val) => acc + val.x, 0);
  const sumOfY = points.reduce((acc, val) => acc + val.y, 0);
  const sumOfXsq = points.reduce((acc, val) => (acc + (val.x ** 2)), 0);

  return ((n * sumOfProducts) - (sumOfX * sumOfY)) / ((n * sumOfXsq) - (sumOfX ** 2));
}

// Grabs info from sheets and processes it into the expected schema
function dataSetProcessor(chart, type) {
  const attributeColumn = attr => ({
    title: attr[0],
    description: attr[1],
    metaData: attr[2],
    color: attr[3],
    showTrendLine: attr[4],
    values: [],
  });
  let data;
  chart = R.transpose(chart).slice(1);
  if (type === 'DONUT') {
    data = attributeColumn(chart[0]);
    data.showTrendLine = data.showTrendLine === 'TRUE';
    data.values = [chart[1], chart[2], chart[3]];
    return [data];
  }
  data = [];
  return chart.reduce((accum, curr, i) => {
    if (i % 3 === 0) {
      const column = attributeColumn(curr);
      column.showTrendLine = column.showTrendLine === 'TRUE';
      accum.push(column);
      return accum;
    }
    accum[accum.length - 1].values.push(curr);
    return accum;
  }, data);
}

// Takes values from sheets that support multiple data sets and processes
function valueProcessor(data) {
  const chart = {
    metaData: data.values[6][1],
    title: data.values[3][1],
    description: data.values[4][1],
    type: data.values[0][0].split(' ')[0],
    categories: data.values[11].slice(1), // remove first item
    target: data.values[7][1],
    targetTrend: data.values[8][1],
  };
  chart.axisLabels = chart.type === 'DONUT' ? [data.values[9][1]] : [data.values[9][1], data.values[10][1]];
  chart.dataSets = dataSetProcessor(data.values.slice(14), chart.type);
  if (chart.type !== 'DONUT') {
    let avgSlope = chart.dataSets
      .map((set) => {
        const points = set.values[0].map((val, i) => ({
          // eslint-disable-next-line no-restricted-globals
          x: isNaN(val) ? i : parseInt(val, 10),
          y: parseInt(set.values[1][i], 10),
        }));
        return getTrendSlope(points);
      })
      .reduce((acc, val) => val + acc, 0);
    avgSlope /= chart.dataSets.length;
    if (avgSlope > 0) chart.trending = 'UP';
    else if (avgSlope < 0) chart.trending = 'DOWN';
    else chart.trending = 'NEUTRAL';
  }
  return chart;
}

class GoogleSheetsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = API_PATH;
    this.sheets = google.sheets('v4');
  }

  async getChartTitles() {
    const retrieveData = new Promise(((resolve, reject) => {
      const request = {
        spreadsheetId: SHEET_ID,
        auth: jwt,
        range: [],
        includeGridData: false,
      };
      this.sheets.spreadsheets.get(request, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(response);
      });
    }));
    const results = await retrieveData;
    return results.data.sheets.filter(x => !(x.properties.title === 'DonutTemplate'
        || x.properties.title === 'BarTemplate'
        || x.properties.title === 'LineTemplate'))
      .map(x => ({
        title: x.properties.title,
        gridProperties: x.properties.gridProperties,
      }));
  }

  async getCharts() {
    const titles = await this.getChartTitles();
    const ranges = titles.map(chart => `${chart.title}!A1:${toColumn(chart.gridProperties.columnCount)}${chart.gridProperties.rowCount}`);
    const request = {
      spreadsheetId: SHEET_ID,
      auth: jwt,
      ranges,
    };
    const retrieveData = new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values.batchGet(request, (err, response) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(response.data.valueRanges);
      });
    });
    const results = await retrieveData;
    return results.map(valueProcessor);
  }
}

module.exports = { GoogleSheetsAPI };
