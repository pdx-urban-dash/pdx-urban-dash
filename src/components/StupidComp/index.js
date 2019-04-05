import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default class StupidComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValue: '',
      inputFieldValue: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const val = e.target.value;
    this.setState({ inputFieldValue: val });
  }

  handleClick() {
    const { inputFieldValue } = this.state;
    this.setState({ fieldValue: inputFieldValue });
  }

  render() {
    return (
      <div>
        <label htmlFor="dumb">Stupid Input</label>
        <input onChange={this.handleChange} />
        <button onClick={this.handleClick}> so dumb </button>
        <div className='stupidcomp-bad'>{this.state.fieldValue}</div>
      </div>
    );
  }
};