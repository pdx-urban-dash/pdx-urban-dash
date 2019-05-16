import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastHeader } from 'reactstrap';

export default class FilterSearchOption extends Component {
  constructor(props) {
    super(props);

    this.category = props.category;
    this.selected = props.selected;
    this.callback = props.callback;

    this.state = {
      selected: this.selected,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { category } = this.props;
    const { selected } = this.state;
    this.setState({
      selected: !selected,
    });
    const { callback } = this.props;
    callback(category, !selected);
  }

  render() {
    const { category } = this.props;
    const { selected } = this.state;
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
  callback: (category, selected) => console.log(`FilterSearchOption Returning\nCategory: ${category}\nSelected: ${selected}`),
};
