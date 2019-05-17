import React from 'react';
import { shallow } from 'enzyme';
import StateManager from '../index';

const data = [
  {
    metadata: 'Metadata placeholder',
    title: 'bar3',
    description:
      'Dummy bar chart 3: 7 bars of descending size from positive to negative.',
    chart_type: 'BAR',
    categories: [
      'category 4',
      'category 2',
      'category 7',
      'category 3',
      'category 5',
      'category 1',
      'category 6',
    ],
    target: 30.0,
    target_trend: 'DOWN',
    axis_labels: [['bar_labels', 'bar values']],
    data_sets: [
      {
        metadata: 'Metadata placeholder.',
        title:
          "bar3 dataset member 1. Axis label(s): ['bar_labels', 'bar values']",
        description: 'Contains bar3 data for type BAR chart.',
        color: 'INDIGO',
        show_trendline: true,
        data_values: [
          [
            'bar 1',
            'bar 2',
            'bar 3',
            'bar 4',
            'bar 5',
            'bar 6',
            'bar 7',
            'bar 8',
          ],
          [6, 4, 2, 0, -2, -4, -6, -8],
        ],
      },
    ],
  },
];

describe('<StateManager />', () => {
  test('snapshot', () => {
    const component = shallow(<StateManager data={data} />);
    expect(component).toMatchSnapshot();
  });

  test('toggleFilterWindow', () => {
    const component = shallow(<StateManager title="test" data={data} />);
    const instance = component.instance();

    expect(component.state('hideFilter')).toBe(true);
    instance.toggleFilterWindow('test');
    expect(component.state('hideFilter')).toBe(false);
  });

  test('filterCallback', () => {
    const mockCallBack = jest.fn();
    const component = shallow(<StateManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    expect(component.state('filteredCharts')).toStrictEqual([]);
    instance.filterCallback({ title: 'testT', category: 'testC' });
    expect(component.state('filteredCharts')).toStrictEqual([{ title: 'testT', category: 'testC' }]);
  });
});
