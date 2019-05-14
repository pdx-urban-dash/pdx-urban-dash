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
      categories: this.props,
    };

    this.renderOption = this.renderOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
  }

  removeOption(category) {
    const { title } = this.props;
    const { categories } = this.state;
    const updatedCategories = [];
    categories.forEach((element) => {
      if (element !== category) {
        updatedCategories.push(element);
      }
    });
    this.setState({
      categories: updatedCategories,
    });
    const { callback } = this.props;
    callback(title, category);
  }

  renderOption(option) {
    return (
      <FilterActiveOption
        category={option}
        callback={this.removeOption}
      />
    );
  }

  render() {
    const { title } = this.props;
    const { categories } = this.state;
    return (
      <Toast>
        <ToastHeader>
          { title }
        </ToastHeader>
        <ToastBody>
          { categories.map(option => this.renderOption(option)) }
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
