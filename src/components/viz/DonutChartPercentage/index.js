import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import ChartWrapper from '../shared/ChartWrapper/index';

export default class DonutChartPercentage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      className: props.className,
      donutValue: props.value,
      donutTarget: props.target,
      donutLabel: 'Completed',
    };
    DonutChartPercentage.propTypes = {
      title: PropTypes.string.isRequired,
      className: PropTypes.string,
      value: PropTypes.number.isRequired,
      target: PropTypes.number.isRequired,
    };
    DonutChartPercentage.defaultProps = {
      className: '',
    };
  }

  render() {
    const percentage = Math.round((this.state.donutValue / this.state.donutTarget) * 100);
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
      <ChartWrapper title={this.state.title} className={this.state.className}>
        <svg width={size} height={size} className="donutchart">
          <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track" />
          <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator" />
          <text className="donutchart-text" x={halfsize} y={halfsize} style={{ textAnchor: 'middle' }}>
            <tspan className="donutchart-text-val">{percentage}</tspan>
            <tspan className="donutchart-text-percent">%</tspan>
            <tspan className="donutchart-text-label" x={halfsize} y={halfsize + 10}>{this.state.donutLabel}</tspan>
          </text>
        </svg>
      </ChartWrapper>
    );
  }
}
