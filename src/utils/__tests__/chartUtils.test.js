import React from 'react';
import each from 'jest-each';
import { shallow } from 'enzyme';
import { genChart } from '../chartUtils';

each([
  [undefined],
  [{
    targetTrend: 'UP',
    target: 100,
    title: 'dummy line graph',
    axisLabels: [
      'x',
      'y',
    ],
    type: 'LINE',
    dataSets: [
      {
        showTrendLine: true,
        description: 'first datapoint',
        title: 'line1',
        color: 'RED',
        dataValues: [
          [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
          ],
          [
            2, 5, 1, 6, 8, 9, 3, 4, 7, 8,
          ],
        ],
        metaData: '',
      },
    ],
  }],
  [{
    metaData: 'metaData placeholder',
    title: 'bar1',
    description: 'Dummy bar chart 1: 7 bars of random positive size.',
    type: 'BAR',
    categories: [
      'category 4',
      'category 5',
      'category 3',
      'category 7',
      'category 2',
      'category 1',
      'category 6',
    ],
    target: 30.0,
    targetTrend: 'STABLE',
    axisLabels: [
      [
        'bar_labels',
        'bar values',
      ],
    ],
    dataSets: [
      {
        metaData: 'metaData placeholder.',
        title: "bar1 dataset member 1. Axis label(s): ['bar_labels', 'bar values']",
        description: 'Contains bar1 data for type BAR chart.',
        color: 'YELLOW',
        showTrendLine: true,
        dataValues: [
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
          [
            78,
            35,
            72,
            99,
            33,
            78,
            75,
            91,
          ],
        ],
      },
    ],
  },
  {
    targetTrend: 'UP',
    target: 100,
    title: 'dummy line graph',
    axisLabels: [
      'x',
      'y',
    ],
    type: 'DONUT',
    dataSets: [
      {
        showTrendLine: true,
        description: 'first datapoint',
        title: 'line1',
        color: 'RED',
        dataValues: [
          [
            'RED',
            'BLUE',
          ],
          [
            'derp',
            'foo',
          ],
          [
            30,
            70,
          ],
        ],
        metaData: '',
      },
    ],
  },
  ]]).test('genChart with obj: %o', (obj) => {
  if (obj === undefined) {
    expect(genChart(obj)).toBeNull();
  } else {
    const chart = <genChart chartJson={obj} colorScheme="light" />;
    const wrapper = shallow(<chart />);
    expect(wrapper).toMatchSnapshot();
  }
});
