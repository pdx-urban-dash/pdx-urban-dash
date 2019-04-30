import React from 'react';
import { genChart } from './utils/chartUtils';
import LineChart from './components/viz/LineChart';

/**
 * Root level App component
 */
const chartJson = {
    target_trend: 'UP',
    target: 100,
    title: 'dummy line graph',
    axis_labels: [
      'x',
      'y',
    ],
    chart_type: 'LINE',
    data_sets: [
      {
        show_trendline: true,
        description: 'first datapoint',
        title: 'line1',
        color: 'RED',
        data_values: [
          [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
          ],
          [
            2, 5, 1, 6, 8, 9, 3, 4, 7, 8,
          ],
        ],
        metadata: '',
      },
    ],
}
const Chart = genChart(chartJson);
const App = () => (<Chart/>);
/*
const data = {
    values: [{x: 1, y:2}, {x: 2, y: 3}]
}
const App = () => (<LineChart
        data={[
          {
            dataSetName: 'first',
            description: 'this is first',
            lineColor: 'red',
            showTrendLine: true,
            values: [
              { x: 0, y: 10 },
              { x: 1, y: 20 },
              { x: 2, y: 15 },
              { x: 3, y: 40 },
            ],
          },
          {
            dataSetName: 'second',
            lineColor: 'blue',
            description: 'this is second',
            values: [
              { x: 0, y: 20 },
              { x: 1, y: 30 },
              { x: 2, y: 19 },
              { x: 3, y: 50 },
            ],
          },
        ]}
      />
);
*/

export default App;
