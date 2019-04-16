import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import Legend from '../shared/Legend';
import ChartWrapper from '../shared/ChartWrapper';

const DonutChartPercentage = (
  {
    title,
    className,
    label,
    color,
    description,
    target,
    value,
  },
) => {
  const percentage = Math.round((value / target) * 100);
  const size = 200;
  const strokeWidth = 50;

  const halfsize = 100;
  const radius = halfsize - 25;
  const circumference = 2 * Math.PI * radius;
  const strokeval = (((percentage) * circumference) / 100);
  const dashval = (`${strokeval} ${circumference}`);

  const trackstyle = { strokeWidth };
  const indicatorstyle = { strokeWidth, strokeDasharray: dashval };
  const rotateval = `rotate(-90 ${halfsize},${halfsize})`;
  return (
    <ChartWrapper title={title} className={className}>
      <svg width={size} height={size} className="donutchartpercentage">
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchartpercentage-track" />
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchartpercentage-indicator" />
        <text className="donutchartpercentage-text" x={halfsize} y={halfsize} style={{ textAnchor: 'middle' }}>
          <tspan className="donutchartpercentage-text-val">{percentage}</tspan>
          <tspan className="donutchartpercentage-text-percent">%</tspan>
          <tspan className="donutchartpercentage-text-label" x={halfsize} y={halfsize + 10}>{label}</tspan>
        </text>
      </svg>
      <Legend
        series={[{ title, description, color }]}
      />
    </ChartWrapper>
  );
};

DonutChartPercentage.propTypes = {
  target: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string,
};

DonutChartPercentage.defaultProps = {
  title: 'chart title',
  className: '',
  color: 'black',
  description: '',
  label: 'Completed',
};

export default DonutChartPercentage;
