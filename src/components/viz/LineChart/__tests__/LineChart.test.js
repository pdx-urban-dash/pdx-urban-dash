import React from 'react';
import { shallow } from 'enzyme';
import LineChart from '../index';
import { trend } from '../../../../constants';

describe('<LineChart />', () => {
  test('snapshot', () => {
    const wrapper = shallow(
      <LineChart
        data={[
          {
            dataSetName: 'first',
            description: 'this is first',
            lineColor: 'red',
            showTrendLine: true,
            values: [
              { x: 0, y: 10 },
              { x: 1, y: 20 },
              { x: 2, y: 15 },
              { x: 3, y: 40 },
            ],
          },
          {
            dataSetName: 'second',
            lineColor: 'blue',
            description: 'this is second',
            values: [
              { x: 0, y: 20 },
              { x: 1, y: 30 },
              { x: 2, y: 19 },
              { x: 3, y: 50 },
            ],
          },
        ]}
        trending={trend.up}
        onTarget={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
