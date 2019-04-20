import React from 'react';
import { shallow } from 'enzyme';
import DonutChart from '../index';

describe('<DonutChart />', () => {
  test('snapshot', () => {
    const wrapper = shallow(
      <DonutChart
        title="title"
        className=""
        colorScheme="light"
        data={[
          {
            dataSetName: 'first slice',
            description: 'first description',
            value: 10,
          },
          {
            dataSetName: 'second slice',
            description: 'second description',
            value: 10,
          },
          {
            dataSetName: 'third slice',
            description: 'third description',
            value: 10,
          },
          {
            dataSetName: 'fourth slice',
            description: 'fourth description',
            value: 10,
          },
        ]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
