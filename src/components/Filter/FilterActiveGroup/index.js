import React from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

import FilterActiveCategory from '../FilterActiveCategory';

export default class FilterActiveGroup extends React.Component {
  constructor(props) {
    super(props);

    this.title = props.title;
    this.activeFilters = props.activeFilters;
    this.callback = props.callback;

    this.state = {
      activeCategories: this.activeFilters,
    };

    this.renderCategory = this.renderCategory.bind(this);
    this.updateActiveFilters = this.updateActiveFilters.bind(this);
  }

  updateActiveFilters(title, categories) {
    const { activeCategories } = this.state;
    const updatedActiveCategories = [];
    activeCategories.forEach((category) => {
      if (category.title !== title) {
        updatedActiveCategories.push(category);
      } else if (categories.length !== 0) {
        updatedActiveCategories.push({ title, categories });
      }
    });
    this.setState({
      activeCategories: updatedActiveCategories,
    });
    const { callback } = this.props;
    callback(title, updatedActiveCategories);
  }

  renderCategory(category) {
    return (
      <FilterActiveCategory
        key={category.title}
        title={category.title}
        categories={category.categories}
        callback={this.updateActiveFilters}
      />
    );
  }

  render() {
    const { title } = this.props;
    const { activeCategories } = this.state;
    return (
      <Toast>
        <ToastHeader>
          { title }
        </ToastHeader>
        <ToastBody>
          {activeCategories.map(category => this.renderCategory(category)) }
        </ToastBody>
      </Toast>
    );
  }
}

FilterActiveGroup.propTypes = {
  title: PropTypes.string.isRequired,
  activeFilters: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  callback: PropTypes.func,
};

FilterActiveGroup.defaultProps = {
  callback: (title, updatedActiveCategories) => console.log(`FilterActiveGroup Returning\nTitle: ${title}\nUpdatedActiveFilters: ${updatedActiveCategories}`),
};
