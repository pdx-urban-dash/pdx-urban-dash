import React from 'react';
import './App.css';
import DonutChart from './components/viz/DonutChart';

/**
 * Root level App component
 */
const App = () => (
  <div className="App">
    <DonutChart
      data={[
        {
          dataSetName: 'first',
          description: 'this is first',
          values: [
            { id: 0, field: 15 },
            { id: 1, field: 15 },
            { id: 2, field: 15 },
            { id: 3, field: 15 },
            { id: 4, field: 15 },
            { id: 5, field: 15 },
          ],
        },
      ]}
    />
  </div>
);

export default App;
