import React from 'react';
import { shallow } from 'enzyme';
import Treemap from '../index';

const testData = [
  {
    'Measure Title': 'Number of Building Permits',
    'Council Priority Area': 'Housing & Homelessness',
    'City Service Area': 'Community Development',
    Bureau: 'Development Services',
    'FY 2016-17 Actual': '  8,145 ',
    'FY 2017-18 Actual': '  6,905 ',
    'Desired Trend': 'UP',
    'Strategic Target': '  8,100 ',
    'What the measure shows': 'Construction market activity',
    Notes: 'Data can be disagregated into commercial and residential, or even further into permit type (new construction, renovation, etc.)',
    'What is important about this metric?': '',
    'Data frequency': '',
    'Data Source': '',
    'Data Visualization': '',
    'Geographic Tag?': 'y',
    Target: '',
  },
  {
    'Measure Title': 'Percentage of 9-1-1 calls answered within 20 seconds',
    'Council Priority Area': 'Public Safety',
    'City Service Area': 'Public Safety',
    Bureau: 'Bureau of Emergency Communications',
    'FY 2016-17 Actual': '63.2%',
    'FY 2017-18 Actual': '63.9%',
    'Desired Trend': 'UP',
    'Strategic Target': '90.0%',
    'What the measure shows': 'Speed by which we answer 9-1-1 calls',
    Notes: 'Can be updated daily, can be disaggregated into land line vs. cell phone calls. ',
    'What is important about this metric?': '',
    'Data frequency': '',
    'Data Source': 'BOEC',
    'Data Visualization': '',
    'Geographic Tag?': 'n',
    Target: '',
  },
];

const testTitle = 'chart title';

describe('<Treemap />', () => {
  test('snapshot', () => {
    const wrapper = shallow(<Treemap data={testData} title={testTitle} />);
    expect(wrapper).toMatchSnapshot();
  });
});
