import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  // Card, CardText, CardBody, CardTitle,
  Row,
} from 'reactstrap';
import LineChart from './components/viz/LineChart';
import {
  FilterWrapper,
} from './components/Filter/FilterComponents';

const testData = [
  {
    category: 'Trending Up',
    dataSetName: 'Police',
    description: 'this is first',
    values: [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
      { x: 2, y: 15 },
      { x: 3, y: 40 },
    ],
  },
  {
    category: 'On Target',
    dataSetName: 'Fire',
    description: 'this is second',
    values: [
      { x: 0, y: 20 },
      { x: 1, y: 30 },
      { x: 2, y: 19 },
      { x: 3, y: 50 },
    ],
  },
  {
    category: 'On Target',
    dataSetName: 'Parks and Rec.',
    description: 'this is first',
    values: [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
      { x: 2, y: 15 },
      { x: 3, y: 40 },
    ],
  },
  {
    category: 'On Target',
    dataSetName: '911',
    description: 'this is second',
    values: [
      { x: 0, y: 20 },
      { x: 1, y: 30 },
      { x: 2, y: 19 },
      { x: 3, y: 50 },
    ],
  },
];

const testTitle = 'chart title';

ReactDOM.render(
  <Fragment>
    <Row>
      <FilterWrapper data={testData} title="Filter" />
    </Row>
    <Row>
      <LineChart data={testData} title={testTitle} />
      <LineChart data={testData} title={testTitle} />
      <LineChart data={testData} title={testTitle} />
      <LineChart data={testData} title={testTitle} />
      <LineChart data={testData} title={testTitle} />
      <LineChart data={testData} title={testTitle} />
      <LineChart data={testData} title={testTitle} />
    </Row>
  </Fragment>,
  document.getElementById('root'),
);
