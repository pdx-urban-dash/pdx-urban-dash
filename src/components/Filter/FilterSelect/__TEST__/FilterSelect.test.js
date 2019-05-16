import React from 'react';
import { shallow } from 'enzyme';
import FilterSelect from '../index';

const testFunc = () => { console.log(); };

describe('FilterSelect Render', () => {
  test('snapshot', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<FilterSelect title={'testT'} category={'testC'} callback={mockCallBack}/>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('FilterSelect callback', () => {
	it('Test click event', () => {
		const mockCallBack = jest.fn();
		const select = shallow(<FilterSelect title={'testT'} category={'testC'} callback={mockCallBack}/>)
		select.find('h5').simulate('click');
		expect(mockCallBack).toHaveBeenCalledWith({title: 'testT', category: 'testC'});
	});
});