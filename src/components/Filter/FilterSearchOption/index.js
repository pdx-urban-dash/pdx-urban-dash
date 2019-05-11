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
    const { title } = this.props;
    const { category } = this.props;
    const { callback } = this.props;
    callback({ title, category });
    this.setState(state => ({
      selected: !state.selected,
    }));
    return false;
  }

  render() {
    const { title } = this.props;
    const { category } = this.props;
    const { selected } = this.props;
    const { hidden } = this.state;

    if (hidden || category === '' || title === '') {
      return null;
    }
    return (
      <Toast onClick={this.handleClick} style={{ background: selected ? 'green' : '', cursor: 'pointer', height: '2rem' }}>
        <ToastHeader>
          { title }
        </ToastHeader>
      </Toast>
    );
  }
}

FilterSearchOption.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  callback: PropTypes.func.isRequired,
};

FilterSearchOption.defaultProps = {
  selected: false,
};
