import React from 'react';
import './App.css';
import LineChart from './components/viz/LineChart';

/**
 * Root level App component
 */
const App = () => (
  <div className="App">
    <LineChart
      data={[
        {
          dataSetName: 'first',
          values: [
            { x: 0, y: 10 },
            { x: 1, y: 20 },
            { x: 2, y: 15 },
            { x: 3, y: 40 },
          ],
        },
        {
          dataSetName: 'second',
          values: [
            { x: 0, y: 20 },
            { x: 1, y: 30 },
            { x: 2, y: 19 },
            { x: 3, y: 50 },
          ],
        },
      ]}
      //colorScheme="dark"
    />
  </div>
);

export default App;
