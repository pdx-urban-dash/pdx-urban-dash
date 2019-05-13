import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Jumbotron, Button, Collapse, Row, Col,
} from 'reactstrap';
import {
  FilterActiveGroup,
  FilterActiveCategory,
  FilterActiveOption,
  FilterSearchGroup,
  FilterSearchCategory,
  FilterSearchOption,
  FilterSearchBar,
} from '../FilterComponents';

export default class FilterWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.title = props.title;

    this.filterSearchBarCallback = this.filterSearchBarCallback.bind(this);
    this.filterOptionCallback = this.filterOptionCallback.bind(this);
    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);

    this.state = {
      show: false,
      shownCategories: '',
      selected: [],
    };

    this.renderActiveCategories = this.renderActiveCategories.bind(this);
    this.removeCategoryFilter = this.removeCategoryFilter.bind(this);
    this.addCategoryFilter = this.addCategoryFilter.bind(this);
  }

  removeCategoryFilter(title, category) {
    const { updatedSelected } = [];
    const { selected } = this.state;
    selected.forEach((filter) => {
      if (filter.title !== title) {
        updatedSelected.push(filter);
      } else {
        const { updatedCategories } = [];
        filter.categories.forEach((cat) => {
          if (cat !== category) {
            updatedCategories.push(cat);
          }
        });
        updatedSelected.push({
          title: filter.title,
          categories: updatedCategories,
        });
      }
    });
    this.setState({
      selected: updatedSelected,
    });
  }

  addCategoryFilter(title, category) {
    const { updatedSelected } = [];
    const { selected } = this.state;
    selected.forEach((filter) => {
      if (filter.title === title) {
        const { sortedCategories } = [];
        let pushed = false;
        filter.categories.forEach((cat) => {
          if (!pushed) {
            if (category.compareTo(cat) <= 0) {
              sortedCategories.push(category);
              pushed = true;
            }
          }
          sortedCategories.push(cat);
        });
        if (!pushed) {
          sortedCategories.push(category);
        }
        updatedSelected.push({
          title,
          categories: sortedCategories,
        });
      } else {
        updatedSelected.push(filter);
      }
    });
    this.setState({
      selected: updatedSelected,
    });
  }

  toggleFilterWindow() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  filterSearchBarCallback(shownCategories) {
    this.setState({ shownCategories });
  }

  filterOptionCallback(data) {
    const { selected } = this.state;
    /*
    let { removed } = false;
    selected.forEach((filter) => {
      if (filter.title === title) {
        this.removeCategoryFilter(title, category);
        removed = true;
      }
    });
    if (!removed) {
      this.addCategoryFilter(title, category);
    }
    */
    for (var i in selected) {
      //If the option already exists, remove it
      if (data.title === selected[i].title) {
        selected.splice(i, 1);
        this.setState({ selected });
        return;
      }
    }
    selected.push(data);
    this.setState({ selected });
  }

  renderActiveCategories() {
    const { selected } = this.state;
    return (
      <FilterActiveGroup
        activeFilters={selected}
        callback={this.removeCategoryFilter}
      />
    );
  }

  render() {
    const { title } = this.props;
    const { show } = this.state;
    const { selected } = this.state;
    const { shownCategories } = this.state;
    var categoryHidden, trendHidden, targetHidden;
    let data = formatData(this.props.data);

    let isSelected = (title) => {
      var selected = this.state.selected;
      for (var i in selected){
        //If the option already exists, remove it
        if(title === selected[i].title){
          return true;
        }
      }
    }

    switch (shownCategories) {
      case 'Category':
        categoryHidden = false;
        trendHidden = true;
        targetHidden = true;
        break;
      case 'Trend':
        categoryHidden = true;
        trendHidden = false;
        targetHidden = true;
        break;
      case 'Strategic Target':
        categoryHidden = true;
        trendHidden = true;
        targetHidden = false;
        break;
      default:
        categoryHidden = true;
        trendHidden = true;
        targetHidden = true;
    }

    function isHidden(title) {
      switch (title) {
        case 'Category':
          return categoryHidden;
        case 'Trend':
          return trendHidden;
        case 'Strategic Target':
          return targetHidden;
        default:
          return false;
      }
    }

    function formatData(dataset) {
      const filtersByCat = {
        Category: [],
        Trend: ['Treding Up', 'Trending Down'],
        'Strategic Target': ['On Target', 'Above Target', 'Below Target'],
      };
      for (var i in dataset) {
        let data = dataset[i];

        //Dynamically add each category
        for (var category in data.categories){
          //If it isn't already in the list, add it
          if(!filtersByCat['Category'].includes(data.categories[category]))
            filtersByCat['Category'].push(data.categories[category]);
        }
      }
      return filtersByCat;
    }

    function categories (filters, callback) {
      var children = [];

      let child = data => data.map((elem, id) => {
        return (
          React.createElement(
          Col,
          {
            key: id,
            md: 6,
          },
          React.createElement(
            FilterSearchOption,
            {
              key: key,
              title: elem,
              category: key,
              selected: isSelected(elem),
              callback: callback,
            }, 
            this
            )
          )
        )
      })

      for (var key in filters ){
        var childData = filters[key];
        children.push (
          React.createElement(
            FilterSearchCategory,
            {
              key: key,
              title: key,
              hidden: isHidden(key),
            },
            React.createElement(
              Row,
              {
                key: key
              },
              child(childData)
            )
          )
        )
      }
      return children;
    }

    function selectedResults(results) {
      var selected = [];

      var filtersByCat = {};
      for (var i in results ){
        if(results[i].title){
          if(!filtersByCat[results[i].category.toUpperCase()])
              filtersByCat[results[i].category.toUpperCase()] = [];

          filtersByCat[results[i].category.toUpperCase()].push(results[i].title);
        }
      }

      for(var category in filtersByCat){
        var options = '';
        for (var option in filtersByCat[category])
          options += filtersByCat[category][option] + ", ";

        options = options.substring(0, options.length-2);
        options += "   (x)";
        
        selected.push(
          <Col key={option} md="4">
            <hr/>
            {category + ": " + options}
          </Col>
        )
      }
      return selected;
    }

    

    return (
      <Fragment>
        <Button onClick={this.toggleFilterWindow}>
          {!show ? 'Filter Results' : 'Hide Filter'}
        </Button>
        <Collapse isOpen={show}>
          <Jumbotron>
            <h1 style={{ marginBottom: '1rem' }}>
              { title }
            </h1>
            <Row>
              <Col lg="8">
                <FilterSearchGroup title="Select a Filter">
                  <FilterSearchBar
                    title="search"
                    categories={['Category', 'Trend', 'Strategic Target']}
                    callback={this.filterSearchBarCallback}
                  />
                  { categories(data, this.filterOptionCallback) }
                </FilterSearchGroup>
              </Col>
              <Col lg="4">
                <FilterSearchGroup title="Your Selections">
                  <Row>
                    { /* this.renderActivecategories */ selectedResults(selected) }
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

FilterWrapper.propTypes = {
  title: PropTypes.string.isRequired,
};
