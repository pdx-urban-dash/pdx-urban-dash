import React from 'react';
import PropTypes from 'prop-types';
import { createClassFromSpec } from 'react-vega';

import { injectPropsIntoSchema } from '../../../utils/vegaUtils';
import lineChartSchema from './schema';


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
  },
) => {
  const schema = injectPropsIntoSchema({
    $dataValues: {
      name: 'values',
      value: buildData(data),
    },
  },
  lineChartSchema);
  console.log(schema);
  const Graph = createClassFromSpec(schema);
  return <Graph />;
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    dataSetName: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })),
  })).isRequired,
};

LineChart.defaultProps = {

};

export default LineChart;
