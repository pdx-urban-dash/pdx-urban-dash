import React from 'react';
import { colors } from '../constants';
import LineChart from '../components/viz/LineChart';

// eslint-disable-next-line import /prefer-default-export
export const genChart = (chartJson, colorScheme) => {
  if (chartJson === undefined) {
    return null;
  }
  if (chartJson.chart_type === 'LINE') {
    const data = [];
    chartJson.data_sets.forEach((chartData) => {
      const values = []
      chartData.data_values[0].map((e, i) => values.push({x: e, y: chartData.data_values[1][i]}));
      console.log(values);
      data.push({
        dataSetName: chartData.title,
        lineColor: chartData.color,
        description: chartData.description,
        showTrendLine: chartData.show_trendLine,
        values,
      });
    });
    const fInput = { title: chartJson.title, colorScheme, data };
    return <LineChart {...fInput} />;
  }
};
