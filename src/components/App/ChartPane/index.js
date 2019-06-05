import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import { standardizedDataType } from '../../../propTypes';
import { genChart } from '../../../utils/chartUtils';

const ChartPane = ({ visibleCharts }) => (
  <Container>
    {visibleCharts.map((chart, idx) => (
      <div className="ud-ChartPane-chart" key={`ud-chart-${chart.title}-${idx}`}>
        {genChart(chart, 'light')}
      </div>
    ))}
  </Container>
);

ChartPane.propTypes = {
  visibleCharts: PropTypes.arrayOf(standardizedDataType).isRequired,
};

export default ChartPane;
