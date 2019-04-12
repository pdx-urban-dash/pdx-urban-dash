import React from 'react';
import './App.css';
import DonutChart from './components/viz/DonutChart';

/**
 * Root level App component
 */
const App = () => (
  <div className="App">
    <DonutChart
      title="donut-chart title"
      data={[
        {
          values: [
            { id: 0, field: 100 },
            { id: 1, field: 50 },
            { id: 2, field: 25 },
            { id: 3, field: 10 },
            { id: 4, field: 75 },
          ],
        },
      ]}
    />
  </div>
);

export default App;
