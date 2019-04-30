import React from 'react';
import { colors } from '../constants';
import LineChart from '../components/viz/LineChart';
import { BarChartStacked, BarChartClustered, BarChartGrouped } from '../components/viz/BarCharts/BarCharts';
import { DonutChart } from '../components/viz/DonutChart';

// eslint-disable-next-line import /prefer-default-export
export const genChart = (chartJson, colorScheme, className) => {
  if (chartJson === undefined) {
    return null;
  }
  const fInput = { title: chartJson.title, colorScheme, className };
  if (chartJson.chart_type === 'LINE') {
    const data = [];
    chartJson.data_sets.forEach((chartData) => {
      const values = [];
      chartData.data_values[0].map((e, i) => values.push({ x: e, y: chartData.data_values[1][i] }));
      console.log(values);
      data.push({
        dataSetName: chartData.title,
        lineColor: chartData.color,
        description: chartData.description,
        showTrendLine: chartData.show_trendLine,
        values,
      });
    });
    fInput.data = data;
    return <LineChart {...fInput} />;
  }
  if (chartJson.chart_type.startsWith('BAR')) {
    const data = [];
    chartJson.data_sets.forEach((chartData) => {
      const values = [];
      chartData.data_values[0].map((e, i) => values.push({ x: e, y: chartData.data_values[1][i] }));
      console.log(values);
      data.push({
        dataSetName: chartData.title,
        barColor: chartData.color,
        description: chartData.description,
        values,
      });
    });
    fInput.data = data;
    if (chartJson.chart_type === 'BARCLUSTERED') {
      return <BarChartClustered {...fInput} />;
    }
    if (chartJson.chart_type === 'BARSTACKED') {
      return <BarChartStacked {...fInput} />;
    }
    if (chartJson.chart_type === 'BARGROUPED') {
      return <BarChartGrouped {...fInput} />;
    }
  }
};
