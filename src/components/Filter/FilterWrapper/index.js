import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Jumbotron,
  Button,
  Collapse,
  Row, Col,
} from 'reactstrap';
import {
  FilterSearchGroup,
  FilterSearchCategory,
  FilterSearchOption,
  FilterSearchBar,
} from '../FilterComponents';

class FilterWrapper extends React.Component {
  constructor(props) {
    super(props);

    //callbacks
    this.filterSearchBarCallback = this.filterSearchBarCallback.bind(this);
    this.filterOptionCallback = this.filterOptionCallback.bind(this);
    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);
    
    this.title = '';
    this.show = true;
    this.data = [];
    this.state = {
      show: this.props.show,
      shownCategories: '',
      selected: [],
    }

  };

toggleFilterWindow() {
  this.setState({
    show: !this.state.show,
  })
}

filterSearchBarCallback(shownCategories){
  this.setState({shownCategories})
}

filterOptionCallback(data){
  //Toggle weather an option is selected or not
  //If a category exists in selected, remove it.
  //Otherwise add it
  var selected = this.state.selected;
  for (var i in selected){
    //If the option already exists, remove it
    if(data.title === selected[i].title){
      selected.splice(i, 1);
      this.setState({selected})
      return;
    }
  }

  //Not in the list, add it
  selected.push(data);
  this.setState({selected})
}

  render() {
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

    switch(this.state.shownCategories){
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
      switch(title){
        case 'Category':
          return categoryHidden;
          break;
        case 'Trend': 
          return trendHidden;
          break;
        case 'Strategic Target':
          return targetHidden;
          break;
        default:
          return false;
          break;
      }};

    function formatData(dataset){
      var filtersByCat = {
        'Category': [],
        'Trend': ['Treding Up', 'Trending Down'],
        'Strategic Target': ['On Target', 'Above Target', 'Below Target'],
      };

      //For each data point
      for (var i in dataset){
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

    function selectedResults(results){
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
    
    function selectedGroupCallback(){

    }

    return (
      <Fragment>
        <Button onClick={this.toggleFilterWindow}>{!this.state.show ? "Filter results" : "Hide Filter"}</Button>
          <Collapse isOpen={this.state.show}>
            <Jumbotron>
              <h1 style={{ marginBottom: '1rem'}}>{this.props.title}</h1>
              <Row>
                <Col lg="8">
                 <FilterSearchGroup title={'Select a Filter'} data={this.props.getFilters} callback={this.filterSearchGroupCallback}>
                  <FilterSearchBar 
                    title='search'
                    categories={['Category', 'Trend', 'Strategic Target']}
                    callback={this.filterSearchBarCallback}
                  />
                  {categories(data, this.filterOptionCallback)}
                </FilterSearchGroup>
                </Col>
                <Col lg="4">
                  <FilterSearchGroup title={'Your Selections'} data={[]}>
                    <Row>
                      {selectedResults(this.state.selected)}
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

export default FilterWrapper;