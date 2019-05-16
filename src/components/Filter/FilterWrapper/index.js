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
    this.updateActiveFilters = this.updateActiveFilters.bind(this);
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
  }

  updateActiveFilters(title, activeOptions) {
    console.log(`Title: ${title} ActiveOptions: ${activeOptions}`);
    const { activeFilters } = this.state;
    const updatedActiveFilters = [];
    let added = false;
    activeFilters.forEach((activeFilter) => {
      if (title === activeFilter.title) {
        if (activeOptions.length !== 0) {
          updatedActiveFilters.push({ title, categories: activeOptions });
          added = true;
        }
      } else {
        updatedActiveFilters.push(activeFilter);
      }
    });
    if (!added) {
      updatedActiveFilters.push({ title, categories: activeOptions });
      console.log(`ADDED: Title: ${updatedActiveFilters[0].title} ActiveOptions: ${updatedActiveFilters[0].categories[0]}`);
    }
    this.setState({
      activeFilters: updatedActiveFilters,
    });
    console.log(`\nupdateActiveFilters: Title:${this.state} ActiveOptions:${activeOptions} updatedActiveFilters:${updatedActiveFilters}`);
  }

  render() {
    const { title } = this.props;
    const { show } = this.state;
    const { shownCategory } = this.state;
    const { categoryFilters } = this.state;
    const { activeFilters } = this.state;
    const activeOptions = [];

    console.log(`\nActiveFilters: ${activeFilters.map(filter => console.log(`\nFilter Name: ${filter.title}\nActive Categories:${filter.categories}`))} `);

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
                <Toast style={{ display: 'block' }}>
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
                      callback={this.updateActiveFilters}
                    />
                  </ToastBody>
                </Toast>
              </Col>
              <Col lg="4">
                <FilterActiveGroup
                  title="Your Selections"
                  activeFilters={activeFilters}
                  callback={this.updateActiveFilters}
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
