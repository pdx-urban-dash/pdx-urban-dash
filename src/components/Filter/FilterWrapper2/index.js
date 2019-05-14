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

export default class FilterWrapper2 extends React.Component {
  constructor(props) {
    super(props);

    this.title = props.title;
    this.categories = props.categories;

    this.state = {
      show: false,
      shownCategory: '',
      categoryFilters: [],
      activeFilters: [],
    };

    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);
    this.updateShownCategory = this.updateShownCategory.bind(this);
    this.addOrRemoveActiveFilter = this.addOrRemoveActiveFilter.bind(this);
    this.addActiveFilter = this.addActiveFilter.bind(this);
    this.removeActiveFilter = this.removeActiveFilter.bind(this);
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
      for (let i = 0; i < 7; i += 1) {
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
    console.log(updatedCategoryFilters);
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

  render() {
    const { show } = this.state;
    const { title } = this.props;
    const { shownCategory } = this.state;
    const { categoryFilters } = this.state;
    const { activeFilters } = this.state;
    const activeOptions = [];

    const categoryFiltersCopy = [];
    categoryFilters.forEach((cat) => {
      categoryFiltersCopy.push(cat);
    });

    activeFilters.forEach((filter) => {
      if (filter.title === shownCategory) {
        const { activeFilterCategories } = filter.activeFilters;
        activeFilterCategories.forEach((category) => {
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
            <h1 style={{ marginBottom: '1rem' }}>
              { title }
            </h1>
            <Row>
              <Col lg="8">
                <Toast>
                  <ToastHeader>
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
                      callback={this.addOrRemoveActiveFilter}
                    />
                  </ToastBody>
                </Toast>
              </Col>
              <Col lg="4">
                <FilterActiveGroup
                  title="Your Selections"
                  activeFilters={activeFilters}
                  callback={this.removeActiveFilter}
                />
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
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
