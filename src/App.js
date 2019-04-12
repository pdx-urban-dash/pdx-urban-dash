import React from 'react';
import './App.css';
// import DonutChart from './components/viz/DonutChart';
import DonutChartPercentage from './components/viz/DonutChartPercentage';

/**
 * Root level App component
 */
const App = () => (
  <div className="App">
    <DonutChartPercentage
      title="percentage chart"
      className=""
      color="black"
      description="this chart shows a percentage of a value to a target"
      value="33"
      target="75"
    />
  </div>
);

export default App;
