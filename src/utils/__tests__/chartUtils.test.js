import React from 'react';
import each from 'jest-each';
import { mount } from 'enzyme';
import { GenChart } from '../chartUtils';

each([
  [undefined, null, 0],
  [{
        "target_trend": "UP",
        "target": 100,
        "title": "dummy line graph",
        "axis_labels": [
            "x",
            "y"
        ],
        "chart_type": "LINE",
        "data_sets": [
            {
                "show_trendline": true,
                "description": "first datapoint",
                "title": "bar1",
                "color": "RED",
                "data_values": [
                    [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
                    ],
                    [
                        2, 5, 1, 6, 8, 9, 3, 4, 7, 8
                    ]
                ],
                "metadata": ""
            }
        ]
    }, "marks", 1]
]).test('GenChart with obj: %o', (obj, expected, length) => {
  if(obj === undefined) {
    expect(GenChart(obj)).toBeNull();
  }
  else {
      const lineChart = GenChart(obj, "light");
      const wrapper = mount(<lineChart />);
      expect(wrapper.find(expected)).toHaveLength(length);
  }
});
