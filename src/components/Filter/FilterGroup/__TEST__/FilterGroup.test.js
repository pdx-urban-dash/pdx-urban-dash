import React from 'react';
import { shallow } from 'enzyme';
import FilterGroup from '../index';

describe('FilterGroup Render', () => {
  test('snapshot', () => {
    const component = shallow(<FilterGroup title="test"><p>test</p></FilterGroup>);
    expect(component).toMatchSnapshot();
  });
});
