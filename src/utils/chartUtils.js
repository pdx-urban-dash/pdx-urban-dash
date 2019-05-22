import React from 'react';
import LineChart from '../components/viz/LineChart';
import { BarChartStacked, BarChartClustered, BarChartGrouped } from '../components/viz/BarCharts/BarCharts';
import DonutChart from '../components/viz/DonutChart';

// eslint-disable-next-line import/prefer-default-export
export const genChart = (chartJson, colorScheme, className) => {
  if (chartJson === undefined) {
    return null;
  }
  // All charts use these elements
  const fInput = { title: chartJson.title, colorScheme, className };
  if (chartJson.type === 'LINE') {
    const data = [];
    chartJson.dataSets.forEach((chartData) => {
      const values = [];
      chartData.values[0].map((e, i) => values.push({ x: e, y: chartData.values[1][i] }));
      data.push({
        dataSetName: chartData.title,
        lineColor: chartData.color,
        description: chartData.description,
        showTrendLine: chartData.showTrendLine,
        values,
      });
    });
    fInput.data = data;
    return <LineChart {...fInput} />;
  } if (chartJson.type.startsWith('BAR')) {
    const data = [];
    chartJson.dataSets.forEach((chartData) => {
      const values = [];
      chartData.values[0].map((e, i) => values.push({ x: e, y: chartData.values[1][i] }));
      data.push({
        dataSetName: chartData.title,
        barColor: chartData.color,
        description: chartData.description,
        values,
      });
    });
    fInput.data = data;
    if (chartJson.type === 'BARCLUSTERED') {
      return <BarChartClustered {...fInput} />;
    }
    if (chartJson.type === 'BARSTACKED') {
      return <BarChartStacked {...fInput} />;
    }
    if (chartJson.type === 'BARGROUPED') {
      return <BarChartGrouped {...fInput} />;
    }
  } else if (chartJson.type.startsWith('DONUT')) {
    const data = [];
    chartJson.dataSets.forEach((chartData) => {
      chartData.values[0].map((e, i) => data.push(
        {
          color: e,
          name: chartData.values[1][i],
          value: chartData.values[2][i],
        },
      ));
    });
    fInput.data = data;
    return <DonutChart {...fInput} />;
  }

  return null;
};
