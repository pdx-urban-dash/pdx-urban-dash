import React from 'react';
import PropTypes from 'prop-types';
import { createClassFromSpec } from 'react-vega';

import { injectPropsIntoSchema } from '../../../utils/vegaUtils';
import { colors, sizes } from '../../../constants';
import donutChartSchema from './schema';
import './styles.scss';

import Legend from '../shared/Legend';
import ChartWrapper from '../shared/ChartWrapper';
import { getDefaultColor } from '../../../utils/vizUtils';

const buildData = data => data.map((elem, idx) => ({
  id: idx,
  field: elem.value,
  c: idx,
}));

export const getColors = data => data.map((elem, idx) => (elem.color || getDefaultColor(idx)));

const DonutChart = (
  {
    data,
    title,
    className,
    colorScheme,
  },
) => {
  const mColors = getColors(data);
  const Graph = createClassFromSpec(
    injectPropsIntoSchema(
      {
        $dataValues: {
          name: 'values',
          value: buildData(data),
        },
        $labelColor: {
          name: 'labelColor',
          value: colorScheme === 'light' ? colors.fontDark : colors.fontLight,
        },
        $labelFontSize: {
          name: 'labelFontSize',
          value: parseInt(sizes.fontSM, 10),
        },
        $colorRange: {
          name: 'range',
          value: mColors,
        },
      },
      donutChartSchema,
    ),
  );
  return (
    <ChartWrapper title={title} className={className}>
      <Graph />
      <Legend
        series={data.map((elem, idx) => ({
          title: elem.name,
          description: elem.description,
          color: mColors[idx],
        }))}
      />
    </ChartWrapper>
  );
};

DonutChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.number.isRequired,
  })).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  colorScheme: PropTypes.oneOf(['light', 'dark']),
};

DonutChart.defaultProps = {
  title: 'default title',
  className: '',
  colorScheme: 'light',
};

export default DonutChart;
