import React from 'react';
<<<<<<< HEAD
=======
import DonutChart from './components/viz/DonutChart';
>>>>>>> 43833c2510545533448b3592e9bdf129403948b3

/**
 * Root level App component
 */
<<<<<<< HEAD
const App = () => (<div />);
=======
const App = () => (
  <div className="App">
    <DonutChart
      title="title"
      className=""
      colorScheme="light"
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
    />,
  </div>
);
>>>>>>> 43833c2510545533448b3592e9bdf129403948b3

export default App;
