import React from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastHeader } from 'reactstrap';

export default class FilterActiveOption extends React.Component {
  constructor(props) {
    super(props);

    this.category = this.props;
    this.callback = this.props;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { category } = this.props;
    const { callback } = this.props;
    callback(category);
  }

  render() {
    const { category } = this.props;
    return (
      <Toast>
        <ToastHeader toggle={this.handleClick}>
          { category }
        </ToastHeader>
      </Toast>
    );
  }
}

FilterActiveOption.propTypes = {
  category: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

FilterActiveOption.defaultProps = {
  callback: category => console.log(`FilterActiveOption Return\nCategory: ${category}`),
};
