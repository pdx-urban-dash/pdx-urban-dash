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
            values: [
              { id: 0, field: 10 },
            ],
          },
          {
            dataSetName: 'second slice',
            description: 'second description',
            values: [
              { id: 1, field: 10 },
            ],
          },
          {
            dataSetName: 'third slice',
            description: 'third description',
            values: [
              { id: 2, field: 10 },
            ],
          },
          {
            dataSetName: 'fourth slice',
            description: 'fourth description',
            values: [
              { id: 3, field: 10 },
            ],
          },
        ]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
