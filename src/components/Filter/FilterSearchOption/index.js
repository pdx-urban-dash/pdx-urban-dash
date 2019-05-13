import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastHeader } from 'reactstrap';

export default class FilterSearchOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props,
      hidden: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { category } = this.props;
    const { selected } = this.state;
    const { callback } = this.props;
    callback({ category, selected });
    this.setState(state => ({
      selected: !state.selected,
    }));
  }

  render() {
    const { category } = this.props;
    const { selected } = this.props;
    const { hidden } = this.state;

    if (hidden || category === '') {
      return null;
    }
    return (
      <Toast onClick={this.handleClick} style={{ background: selected ? 'green' : '', cursor: 'pointer', height: '2rem' }}>
        <ToastHeader>
          { category }
        </ToastHeader>
      </Toast>
    );
  }
}

FilterSearchOption.propTypes = {
  category: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  callback: PropTypes.func,
};

FilterSearchOption.defaultProps = {
  callback: t => console.log(`FilterSearchOption uninitialized callback: ${t}`),
};
