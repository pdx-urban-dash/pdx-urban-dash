import React from 'react';
import PropTypes from 'prop-types';
import { createClassFromSpec } from 'react-vega';

import { injectPropsIntoSchema } from '../../../utils/vegaUtils';
import { getDefaultDonutColor } from '../../../utils/visUtils';
import { colors, sizes } from '../../../constants';
import donutChartSchema from './schema';
import './styles.scss';

import Legend from '../shared/Legend';
import ChartWrapper from '../shared/ChartWrapper';

const buildData = (data) => {
  const retData = [];
  data.forEach((dataSet, idx) => {
    dataSet.values.forEach(slice => retData.push({ id: slice.id, field: slice.field, c: idx }));
  });
  return retData;
};

export const getColors = (data) => {
  const mColors = data.map((_elem, idx) => getDefaultDonutColor(idx));
  return mColors;
};

const DonutChart = (
  {
    data,
    title,
    className,
    colorScheme,
  },
) => {
  const colorRange = getColors(data);
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
          value: parseInt(sizes.fontSM.slice(0, -2), 10),
        },
        $colorRange: {
          name: 'range',
          value: colorRange,
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
          title: elem.dataSetName,
          description: elem.description,
          color: getDefaultDonutColor(idx),
        }))}
      />
    </ChartWrapper>
  );
};

DonutChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    dataSetName: PropTypes.string,
    sliceColor: PropTypes.string,
    values: PropTypes.shape({
      id: PropTypes.number.isRequired,
      field: PropTypes.number.isRequired,
    }),
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
