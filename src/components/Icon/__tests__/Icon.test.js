import React from 'react';
import { mount } from 'enzyme';

import Icon from '../index';

describe('<Icon />', () => {
  test('Icon renders target', () => {
    const wrapper = mount(<Icon type="target" />);
    expect(wrapper).toMatchSnapshot();
  });
});
