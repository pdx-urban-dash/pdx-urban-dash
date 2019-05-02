import React from 'react';
import { shallow } from 'enzyme';
import DonutChart from '../index';

const testIcon = 'trending-up';
const testIconSize = 'md';

describe('<DonutChart />', () => {
  test('snapshot', () => {
    const wrapper = shallow(
      <DonutChart
        title="title"
        className=""
        colorScheme="light"
        data={[
          {
            name: 'first slice',
            description: 'first description',
            value: 10,
          },
          {
            name: 'second slice',
            description: 'second description',
            value: 10,
          },
          {
            name: 'third slice',
            description: 'third description',
            value: 10,
          },
          {
            name: 'fourth slice',
            description: 'fourth description',
            value: 10,
          },
          {
            name: 'fifth slice',
            description: 'fifth description',
            value: 10,
          },
          {
            name: 'sixth slice',
            description: 'sixth description',
            value: 10,
          },
          {
            name: 'seventh slice',
            description: 'seventh description',
            value: 10,
          },
          {
            name: 'eighth slice',
            description: 'eighth description',
            value: 10,
          },
          {
            name: 'ninth slice',
            description: 'ninth description',
            value: 10,
          },
          {
            name: 'tenth slice',
            description: 'tenth description',
            value: 10,
          },
          {
            name: 'eleventh slice',
            description: 'eleventh description',
            value: 10,
          },
          {
            name: 'twelveth slice',
            description: 'twelveth description',
            value: 10,
          },
        ]}
        iconType={testIcon} 
        iconSize={testIconSize}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
