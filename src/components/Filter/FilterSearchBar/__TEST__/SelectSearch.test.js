import React from 'react';
import { shallow } from 'enzyme';
import SelectSearch from '../index';

const testData = ['test1', 'test2', 'test3'];
const testFunc = () => {console.log()};

describe('<SelectSearch />', () => {
  test('snapshot', () => {
    const wrapper = shallow(<SelectSearch categories={testData} callback={testFunc} />);
    expect(wrapper).toMatchSnapshot();
  });
});
