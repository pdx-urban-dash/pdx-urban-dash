import React from 'react';
import { shallow } from 'enzyme';
import {
  DropdownItem,
} from 'reactstrap';
import FilterDropdown from '../index';


describe('<FilterDropdown />', () => {
  test('snapshot', () => {
    const testData = ['test1', 'test2', 'test3'];
    const testFunc = () => { console.log(); };
    const component = shallow(<FilterDropdown categories={testData} callback={testFunc} />);
    expect(component).toMatchSnapshot();
  });

  test('toggleDropDown', () => {
    const testData = [];
    const mockCallBack = jest.fn();
    const component = shallow(<FilterDropdown categories={testData} callback={mockCallBack} />);
    const instance = component.instance();

    expect(component.state('dropdownOpen')).toBe(false);
    instance.toggleDropDown();
    expect(component.state('dropdownOpen')).toBe(true);
  });

  test('activateCategory', () => {
    const testData = ['test'];
    const mockCallBack = jest.fn();
    const component = shallow(<FilterDropdown categories={testData} callback={mockCallBack} />);
    const instance = component.instance();

    expect(component.state('dropdownLabel')).toBe('Select a Filter');
    instance.activateCategory('test');
    expect(component.state('dropdownLabel')).toBe('test');
  });

  test('renderCategoryDropdownItem', () => {
    const testData = [];
    const mockCallBack = jest.fn();
    const component = shallow(<FilterDropdown categories={testData} callback={mockCallBack} />);
    const instance = component.instance();
    instance.renderCategoryDropdownItem('test');
    expect(component.find(DropdownItem).text()).toBe('<DropdownItem />');
  });

  test('callback', () => {
    const testData = [];
    const mockCallBack = jest.fn();
    const component = shallow(<FilterDropdown categories={testData} callback={mockCallBack} />);

    component.find(DropdownItem).simulate('click');
    expect(mockCallBack).toHaveBeenCalledWith('None');
  });
});
