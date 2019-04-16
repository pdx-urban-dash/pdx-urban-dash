import React from 'react';
import './App.css';
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
      target="75"
      value="40"
    />
  </div>
);

export default App;
