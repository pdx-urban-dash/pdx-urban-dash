import React from 'react';
import { mount } from 'enzyme';

import Icon from '../index';

describe('<Icon />', () => {
  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="target" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Icon />', () => {
  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="off-target" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Icon />', () => {
  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="on-target" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Icon />', () => {
  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="TrendingUp" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Icon />', () => {
  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="TrendingDown" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Icon />', () => {
  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="Maximize" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Icon />', () => {
  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="Minimize" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Icon />', () => {
  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="Github" />);
    expect(wrapper).toMatchSnapshot();
  });
});
    
    
  
