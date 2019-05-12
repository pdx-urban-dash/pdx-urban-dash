import React from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import FilterActiveOption from '../FilterActiveOption';

export default class FilterActiveCategory extends React.Component {
  constructor(props) {
    super(props);

    this.title = props.title;
    this.categories = props.categories;
    this.callback = props.callback;

    this.state = {
      activeOptions: this.categories,
    };

    this.renderOption = this.renderOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
  }

  removeOption(cat) {
    const updatedActiveOptions = [];
    const { activeOptions } = this.state;
    activeOptions.forEach((element) => {
      if (element !== cat.category) {
        updatedActiveOptions.push(element);
      }
    });
    const { callback } = this.props;
    callback({ cat });
    this.setState({
      activeOptions: updatedActiveOptions,
    });
    return false;
  }

  renderOption(option) {
    return (
      <FilterActiveOption
        key={option}
        title={this.title}
        category={option}
        callback={this.removeOption}
      />
    );
  }

  render() {
    const { title } = this.props;
    const { activeOptions } = this.state;
    if (title === '' || activeOptions.length === 0) {
      return null;
    }
    return (
      <Toast>
        <ToastHeader>
          { title }
        </ToastHeader>
        <ToastBody>
          { activeOptions.map(option => this.renderOption(option)) }
        </ToastBody>
      </Toast>
    );
  }
}

FilterActiveCategory.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  callback: PropTypes.func,
};

FilterActiveCategory.defaultProps = {
  callback: t => console.log(`FilterSearchOption uninitialized callback: ${t}`),
};
