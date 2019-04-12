import React from 'react';
import { BarChartStacked, BarChartClustered, BarChartGrouped } from './components/viz/BarCharts/BarCharts.js';

/**
 * Root level App component
 */
const testData = [
  {
    dataSetName: 'Total Crimes Against Persons',
    description: 'Police Bureau, public safety',
    values: [
      { x: "January", y: 1 },
      { x: "February", y: 20 },
      { x: "March", y: 15 },
      { x: "April", y: 40 },
    ],
  },
  {
    dataSetName: 'Total property offenses',
    description: 'Police Bureau, public safety',
    values: [
      { x: "January", y: 3 },
      { x: "February", y: 5 },
      { x: "March", y: 2 },
      { x: "April", y: 1 },
    ],
  },
]

const App = () => (
  <div className="App">
    <BarChartClustered data={testData}/>
    <BarChartGrouped data={testData}/>
    <BarChartStacked data={testData}/>
  </div>
);

export default App;