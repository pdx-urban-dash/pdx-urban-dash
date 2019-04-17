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
    );
    expect(wrapper).toMatchSnapshot();
  });
});
