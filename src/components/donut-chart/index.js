import React, { Component } from 'react';
import './styles.css';

export default class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donutValue: 0,
      inputDonutValue: 0,
      donutLabel: 'Completed',
      size: 200,
      strokewidth: 50,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const val = e.target.value;
    this.setState({ inputDonutValue: val });
  }

  handleClick() {
    const { inputDonutValue } = this.state;
    this.setState({ donutValue: inputDonutValue });
  }

  render() {
    const halfsize = (this.state.size * 0.5);
    const radius = halfsize - (this.state.strokewidth * 0.5);
    const circumference = 2 * Math.PI * radius;
    const strokeval = ((this.state.donutValue * circumference) / 100);
    const dashval = (`${strokeval} ${circumference}`);

    const trackstyle = { strokeWidth: this.state.strokewidth };
    const indicatorstyle = { strokeWidth: this.state.strokewidth, strokeDasharray: dashval };
    const rotateval = `rotate(-90 ${halfsize},${halfsize})`;

    return (
      <div>
        <svg width={this.state.size} height={this.state.size} className="donutchart">
          <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track" />
          <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator" />
          <text className="donutchart-text" x={halfsize} y={halfsize} style={{ textAnchor: 'middle' }}>
            <tspan className="donutchart-text-val">{this.state.donutValue}</tspan>
            <tspan className="donutchart-text-percent">%</tspan>
            <tspan className="donutchart-text-label" x={halfsize} y={halfsize + 10}>{this.state.donutLabel}</tspan>
          </text>
        </svg>
        <br />
        <input onChange={this.handleChange} />
        <button type="button" onClick={this.handleClick}>Input</button>
      </div>
    );
  }
}
