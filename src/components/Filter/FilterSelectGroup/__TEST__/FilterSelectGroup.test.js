import React from 'react';
import { shallow } from 'enzyme';
import FilterSelectGroup from '../index';

const testFunc = () => { console.log(); };

describe('FilterSelectGroup Render', () => {
  test('snapshot', () => {
    const wrapper = shallow(<FilterSelectGroup title={'test'}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
