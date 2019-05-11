import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Jumbotron,
  Button,
  Collapse,
  Row, Col,
} from 'reactstrap';
import {
  FilterActiveCategory,
  FilterSearchGroup,
  FilterSearchCategory,
  FilterSearchOption,
  FilterSearchBar,
} from '../FilterComponents';

export default class FilterWrapper2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: this.props,
      shownCategory: '',
      activeFilters: [],
    };

    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);
    this.updateShownCategory = this.updateShownCategory.bind(this);
    this.addOrRemoveSelectedFilter = this.addSelectedFilter.bind(this);

    this.renderActiveFilter = this.renderActiveFilter.bind(this);
    this.renderSearchOption = this.renderSearchOption.bind(this);

    this.getFiltersByCat = this.getFiltersByCat.bind(this);
  }

  static renderActiveFilter(filter) {
    return (
      <FilterActiveCategory
        title={filter.title}
        categories={filter.categories}
      />
    );
  }

  getFiltersByCat() {
    const { shownCategory } = this.state;
    if (shownCategory === 'Category') {
      const data = [];
      for (let i = 0; i < 7; i += 1) {
        data.push(`Category ${i}`);
      }
      return data;
    }
    if (shownCategory === 'Trend') {
      return ['Trending Up', 'Trending Down'];
    }
    if (shownCategory === 'Strategic Target') {
      return ['On Target', 'Above Target', 'Below Target'];
    }
    return [];
  }

  addOrRemoveSelectedFilter(selectedFilter) {
    const { selectedTitle } = selectedFilter.title;
    const { selectedCategory } = selectedFilter.category;
    const { activeFilters } = this.state;
    for (const filter in activeFilters) {
      if (filter.title === selectedTitle) {
        const { filterCategories } = filter.categories;
        for (const category in filterCategories) {
          if (category === selectedCategory) {
            filterCategories.splice(category, 1);
            this.setState({ activeFilters });
            return false;
          }
        }
      }
    }
    activeFilters.push(
      {
        title: selectedTitle,
        categories: [{ selectedCategory }],
      },
    );
    this.setState({ activeFilters });
    return false;
  }

  toggleFilterWindow() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  updateShownCategory(category) {
    this.setState(
      {
        shownCategory: category,
      },
    );
  }

  renderSearchCategory() {
    const { shownCategory } = this.state;
    const child = this.getFiltersByCat();

    /* Need to finish this function */
    /* Looks like I may need to refactor the SearchCategory/Group/Option */
  }

  static renderSearchOption(option) {
    return (
      <FilterSearchOption
        title={option}
      />
    );
  }

  render() {
    const { show } = this.state;
    const { title } = this.props;
    const { activeFilters } = this.state;

    return (
      <Fragment>
        <Button onClick={this.toggleFilterWindow}>{!show ? 'Filter results' : 'Hide Filter'}</Button>
        <Collapse isOpen={show}>
          <Jumbotron>
            <h1 style={{ marginBottom: '1rem' }}>{title}</h1>
            <Row>
              <Col lg="6">
                <FilterSearchGroup title="Select a Filter">
                  <FilterSearchBar
                    title="search"
                    categories={['Category', 'Trend', 'Strategic Target']}
                    callback={this.updateShownCategory}
                  />

                  { this.renderSearchCategory() }
                </FilterSearchGroup>
              </Col>
              <Col lg="4">
                <FilterSearchGroup title="Your Selections">
                  <Row>
                    { activeFilters.map(filter => this.renderActiveFilter(filter)) }
                  </Row>
                </FilterSearchGroup>
              </Col>
            </Row>
          </Jumbotron>
        </Collapse>
      </Fragment>
    );
  }
}

FilterWrapper2.propTypes = {
  title: PropTypes.string.isRequired,
};
