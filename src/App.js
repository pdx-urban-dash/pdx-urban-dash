import React from 'react';
import './App.css';
import DonutChart from './components/viz/DonutChart';

/**
 * Root level App component
 */
const App = () => (
  <div className="App">
    <DonutChart
      title="chart title"
      data={[
        {
          values: [
            { id: 'ID one', field: 90 },
            { id: 'ID two', field: 50 },
            { id: 'ID three', field: 25 },
          ],
        },
      ]}
    />
  </div>
);

export default App;
