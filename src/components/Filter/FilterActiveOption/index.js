import React from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastHeader } from 'reactstrap';

export default class FilterActiveOption extends React.Component {
  constructor(props) {
    super(props);

    this.category = this.props;
    this.callback = this.props;

    this.state = {
      active: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { category } = this.props;
    const { callback } = this.props;
    callback({ category });
    this.setState(state => ({
      active: !state.active,
    }));
    return false;
  }

  render() {
    const { title } = this.props;
    const { category } = this.props;
    const { active } = this.state;

    if (!active || title === '' || category === '') {
      return null;
    }
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
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

FilterActiveOption.defaultProps = {
  callback: t => console.log(`FilterSearchOption uninitialized callback: ${t}`),
};
