import React from 'react';
import BarChartStacked from './components/viz/BarCharts/BarChartStacked';
import BarChartClustered from './components/viz/BarCharts/BarChartClustered';
import BarChartGrouped from './components/viz/BarCharts/BarChartGrouped';

/**
 * Root level App component
 */
const App = () => (
  <div className="App">
    <BarChartClustered
      data={[
        {
          dataSetName: 'first',
          description: 'this is first',
          values: [
            { x: 0, y: 10 },
            { x: 1, y: 20 },
            { x: 2, y: 15 },
            { x: 3, y: 40 },
          ],
        },
        {
          dataSetName: 'second',
          description: 'this is second',
          values: [
            { x: 0, y: 20 },
            { x: 1, y: 30 },
            { x: 2, y: 19 },
            { x: 3, y: 50 },
          ],
        },
        {
          dataSetName: 'third',
          description: 'this is third',
          values: [
            { x: 0, y: 25 },
            { x: 1, y: 33 },
            { x: 2, y: 11 },
            { x: 3, y: 40 },
          ],
        },
      ]}
      //colorScheme="dark"
    />
    <BarChartGrouped
      data={[
        {
          dataSetName: 'first',
          description: 'this is first',
          values: [
            { x: 0, y: 10 },
            { x: 1, y: 20 },
            { x: 2, y: 15 },
            { x: 3, y: 40 },
          ],
        },
        {
          dataSetName: 'second',
          description: 'this is second',
          values: [
            { x: 0, y: 20 },
            { x: 1, y: 30 },
            { x: 2, y: 19 },
            { x: 3, y: 50 },
          ],
        },
        {
          dataSetName: 'third',
          description: 'this is third',
          values: [
            { x: 0, y: 25 },
            { x: 1, y: 33 },
            { x: 2, y: 11 },
            { x: 3, y: 40 },
          ],
        },
      ]}
      //colorScheme="dark"
    />

    <BarChartStacked
      data={[
        {
          dataSetName: 'first',
          description: 'this is first',
          values: [
            { x: 0, y: 10 },
            { x: 1, y: 20 },
            { x: 2, y: 15 },
            { x: 3, y: 40 },
          ],
        },
        {
          dataSetName: 'second',
          description: 'this is second',
          values: [
            { x: 0, y: 20 },
            { x: 1, y: 30 },
            { x: 2, y: 19 },
            { x: 3, y: 50 },
          ],
        },
        {
          dataSetName: 'third',
          description: 'this is third',
          values: [
            { x: 0, y: 25 },
            { x: 1, y: 33 },
            { x: 2, y: 11 },
            { x: 3, y: 40 },
          ],
        },
      ]}
      //colorScheme="dark"
    />
  </div>
);

export default App;
