import React from 'react';
import { shallow } from 'enzyme';
import FilterSelectGroup from '../index';


describe('FilterSelectGroup', () => {
  test('snapshot', () => {
    const component = shallow(<FilterSelectGroup title="test" />);
    expect(component).toMatchSnapshot();
  });
});
