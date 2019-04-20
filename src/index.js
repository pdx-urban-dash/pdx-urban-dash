import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DonutChart from './components/viz/DonutChart';

ReactDOM.render(
  <DonutChart
    data={[
      {
        name: 'first',
        description: 'the first one',
        value: 20,
      },
      {
        name: 'second',
        description: 'the second one',
        value: 20,
      },
      {
        name: 'third',
        description: 'the third one',
        value: 20,
      },
      {
        name: 'fourth',
        description: 'the fourth one',
        value: 20,
      },
    ]}
    title="My Chart Title"
  />,
  document.getElementById('root'),
);
