import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Jumbotron,
  Button,
  Collapse,
  Row, Col,
} from 'reactstrap';
import {
  FilterActiveGroup,
  FilterActiveCategory,
  FilterSearchGroup,
  FilterSearchOption,
  FilterSearchBar,
} from '../FilterComponents';

export default class FilterWrapper2 extends React.Component {
  constructor(props) {
    super(props);

    this.title = props.title;

    this.state = {
      show: false,
      shownCategory: '',
      categoryFilters: [],
      activeFilters: [],
    };

    this.getFiltersByCat = this.getFiltersByCat.bind(this);
    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);
    this.updateShownCategory = this.updateShownCategory.bind(this);
    this.updateCategoryFilters = this.updateCategoryFilters.bind(this);
    this.addOrRemoveActiveFilter = this.addOrRemoveActiveFilter.bind(this);
    this.addActiveFilter = this.addActiveFilter.bind(this);
    this.removeActiveFilter = this.removeActiveFilter.bind(this);
    this.renderSearchGroup = this.renderSearchGroup.bind(this);
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

  toggleFilterWindow() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  updateShownCategory(category) {
    this.setState({ shownCategory: category });
    this.updateCategoryFilters();
    this.renderSearchGroup();
  }

  updateCategoryFilters() {
    const { updated } = this.getFiltersByCat();
    this.setState({
      categoryFilters: updated,
    });
  }

  addOrRemoveActiveFilter(title, category, selected) {
    if (selected) {
      this.addActiveFilter(title, category);
    } else {
      this.removeActiveFilter(title, category);
    }
  }

  addActiveFilter(title, category) {
    const { activeFilters } = this.state;
    const { updatedActiveFilters } = [];
    let { added } = false;
    activeFilters.forEach((filter) => {
      if (!added) {
        if (title === filter.title) {
          const { filterCategories } = filter.categories;
          const { updatedFilterCategories } = [];
          let { addedCategory } = false;
          filterCategories.forEach((cat) => {
            if (!addedCategory) {
              if (category.compareTo(cat) <= 0) {
                updatedFilterCategories.push(category);
                addedCategory = true;
              }
            }
            updatedFilterCategories.push(cat);
          });
          if (!addedCategory) {
            updatedFilterCategories.push(category);
          }
          updatedActiveFilters.push({ title, category: updatedFilterCategories });
          added = true;
        } else if (title.compareTo(filter.title) < 0) {
          updatedActiveFilters.push({ title, category: [{ category }] });
          added = true;
        }
        updatedActiveFilters.push(filter);
      } else {
        updatedActiveFilters.push(filter);
      }
    });
    this.setState({
      activeFilters: updatedActiveFilters,
    });
  }

  removeActiveFilter(title, category) {
    const { activeFilters } = this.state;
    const { updatedActiveFilters } = [];
    let { removed } = false;
    activeFilters.forEach((filter) => {
      if (!removed) {
        if (title === filter.title) {
          const { filterCategories } = filter.categories;
          const { updatedFilterCategories } = [];
          filterCategories.forEach((cat) => {
            if (category !== cat) {
              updatedFilterCategories.push(cat);
            }
          });
          updatedActiveFilters.push({ title: filter.title, categories: updatedFilterCategories });
          removed = true;
        } else {
          updatedActiveFilters.push(filter);
        }
      } else {
        updatedActiveFilters.push(filter);
      }
    });
    this.setState({
      activeFilters: updatedActiveFilters,
    });
  }

  renderSearchGroup() {
    const { shownCategory } = this.state;
    const { categoryFilters } = this.state;
    const { activeFilters } = this.state;
    const { activeOptions } = [];
    activeFilters.forEach((filter) => {
      if (filter.title === shownCategory) {
        const { activeFilterCategories } = filter.activeFilters;
        activeFilterCategories.forEach((category) => {
          activeOptions.push(category);
        });
      }
    });
    return (
      <FilterSearchGroup
        wrapperTitle="Filters"
        title={shownCategory}
        categories={categoryFilters}
        activeOptions={activeOptions}
        callback={this.addOrRemoveActiveFilter}
      />
    );
  }

  render() {
    const { show } = this.state;
    const { title } = this.props;
    const { activeFilters } = this.state;
    const { shownCategory } = this.state;
    const { categoryFilters } = this.state;

    return (
      <Fragment>
        <Button onClick={this.toggleFilterWindow}>
          { !show ? 'Filter results' : 'Hide Filter' }
        </Button>
        <Collapse isOpen={show}>
          <Jumbotron>
            <h1 style={{ marginBottom: '1rem' }}>
              { title }
            </h1>
            <Row>
              <Col lg="6">
                <FilterSearchBar
                  categories={['Category', 'Trend', 'Strategic Target']}
                  callback={this.updateShownCategory}
                />
                <FilterSearchGroup wrapperTitle="Select a Filter" title={shownCategory} categories={categoryFilters} activeOptions={[]} callback={this.filterSearchGroupCallback}>
                  { this.renderSearchGroup }
                </FilterSearchGroup>
              </Col>
              <Col lg="4">
                <FilterActiveGroup title="Your Selections" activeFilters={activeFilters} callback={this.removeActiveFilter} />
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
