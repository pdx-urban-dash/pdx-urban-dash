import React from 'react';
import { shallow } from 'enzyme';
import FilterDropdown from '../index';
import {
  ButtonDropdown,
  DropdownItem
} from "reactstrap";


describe('<FilterDropdown />', () => {
  test('snapshot', () => {
    const testData = ['test1', 'test2', 'test3'];
    const testFunc = () => { console.log(); };
    const wrapper = shallow(<FilterDropdown categories={testData} callback={testFunc} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('toggleDropDown', () => {
    const testData = [];
    const mockCallBack = jest.fn();
    const select = shallow(<FilterDropdown categories={testData} callback={mockCallBack}/>)
    const instance = select.instance();
    
    expect(select.state('dropdownOpen')).toBe(false);
    instance.toggleDropDown()
    expect(select.state('dropdownOpen')).toBe(true);
  });

  test('activateCategory', () => {
    const testData = ['test'];
    const mockCallBack = jest.fn();
    const select = shallow(<FilterDropdown categories={testData} callback={mockCallBack}/>)
    const instance = select.instance();
   
    expect(select.state('dropdownLabel')).toBe("Select a Filter");
    instance.activateCategory("test")
    expect(select.state('dropdownLabel')).toBe("test");
  });

  test('renderCategoryDropdownItem', () => {
    const testData = [];
    const mockCallBack = jest.fn();
    const select = shallow(<FilterDropdown categories={testData} callback={mockCallBack}/>)
    const instance = select.instance();
    instance.renderCategoryDropdownItem('test')
    expect(select.find(DropdownItem).text()).toBe("<DropdownItem />");

  });

  test('callback', () => {
    const testData = [];
    const mockCallBack = jest.fn();
    const select = shallow(<FilterDropdown categories={testData} callback={mockCallBack}/>)
    
    select.find(DropdownItem).simulate('click');
    expect(mockCallBack).toHaveBeenCalledWith('None');
  });
});