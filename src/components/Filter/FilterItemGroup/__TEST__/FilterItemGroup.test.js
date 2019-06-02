import React from 'react';
import { shallow } from 'enzyme';
import FilterItemGroup from '../index';

describe('FilterItemGroup', () => {
  test('snapshot', () => {
    const component = shallow(<FilterItemGroup title="test" />);
    expect(component).toMatchSnapshot();
  });
});
