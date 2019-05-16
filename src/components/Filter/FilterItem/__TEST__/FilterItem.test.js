import React from 'react';
import { mount, shallow } from 'enzyme';
import FilterItem from '../index';
import PropTypes from "prop-types";

const testFunc = () => { console.log(); };

describe('FilterItem', () => {
  test('render unselected', () => {
    const component = shallow(<FilterItem title={'testT'} category={'testC'}/>);
    expect(component).toMatchSnapshot();
  });

  test('render selected', () => {
    const component = shallow(<FilterItem title={'testT'} category={'testC'} selected={true}/>);
    expect(component).toMatchSnapshot();
  });

  it('Simulate lick', () => {
    const mockCallBack = jest.fn();
    const item = mount(<FilterItem title={'testT'} category={'testC'} callback={mockCallBack}/>)
    item.find(FilterItem).simulate('click');
    expect(mockCallBack).toHaveBeenCalledWith({title: 'testT', category: 'testC'});
  });

  test('activate', () => {
    const mockCallBack = jest.fn();
    const component = shallow(<FilterItem title={'testT'} category={'testC'} callback={mockCallBack}/>)
    const instance = component.instance();

    const result = instance.activate()
    
    expect(result).toBe(false);
    expect(mockCallBack).toHaveBeenCalledWith({title: 'testT', category: 'testC'});
    expect(component.state('activation')).toBe(instance.deactivate);
  });
  
  test('deactivate', () => {
    const mockCallBack = jest.fn();
    const component = shallow(<FilterItem title={'testT'} category={'testC'} callback={mockCallBack}/>)
    const instance = component.instance();
    
    const result = instance.deactivate()
    
    expect(result).toBe(false);
    expect(mockCallBack).toHaveBeenCalledWith({title: 'testT', category: 'testC'});
    expect(component.state('activation')).toBe(instance.activate);
  });
});