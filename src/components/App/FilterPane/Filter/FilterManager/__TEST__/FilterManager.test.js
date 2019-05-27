import React from 'react';
import { shallow } from 'enzyme';
import FilterManager from '../index';

const data = [
  {
    metaData: 'metaData placeholder',
    title: 'bar3',
    description:
      'Dummy bar chart 3: 7 bars of descending size from positive to negative.',
    type: 'BAR',
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
    targetTrend: 'DOWN',
    axisLabels: [['bar_labels', 'bar values']],
    dataSets: [
      {
        metaData: 'metaData placeholder.',
        title:
          "bar3 dataset member 1. Axis label(s): ['bar_labels', 'bar values']",
        description: 'Contains bar3 data for type BAR chart.',
        color: 'INDIGO',
        showTrendline: true,
        values: [
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

describe('FilterManager Test Suite', () => {
  test('snapshot', () => {
    const component = shallow(<FilterManager title="test" data={data} />);
    expect(component).toMatchSnapshot();
  });

  test('filterDropdownCallback', () => {
    const component = shallow(<FilterManager title="test" data={data} />);
    const instance = component.instance();

    expect(component.state('shownCategory')).toBe('');
    instance.filterDropdownCallback('test');
    expect(component.state('shownCategory')).toBe('test');
  });

  test('filterItemCallback add to selected', () => {
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    expect(component.state('selected')).toStrictEqual([]);
    instance.filterItemCallback({ title: 'testT', category: 'testC' });
    expect(component.state('selected')).toStrictEqual([{ title: 'testT', category: 'testC' }]);
  });

  test('filterItemCallback remove from selected', () => {
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    expect(component.state('selected')).toStrictEqual([]);
    instance.filterItemCallback({ title: 'testT', category: 'testC' });
    instance.filterItemCallback({ title: 'testT', category: 'testC' });
    expect(component.state('selected')).toStrictEqual([]);
  });

  test('hasCategory true', () => {
    const fakeData = {
      categories: [
        'test',
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasCategory(fakeData, 'test');
    expect(result).toBe(true);
  });

  test('hasCategory false', () => {
    const fakeData = {
      categories: [
        'test',
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasCategory(fakeData, 'false');
    expect(result).toBe(false);
  });

  test('hasTrend donut up', () => {
    const fakeData = {
      type: 'DONUT',
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Up');
    expect(result).toBe(false);
  });

  test('hasTrend donut down', () => {
    const fakeData = {
      type: 'DONUT',
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Down');
    expect(result).toBe(false);
  });

  // line
  test('hasTrend line up true', () => {
    const fakeData = {
      type: 'LINE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [1, 2, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Up');
    expect(result).toBe(true);
  });

  test('hasTrend line up false', () => {
    const fakeData = {
      type: 'LINE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Up');
    expect(result).toBe(false);
  });

  test('hasTrend line down true', () => {
    const fakeData = {
      type: 'LINE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Down');
    expect(result).toBe(true);
  });

  test('hasTrend line down false', () => {
    const fakeData = {
      type: 'LINE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [1, 2, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Down');
    expect(result).toBe(false);
  });

  // bar
  test('hasTrend bar up true', () => {
    const fakeData = {
      type: 'BAR',
      dataSets: [
        {
          values: [
            [2, 3, 4],
            [1, 2, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Up');
    expect(result).toBe(true);
  });

  test('hasTrend bar up false', () => {
    const fakeData = {
      type: 'BAR',
      dataSets: [
        {
          values: [
            [2, 3, 4],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Up');
    expect(result).toBe(false);
  });

  test('hasTrend bar down true', () => {
    const fakeData = {
      type: 'BAR',
      dataSets: [
        {
          values: [
            [2, 3, 4],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Down');
    expect(result).toBe(true);
  });

  test('hasTrend bar down false', () => {
    const fakeData = {
      type: 'BAR',
      dataSets: [
        {
          values: [
            [2, 3, 4],
            [1, 2, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Down');
    expect(result).toBe(false);
  });

  // bar char
  test('hasTrend bar up true string', () => {
    const fakeData = {
      type: 'BAR',
      dataSets: [
        {
          values: [
            ['first', 'Second', 'Third'],
            [1, 2, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Up');
    expect(result).toBe(true);
  });

  test('hasTrend bar up false string', () => {
    const fakeData = {
      type: 'BAR',
      dataSets: [
        {
          values: [
            ['first', 'Second', 'Third'],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Up');
    expect(result).toBe(false);
  });

  test('hasTrend bar down true string', () => {
    const fakeData = {
      type: 'BAR',
      dataSets: [
        {
          values: [
            ['first', 'Second', 'Third'],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Down');
    expect(result).toBe(true);
  });

  test('hasTrend bar down false string', () => {
    const fakeData = {
      type: 'BAR',
      dataSets: [
        {
          values: [
            ['first', 'Second', 'Third'],
            [1, 2, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTrend(fakeData, 'Trending Down');
    expect(result).toBe(false);
  });


  // //////
  // //  hasTarget
  // //////
  /* hasTarget - donut */
  test('hasTarget donut above target true', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [2],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Above Target (Latest report)');
    expect(result).toBe(true);
  });

  test('hasTarget donut above target false', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [0],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Above Target (Latest report)');
    expect(result).toBe(false);
  });

  test('hasTarget donut on target true', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Latest report)');
    expect(result).toBe(true);
  });

  test('hasTarget donut on target false', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [2],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Latest report)');
    expect(result).toBe(false);
  });

  test('hasTarget donut below target true', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [0],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Below Target (Latest report)');
    expect(result).toBe(true);
  });

  test('hasTarget donut below target false', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Below Target (Latest report)');
    expect(result).toBe(false);
  });

  test('hasTarget donut On Target (Increasing) false', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Increasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget donut On Target (Decreasing) false', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Increasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget donut Off Target (Decreasing) false', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Decreasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget donut Off Target (Increasing) false', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Increasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget donut On Target (Stable) true', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Stable trend)');
    expect(result).toBe(true);
  });

  test('hasTarget donut Off Target (Stable) true', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [0],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Stable trend)');
    expect(result).toBe(false);
  });

  test('hasTarget donut Off Target (Stable) false', () => {
    const fakeData = {
      type: 'DONUT',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            ['color'],
            ['label'],
            [0],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Stable trend)');
    expect(result).toBe(false);
  });

  /* hasTarget - line */
  test('hasTarget line above target true', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 2],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Above Target (Latest report)');
    expect(result).toBe(true);
  });

  test('hasTarget line above target false', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 0],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Above Target (Latest report)');
    expect(result).toBe(false);
  });

  test('hasTarget line on target true', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Latest report)');
    expect(result).toBe(true);
  });

  test('hasTarget line on target false', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 0],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Latest report)');
    expect(result).toBe(false);
  });

  test('hasTarget line below target true', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 0],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Below Target (Latest report)');
    expect(result).toBe(true);
  });

  test('hasTarget line below target false', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 2],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Below Target (Latest report)');
    expect(result).toBe(false);
  });

  test('hasTarget line On Target (Increasing) false', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'UP',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Increasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget line On Target (Decreasing) false', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'DOWN',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [1, 2, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Increasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget line Off Target (Decreasing) false', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'UP',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Decreasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget line Off Target (Increasing) false', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'DOWN',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [2, 2, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Increasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget line On Target (Stable) true', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 3, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Stable trend)');
    expect(result).toBe(true);
  });

  test('hasTarget line Off Target (Stable) true', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 3, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Stable trend)');
    expect(result).toBe(false);
  });

  test('hasTarget line Off Target (Stable) false', () => {
    const fakeData = {
      type: 'LINE',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 3, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Stable trend)');
    expect(result).toBe(false);
  });

  /* hasTarget - bar */
  test('hasTarget bar above target true', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 2],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Above Target (Latest report)');
    expect(result).toBe(true);
  });

  test('hasTarget bar above target false', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 0],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Above Target (Latest report)');
    expect(result).toBe(false);
  });

  test('hasTarget bar on target true', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Latest report)');
    expect(result).toBe(true);
  });

  test('hasTarget bar on target false', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 0],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Latest report)');
    expect(result).toBe(false);
  });

  test('hasTarget bar below target true', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 0],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Below Target (Latest report)');
    expect(result).toBe(true);
  });

  test('hasTarget bar below target false', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 2],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Below Target (Latest report)');
    expect(result).toBe(false);
  });

  test('hasTarget bar On Target (Increasing) false', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'UP',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Increasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget bar On Target (Decreasing) false', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'DOWN',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [1, 2, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Increasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget bar Off Target (Decreasing) false', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'UP',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 2, 1],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Decreasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget bar Off Target (Increasing) false', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'DOWN',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [2, 2, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Increasing trend)');
    expect(result).toBe(false);
  });

  test('hasTarget bar On Target (Stable) true', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 3, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'On Target (Stable trend)');
    expect(result).toBe(true);
  });

  test('hasTarget bar Off Target (Stable) true', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 3, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Stable trend)');
    expect(result).toBe(false);
  });

  test('hasTarget bar Off Target (Stable) false', () => {
    const fakeData = {
      type: 'BAR',
      target: 1,
      targetTrend: 'STABLE',
      dataSets: [
        {
          values: [
            [0, 1, 2],
            [3, 3, 3],
          ],
        },
      ],
    };
    const mockCallBack = jest.fn();
    const component = shallow(<FilterManager title="test" data={data} callback={mockCallBack} />);
    const instance = component.instance();

    const result = instance.hasTarget(fakeData, 'Off Target (Stable trend)');
    expect(result).toBe(false);
  });

  // //////
  // //  returnChartData
  // //////
});
