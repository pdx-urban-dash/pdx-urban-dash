import React from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import FilterActiveOption from '../FilterActiveOption';

export default class FilterActiveCategory extends React.Component {
  constructor(props) {
    super(props);

    this.renderOption = this.renderOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
  }

  removeOption(category) {
    const { title } = this.props;
    const { categories } = this.props;
    const updatedCategories = [];
    categories.forEach((cat) => {
      if (cat !== category) {
        updatedCategories.push(cat);
      }
    });
    const { callback } = this.props;
    callback(title, updatedCategories);
  }

  renderOption(option) {
    return (
      <FilterActiveOption
        key={option}
        category={option}
        callback={this.removeOption}
      />
    );
  }

  render() {
    const { title } = this.props;
    const { categories } = this.props;
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
  callback: (title, categories) => console.log(`FilterActiveCategory Returning\nTitle: ${title}\nCategories: ${categories}`),
};
