/* eslint-disable no-trailing-spaces */
const { RESTDataSource } = require('apollo-datasource-rest');
// const fs = require('fs');
// const readline = require('readline');
const { google } = require('googleapis');
const R = require('ramda');

const { sheetID } = require('./sheetID');
const token = require('./token');
const credentials = require('./credentials');

// const TOKEN_PATH = 'token.json';
// this is actually the scope path? the actual api path is different
// const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
const API_PATH = 'https://sheets.googleapis.com/v4/spreadsheets/';

function genAuth() {
  const {
    client_secret,
    client_id,
    redirect_uris,
  } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0],
  );
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

function toColumn(num) {
  let range = '';
  while (num > 26) {
    range = range.concat(String.fromCharCode(64 + (Math.floor(num / 26))));
    num = (num % 26) + 1;
  }
  return range.concat(String.fromCharCode(64 + num));
}

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
    data.values = [chart[1], chart[2], chart[3]];
    return [data];      
  } 
  data = [];
  return chart.reduce((accum, curr, i) => {
    if (i % 3 === 0) {
      accum.push(attributeColumn(curr));
      return accum;
    } 
    accum[accum.length - 1].values.push(curr);
    return accum;
  }, data);
}

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
        spreadSheetID: sheetID,
        auth: genAuth(),
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
    return results.data.sheets.filter((x) => {
      if (x.properties.title === 'DonutTemplate'
            || x.properties.title === 'BarTemplate'
          || x.properties.title === 'LineTemplate') {
        return false;
      }
      return true;
    }).map(x => ({
      title: x.properties.title,
      gridProperties: x.properties.gridProperties,
    }));
  }

  async getCharts() {
    const titles = await this.getChartTitles();
    const ranges = titles.map(chart => `${chart.title}!A1:${toColumn(chart.gridProperties.columnCount)}${chart.gridProperties.rowCount}`);
    const request = {
      spreadSheetID: sheetID,
      auth: genAuth(),
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

export default GoogleSheetsAPI;
