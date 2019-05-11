import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  // Card, CardText, CardBody, CardTitle,
  Navbar, NavbarBrand,
  Row,
} from 'reactstrap';
import LineChart from './components/viz/LineChart';
import {
  FilterWrapper,
} from './components/Filter/FilterComponents';
import logo from './components/Filter/images/SealofPortland.png';
import Icon from './components/Icon';
import FilterActiveCategory from './components/Filter/FilterActiveCategory';
import FilterActiveOption from './components/Filter/FilterActiveOption';
import FilterSearchOption from './components/Filter/FilterSearchOption2';

const testData = [
  {
    metadata: 'Metadata placeholder',
    title: 'donut1',
    description: 'Dummmy donut chart 1: 5 even slices',
    chart_type: 'DONUT',
    categories: [
      'category 2',
      'category 3',
      'category 5',
    ],
    target: 100.0,
    target_trend: 'STABLE',
    axis_labels: [
      'solo donut',
    ],
    data_sets: [
      {
        metadata: 'Metadata placeholder.',
        title: 'donut1 dataset member 1. Axis label(s): solo donut',
        description: 'Contains donut1 data for type DONUT chart.',
        color: 'INDIGO',
        show_trendline: false,
        data_values: [
          [
            'ORANGE',
            'RED',
            'BLUE',
            'VIOLET',
            'YELLOW',
          ],
          [
            'label 1',
            'label 2',
            'label 3',
            'label 4',
            'label 5',
          ],
          [
            20.0,
            20.0,
            20.0,
            20.0,
            20.0,
          ],
        ],
      },
    ],
  },
  {
    metadata: 'Metadata placeholder',
    title: 'donut2',
    description: 'Dummmy donut chart 2: 5 uneven slices',
    chart_type: 'DONUT',
    categories: [
      'category 2',
      'category 4',
      'category 7',
    ],
    target: 100.0,
    target_trend: 'STABLE',
    axis_labels: [
      'solo donut',
    ],
    data_sets: [
      {
        metadata: 'Metadata placeholder.',
        title: 'donut2 dataset member 1. Axis label(s): solo donut',
        description: 'Contains donut2 data for type DONUT chart.',
        color: 'GREEN',
        show_trendline: false,
        data_values: [
          [
            'RED',
            'GREEN',
            'ORANGE',
            'BLUE',
            'VIOLET',
          ],
          [
            'label 1',
            'label 2',
            'label 3',
            'label 4',
            'label 5',
          ],
          [
            29.602888086642597,
            22.382671480144403,
            4.693140794223827,
            7.2202166064981945,
            36.101083032490976,
          ],
        ],
      },
    ],
  },
  {
    metadata: 'Metadata placeholder',
    title: 'donut3',
    description: 'Dummmy donut chart 3: 2 charts with 3 uneven slices',
    chart_type: 'DONUT',
    categories: [
      'category 3',
      'category 5',
      'category 6',
    ],
    target: 100.0,
    target_trend: 'STABLE',
    axis_labels: [
      'donut 1',
      'donut 2',
    ],
    data_sets: [
      {
        metadata: 'Metadata placeholder.',
        title: 'donut3 dataset member 1. Axis label(s): donut 1',
        description: 'Contains donut3 data for type DONUT chart.',
        color: 'RED',
        show_trendline: false,
        data_values: [
          [
            'INDIGO',
            'VIOLET',
            'YELLOW',
          ],
          [
            'label 1',
            'label 2',
            'label 3',
          ],
          [
            93.93939393939394,
            1.0101010101010102,
            5.05050505050505,
          ],
        ],
      },
      {
        metadata: 'Metadata placeholder.',
        title: 'donut3 dataset member 2. Axis label(s): donut 2',
        description: 'Contains donut3 data for type DONUT chart.',
        color: 'ORANGE',
        show_trendline: false,
        data_values: [
          [
            'INDIGO',
            'VIOLET',
            'BLUE',
          ],
          [
            'label 1',
            'label 2',
            'label 3',
          ],
          [
            26.436781609195403,
            44.827586206896555,
            28.735632183908045,
          ],
        ],
      },
    ],
  },
  {
    metadata: 'Metadata placeholder',
    title: 'line1',
    description: 'Dummy line chart 1: random coordinates with STABLE trend.',
    chart_type: 'LINE',
    categories: [
      'category 4',
      'category 1',
      'category 5',
      'category 2',
      'category 3',
      'category 6',
      'category 7',
    ],
    target: 30.0,
    target_trend: 'STABLE',
    axis_labels: [
      [
        'x-values',
        'y_values',
      ],
    ],
    data_sets: [
      {
        metadata: 'Metadata placeholder.',
        title: "line1 dataset member 1. Axis label(s): ['x-values', 'y_values']",
        description: 'Contains line1 data for type LINE chart.',
        color: 'ORANGE',
        show_trendline: true,
        data_values: [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
          ],
          [
            0,
            0,
            1,
            6,
            3,
            6,
            4,
            4,
            2,
            12,
            14,
            9,
            5,
            16,
            0,
            2,
            29,
            7,
            25,
            23,
          ],
        ],
      },
    ],
  },
  {
    metadata: 'Metadata placeholder',
    title: 'line2',
    description: 'Dummy line chart 2: ascending coordinates with UP trend.',
    chart_type: 'LINE',
    categories: [
      'category 6',
      'category 5',
      'category 1',
      'category 3',
      'category 4',
      'category 7',
      'category 2',
    ],
    target: 30.0,
    target_trend: 'UP',
    axis_labels: [
      [
        'x-values',
        'y_values',
      ],
    ],
    data_sets: [
      {
        metadata: 'Metadata placeholder.',
        title: "line2 dataset member 1. Axis label(s): ['x-values', 'y_values']",
        description: 'Contains line2 data for type LINE chart.',
        color: 'RED',
        show_trendline: true,
        data_values: [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
          ],
          [
            2,
            -1,
            2,
            6,
            9,
            7,
            10,
            17,
            16,
            18,
            20,
            20,
            24,
            23,
            27,
            32,
            34,
            36,
            38,
            36,
          ],
        ],
      },
    ],
  },
  {
    metadata: 'Metadata placeholder',
    title: 'line3',
    description: 'Dummy line chart 3: ascending coordinates with DOWN trend.',
    chart_type: 'LINE',
    categories: [
      'category 2',
      'category 3',
      'category 6',
      'category 4',
      'category 5',
      'category 7',
      'category 1',
    ],
    target: 5.0,
    target_trend: 'DOWN',
    axis_labels: [
      [
        'x-values',
        'y_values',
      ],
    ],
    data_sets: [
      {
        metadata: 'Metadata placeholder.',
        title: "line3 dataset member 1. Axis label(s): ['x-values', 'y_values']",
        description: 'Contains line3 data for type LINE chart.',
        color: 'BLUE',
        show_trendline: true,
        data_values: [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
          ],
          [
            -1,
            4,
            2,
            3,
            8,
            9,
            10,
            13,
            17,
            20,
            18,
            21,
            24,
            27,
            30,
            29,
            31,
            35,
            39,
            38,
          ],
        ],
      },
    ],
  },
  {
    metadata: 'Metadata placeholder',
    title: 'bar1',
    description: 'Dummy bar chart 1: 7 bars of random positive size.',
    chart_type: 'BAR',
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
    target_trend: 'STABLE',
    axis_labels: [
      [
        'bar_labels',
        'bar values',
      ],
    ],
    data_sets: [
      {
        metadata: 'Metadata placeholder.',
        title: "bar1 dataset member 1. Axis label(s): ['bar_labels', 'bar values']",
        description: 'Contains bar1 data for type BAR chart.',
        color: 'YELLOW',
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
    metadata: 'Metadata placeholder',
    title: 'bar2',
    description: 'Dummy bar chart 2: 7 bars of ascending positive size.',
    chart_type: 'BAR',
    categories: [
      'category 2',
      'category 7',
      'category 5',
      'category 3',
      'category 6',
      'category 4',
      'category 1',
    ],
    target: 30.0,
    target_trend: 'UP',
    axis_labels: [
      [
        'bar_labels',
        'bar values',
      ],
    ],
    data_sets: [
      {
        metadata: 'Metadata placeholder.',
        title: "bar2 dataset member 1. Axis label(s): ['bar_labels', 'bar values']",
        description: 'Contains bar2 data for type BAR chart.',
        color: 'RED',
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
          [
            2,
            -1,
            2,
            7,
            6,
            9,
            13,
            11,
          ],
        ],
      },
    ],
  },
  {
    metadata: 'Metadata placeholder',
    title: 'bar3',
    description: 'Dummy bar chart 3: 7 bars of descending size from positive to negative.',
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
    axis_labels: [
      [
        'bar_labels',
        'bar values',
      ],
    ],
    data_sets: [
      {
        metadata: 'Metadata placeholder.',
        title: "bar3 dataset member 1. Axis label(s): ['bar_labels', 'bar values']",
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
          [
            6,
            4,
            2,
            0,
            -2,
            -4,
            -6,
            -8,
          ],
        ],
      },
    ],
  },
];

ReactDOM.render(
  <Fragment>
    <Navbar color="light" light expand="md">
      <NavbarBrand><img src={logo} width="40" height="40" alt="City of Portland" /> City of Portland Dashboard</NavbarBrand>

    </Navbar>
    <FilterWrapper data={testData} title="" />
    <Row />
  </Fragment>,
  document.getElementById('root'),
);
