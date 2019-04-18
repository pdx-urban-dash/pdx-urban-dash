import React from 'react';
import { shallow } from 'enzyme';
import DonutChartPercentage from '../index';


describe('<LineChart />', () => {
  test('snapshot', () => {
    const wrapper = shallow(
      <DonutChartPercentage
        title="percentage chart"
        className=""
        color="black"
        description="this chart shows a percentage of a value to a target"
        target={75}
        value={40}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
