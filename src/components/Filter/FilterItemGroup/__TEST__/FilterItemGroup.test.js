import React from 'react';
import { shallow } from 'enzyme';
import FilterItemGroup from '../index';

const testFunc = () => { console.log(); };

describe('FilterItemGroup', () => {
  test('snapshot', () => {
    const wrapper = shallow(<FilterItemGroup title={'test'}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
