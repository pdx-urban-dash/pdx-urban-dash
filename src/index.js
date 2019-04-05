import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import BarChart from './BarChart';


ReactDOM.render(<App />, document.getElementById('root'));
const barData = {
  table: [
    { category: 'A', amount: 28 },
    { category: 'B', amount: 55 },
    { category: 'C', amount: 43 },
    { category: 'D', amount: 91 },
    { category: 'E', amount: 81 },
    { category: 'F', amount: 53 },
    { category: 'G', amount: 19 },
    { category: 'H', amount: 87 },
  ],
};

const barData2 = {
  table: [
    { category: 'A', amount: 28 },
    { category: 'B', amount: 55 },
    { category: 'C', amount: 43 },
  ],
};


function handleHover(...args) {
  console.log(args);
}

ReactDOM.render(
  <BarChart data={barData} onSignalHover={handleHover} />,
  document.getElementById('bar-container1'),
);
ReactDOM.render(
  <BarChart data={barData2} width={100} height={200} onSignalHover={handleHover} />,
  document.getElementById('bar-container2'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
