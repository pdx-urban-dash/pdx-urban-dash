import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import FilterActiveOption from '../FilterActiveOption';

import './styles.scss';

export default class FilterActiveCategory extends React.Component {
  constructor(props) {
    super(props);

    this.title = props.title;
    this.categories = props.categories;

    this.state = {
      activeFilters: this.categories,
    };

    this.renderCategory = this.renderCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
  }

  removeCategory(cat) {
    const updatedActiveFilters = [];
    const { activeFilters } = this.state;
    activeFilters.forEach((element) => {
      if (element !== cat.category) {
        updatedActiveFilters.push(element);
      }
    });
    this.setState({
      activeFilters: updatedActiveFilters,
    });
    return false;
  }

  renderCategory(cat) {
    return (
      <FilterActiveOption
        key={cat}
        title={this.title}
        category={cat}
        callback={this.removeCategory}
      />
    );
  }

  render() {
    const { title } = this.props;
    const { activeFilters } = this.state;
    if (title === '' || activeFilters.length === 0) {
      return null;
    }
    return (
      <Container>
        <h1 className="filter-active-category">
          { title }
          {activeFilters.map(c => this.renderCategory(c))}
        </h1>
      </Container>
    );
  }
}

FilterActiveCategory.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
