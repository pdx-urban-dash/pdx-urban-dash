import React from 'react';
import './App.css';
import DonutChart from './components/viz/DonutChart';

/**
 * Root level App component
 */
const App = () => (
  <div className="App">
    <DonutChart
      name="table"
      data={[
        {
          dataSetName: 'first',
          values: [
            { id: 0, field: 10 },
            { id: 1, field: 20 },
            { id: 2, field: 15 },
            { id: 3, field: 40 },
            { id: 4, field: 90 },
            { id: 5, field: 12 },
            { id: 6, field: 35 },
            { id: 7, field: 55 },
          ],
        },
      ]}
      // Refactor so transform is not required
      transform={[
        {
          type: 'pie',
          field: 'field',
          startAngle: 0,
          endAngle: 6.29,
          padAngle: 0,
          innerRadius: 50,
          cornerRadius: 0,
          sort: false,
        },
      ]}
      title="Chart Title"
      // colorScheme="dark"
    />
  </div>
);

export default App;
