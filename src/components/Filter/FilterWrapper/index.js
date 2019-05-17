import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Jumbotron,
  Button,
  Collapse,
  Row, Col,
  Toast, ToastBody, ToastHeader,
} from 'reactstrap';
import {
  FilterActiveGroup,
  FilterSearchGroup,
  FilterSearchBar,
} from '../FilterComponents';

export default class FilterWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.title = props.title;
    this.categories = props.categories;

    this.state = {
      show: true,
      shownCategory: '',
      categoryFilters: [],
      activeFilters: [],
    };

    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);
    this.updateShownCategory = this.updateShownCategory.bind(this);
    this.updateActiveFiltersFromActive = this.updateActiveFiltersFromActive.bind(this);
    this.updateActiveFiltersFromSearch = this.updateActiveFiltersFromSearch.bind(this);
  }

  toggleFilterWindow() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  updateShownCategory(category) {
    const updatedCategoryFilters = [];
    if (category === 'Category') {
      for (let i = 1; i <= 7; i += 1) {
        updatedCategoryFilters.push(`Category ${i}`);
      }
    }
    if (category === 'Trend') {
      updatedCategoryFilters.push('Trending Up');
      updatedCategoryFilters.push('Trending Down');
    }
    if (category === 'Strategic Target') {
      updatedCategoryFilters.push('On Target');
      updatedCategoryFilters.push('Above Target');
      updatedCategoryFilters.push('Below Target');
    }
    this.setState({
      shownCategory: category,
      categoryFilters: updatedCategoryFilters,
    });
  }

  updateActiveFiltersFromActive(activeFilters) {
    this.setState({
      activeFilters,
    });
  }

  updateActiveFiltersFromSearch(title, activeOptions) {
    const { activeFilters } = this.state;
    const updatedActiveFilters = [];
    let added = false;
    activeFilters.forEach((activeFilter) => {
      if (!added) {
        if (title === activeFilter.title) {
          if (activeOptions.length !== 0) {
            updatedActiveFilters.push({ title, categories: activeOptions });
            added = true;
          }
        } else if (title < activeFilter.title) {
          if (activeOptions.lenth !== 0) {
            updatedActiveFilters.push({ title, categories: activeOptions });
            updatedActiveFilters.push(activeFilter);
            added = true;
          }
        } else {
          updatedActiveFilters.push(activeFilter);
        }
      } else {
        updatedActiveFilters.push(activeFilter);
      }
    });
    if (!added) {
      if (activeOptions.length !== 0) {
        updatedActiveFilters.push({ title, categories: activeOptions });
      }
    }
    this.setState({
      activeFilters: updatedActiveFilters,
    });
  }

  render() {
    const { title } = this.props;
    const { show } = this.state;
    const { shownCategory } = this.state;
    const { categoryFilters } = this.state;
    const { activeFilters } = this.state;

    const activeOptions = [];
    activeFilters.forEach((filter) => {
      if (filter.title === shownCategory) {
        const filterCategories = filter.categories;
        filterCategories.forEach((category) => {
          activeOptions.push(category);
        });
      }
    });

    return (
      <Fragment>
        <Button onClick={this.toggleFilterWindow}>
          { !show ? 'Filter results' : 'Hide Filter' }
        </Button>
        <Collapse isOpen={show}>
          <Jumbotron>
            <h1>
              { title }
            </h1>
            <Row>
              <Col lg="8">
                <Toast style={{ display: 'block', minWidth: '100%' }}>
                  <ToastHeader style={{ display: 'block', minWidth: '100%' }}>
                    <FilterSearchBar
                      categories={this.categories}
                      callback={this.updateShownCategory}
                    />
                  </ToastHeader>
                  <ToastBody>
                    <FilterSearchGroup
                      wrapperTitle="Filters"
                      title={shownCategory}
                      categories={categoryFilters}
                      activeOptions={activeOptions}
                      callback={this.updateActiveFiltersFromSearch}
                    />
                  </ToastBody>
                </Toast>
              </Col>
              <Col lg="4">
                <FilterActiveGroup
                  title="Active Filters"
                  activeFilters={activeFilters}
                  callback={this.updateActiveFiltersFromActive}
                />
              </Col>
            </Row>
          </Jumbotron>
        </Collapse>
      </Fragment>
    );
  }
}

FilterWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
