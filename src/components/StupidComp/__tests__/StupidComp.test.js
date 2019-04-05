import React from 'react';
import enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import StupidComp from '../index';

// setup file

enzyme.configure({ adapter: new Adapter() });

describe('StupidComp', () => {
  test('renders to the dom', () => {
    const wrapper = shallow(
      <StupidComp />,
    );
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });
  test('print input value to screen', () => {
    const wrapper = shallow(
      <StupidComp />,
    );
    wrapper.find('input').first().simulate('change', { target: { value: 'test' } });
    wrapper.find('button').first().simulate('click');
    expect(wrapper.find('.stupidcomp-bad').text()).toBe('test');
  });
});
