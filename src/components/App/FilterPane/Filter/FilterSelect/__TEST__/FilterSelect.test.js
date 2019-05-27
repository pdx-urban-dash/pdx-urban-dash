import React from 'react';
import { shallow } from 'enzyme';
import FilterSelect from '../index';

describe('FilterSelect Render', () => {
  test('snapshot', () => {
    const mockCallBack = jest.fn();
    const component = shallow(<FilterSelect title="testT" category="testC" callback={mockCallBack} />);
    expect(component).toMatchSnapshot();
  });

  it('Simulate click', () => {
    const mockCallBack = jest.fn();
    const component = shallow(<FilterSelect title="testT" category="testC" callback={mockCallBack} />);
    component.find('h5').simulate('click');
    expect(mockCallBack).toHaveBeenCalledWith({ title: 'testT', category: 'testC' });
  });
});
