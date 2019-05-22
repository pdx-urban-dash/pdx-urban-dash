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
  if (chartJson.chart_type === 'LINE') {
    const data = [];
    chartJson.data_sets.forEach((chartData) => {
      const values = [];
      chartData.data_values[0].map((e, i) => values.push({ x: e, y: chartData.data_values[1][i] }));
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
  } if (chartJson.chart_type.startsWith('BAR')) {
    const data = [];
    chartJson.data_sets.forEach((chartData) => {
      const values = [];
      chartData.data_values[0].map((e, i) => values.push({ x: e, y: chartData.data_values[1][i] }));
      data.push({
        dataSetName: chartData.title,
        barColor: chartData.color,
        description: chartData.description,
        values,
      });
    });
    fInput.data = data;
    if (chartJson.chart_type === 'BARCLUSTERED' || chartJson.chart_type === 'BAR') {
      return <BarChartClustered {...fInput} />;
    }
    if (chartJson.chart_type === 'BARSTACKED') {
      return <BarChartStacked {...fInput} />;
    }
    if (chartJson.chart_type === 'BARGROUPED') {
      return <BarChartGrouped {...fInput} />;
    }
  } else if (chartJson.chart_type.startsWith('DONUT')) {
    const data = [];
    chartJson.data_sets.forEach((chartData) => {
      chartData.data_values[0].map((e, i) => data.push(
        {
          color: e,
          name: chartData.data_values[1][i],
          value: chartData.data_values[2][i],
        },
      ));
    });
    fInput.data = data;
    return <DonutChart {...fInput} />;
  }

  return null;
};
