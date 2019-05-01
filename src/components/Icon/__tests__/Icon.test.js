import React from 'react';
import { mount } from 'enzyme';
import Icon from '../index';

describe('<Icon />', () => {
  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="target" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="off-target" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="on-target" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="trending-Up" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="trending-down" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="maximize" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="minimize" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="github" />);
    expect(wrapper).toMatchSnapshot();
  });
});
