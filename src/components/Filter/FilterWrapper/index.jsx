import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardText, CardBody, CardTitle,
} from 'reactstrap';
import {
  FilterSearchGroup,
  FilterCategory,
  FilterOption,
  FilterSearchBar,
} from '../FilterComponents';

class FilterWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.getFilters = this.getFilters.bind(this);
    this.hideUnselectedCategories = this.hideUnselectedCategories.bind(this);
    this.buildCategories = this.buildCategories.bind(this);
    this.buildOptions = this.buildOptions.bind(this);

    //
    this.transformData = this.transformData.bind(this);
    this.updateChildren = this.updateChildren.bind(this);
    
    this.title = '';
    this.data = []

    this.state = {
      activeCatigories: this.transformData(this.props.data),
    };
  };


//Formats input from parent
//[{'category': x, 'name': y}, ...] => {'Category': [optionState, ...]}
transformData(filters) {
  //Seperate names into categories
  //Build dictionary of {catagories: [names]}
  var filtersByCat = {};
  for (var i in filters){
    var filter = filters[i];
    if (!filtersByCat[filter.category]){

      filtersByCat[filter.category] = [];
      // console.log("Added " + filtersByCat[filter.category])
    }

    //Sort filters into lists of option prop data by category
    filtersByCat[filter.category].push(filter.dataSetName);
  }
  return filtersByCat;
}


getFilters() {
  this.props.data.map(function iterator( data ) {
    return ([
      { 
        'category': data.category,
        'name': data.dataSetName,
      }
    ])
  });
}

buildCategories(){
  var filters = this.transformData(this.props.data);
  //Build options for each category
  var categories = [];
  for (var key in filters)
    categories.push(<FilterCategory key={key} title={key}>{this.buildOptions(filters[key])}</FilterCategory>);
  return categories;
}

buildOptions(catagories){
  return catagories.map(function(key, id){
    return<FilterOption key={id} title={key}/>;
  })
}

updateChildren(){ 
  console.log(this.props.children + "(updateChildren, FilterWrapper)");
  return null;
}

hideUnselectedCategories(category){
  console.log(category + " (hideUnselectedCategories, FilterWrapper)");
  return null;
}

  render() {
    
    
    return (
      <Fragment>

        <Card>
          <CardBody> 
            <CardTitle>Welcome</CardTitle>
            <CardText>Some text stuff is here</CardText>
          </CardBody>
        </Card>

        <FilterSearchGroup title={this.props.title} data={this.props.getFilters}>
          <FilterSearchBar 
            title='search'
            categories={['Trending Down', 'Trending Up']}
            callback={this.hideUnselectedCategories}
          />
          {this.buildCategories()}
          {this.updateChildren()}
        </FilterSearchGroup>

        <Card>
          <CardBody>
            <CardTitle>Your Selections</CardTitle>
          </CardBody>
        </Card>

      </Fragment>
    );
  }
}

FilterWrapper.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FilterWrapper;