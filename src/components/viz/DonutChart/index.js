import React from 'react';
import PropTypes from 'prop-types';
import { createClassFromSpec } from 'react-vega';

import { injectPropsIntoSchema } from '../../../utils/vegaUtils';
import { colors, sizes } from '../../../constants';
import donutChartSchema from './schema';
import './styles.scss';

const buildData = (data) => {
  const retData = [];
  data.forEach((dataSet, idx) => {
    dataSet.values.forEach(slice => retData.push({ id: slice.id, field: slice.field, c: idx }));
  });
  return retData;
};

const buildTransform = (transform) => {
  const retData = [];
  transform.values(trans => retData.push(
    {
      type: trans.type,
      field: trans.field,
      startAngle: trans.startAngle,
      endAngle: trans.endAngle,
      padAngle: trans.padAngle,
      innerRadius: trans.innerRadius,
      cornerRadius: trans.cornerRadius,
      sort: trans.sort,
    },
  ));
  return retData;
};

const DonutChart = (
  {
    data,
    transform,
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
        $transformValues: {
          name: 'transform',
          value: buildTransform(transform),
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
    <div className={`DonutChart-wrapper DonutChart-theme__${colorScheme} ${className}`}>
      <span className="DonutChart-title">{title}</span>
      <Graph />
    </div>
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
  transform: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    padAngle: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number.isRequired,
    sort: PropTypes.bool.isRequired,
  })).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  colorScheme: PropTypes.oneOf(['light', 'dark']),
};

DonutChart.defaultProps = {
  title: 'chart title',
  className: '',
  colorScheme: 'light',
};

export default DonutChart;
