import React from 'react';
import { shallow } from 'enzyme';
import BarChartClustered from '../index';

const testData = [
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
];

const testTitle = 'chart title';
const testIcon = 'trending-up';
const testIconSize = 'md';

describe('<BarChartClustered />', () => {
  test('snapshot', () => {
    const wrapper = shallow(<BarChartClustered data={testData} title={testTitle} iconType={testIcon} iconSize={testIconSize} />);
    expect(wrapper).toMatchSnapshot();
  });
});
