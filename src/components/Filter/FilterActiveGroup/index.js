import React from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

import FilterActiveCategory from '../FilterActiveCategory';

export default class FilterActiveGroup extends React.Component {
  constructor(props) {
    super(props);

    this.activeFilters = props.activeFilters;
    this.callback = props.callback;

    this.state = {
      activeCategories: this.activeFilters,
    };

    this.renderCategory = this.renderCategory.bind(this);
    this.removeEmptyCategory = this.removeEmptyCategory.bind(this);
  }

  removeEmptyCategory(title) {
    const updatedActiveCategories = [];
    const { activeCategories } = this.state;
    activeCategories.forEach((category) => {
      if (category.title !== title) {
        updatedActiveCategories.push(category);
        const { callback } = this.props;
        callback({ title });
      }
    });
    this.setState({
      activeCategories: updatedActiveCategories,
    });
  }

  renderCategory(category) {
    return (
      <FilterActiveCategory
        title={category.title}
        categories={category.categories}
        callback={this.removeEmptyCategory}
      />
    );
  }

  render() {
    const { activeCategories } = this.state;
    return (
      <Toast>
        <ToastHeader>
          Active Filters
        </ToastHeader>
        <ToastBody>
          {activeCategories.map(category => this.renderCategory(category)) }
        </ToastBody>
      </Toast>
    );
  }
}

FilterActiveGroup.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  callback: PropTypes.func,
};

FilterActiveGroup.defaultProps = {
  callback: t => console.log(`FilterSearchOption uninitialized callback: ${t}`),
};
