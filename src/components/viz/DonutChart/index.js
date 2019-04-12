import React from 'react';
import PropTypes from 'prop-types';
import { createClassFromSpec } from 'react-vega';

import { injectPropsIntoSchema } from '../../../utils/vegaUtils';
import { colors, sizes } from '../../../constants';
import donutChartSchema from './schema';
import './styles.scss';

import ChartWrapper from '../shared/ChartWrapper';

const buildData = (data) => {
  const retData = [];
  data.forEach((dataSet) => {
    dataSet.values.forEach(slice => retData.push({ id: slice.id, field: slice.field }));
  });
  return retData;
};

const DonutChart = (
  {
    data,
    title,
    className,
    colorScheme,
  },
) => {
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
      },
      donutChartSchema,
    ),
  );
  return (
    <ChartWrapper title={title} className={className}>
      <Graph />
    </ChartWrapper>
  );
};

DonutChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    dataSetName: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      field: PropTypes.number.isRequired,
    })),
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
