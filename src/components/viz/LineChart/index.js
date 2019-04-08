import React from 'react';
import PropTypes from 'prop-types';
import { createClassFromSpec } from 'react-vega';

import { injectPropsIntoSchema } from '../../../utils/vegaUtils';
import { colors, sizes } from "../../../constants";
import lineChartSchema from './schema';
import './styles.scss';


const buildData = (data) => {
  const retData = [];
  data.forEach((dataSet, idx) => {
    dataSet.values.forEach(point => retData.push({ x: point.x, y: point.y, c: idx }));
  });
  return retData;
};

const LineChart = (
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
      lineChartSchema,
    ),
  );
  return (
    <div className={`LineChart-wrapper LineChart-theme__${colorScheme} ${className}`}>
      <span className="LineChart-title">{title}</span>
      <Graph />
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    dataSetName: PropTypes.string,
    lineColor: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })),
  })).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  colorScheme: PropTypes.oneOf(['light', 'dark']),
};

LineChart.defaultProps = {
  title: 'chart title',
  className: '',
  colorScheme: 'light',
};

export default LineChart;
