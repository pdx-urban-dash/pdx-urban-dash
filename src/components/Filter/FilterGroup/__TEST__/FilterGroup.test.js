import React from 'react';
import { shallow } from 'enzyme';
import FilterGroup from '../index';

const testFunc = () => { console.log(); };

describe('FilterGroup Render', () => {
  test('snapshot', () => {
    const wrapper = shallow(<FilterGroup title={'test'}><p>test</p></FilterGroup>);
    expect(wrapper).toMatchSnapshot();
  });
});
