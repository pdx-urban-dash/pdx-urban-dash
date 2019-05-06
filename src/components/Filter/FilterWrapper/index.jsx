import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Jumbotron,
  Button,
  Collapse,
  Row, Col,
  Card, CardText, CardBody, CardTitle,
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
    this.toggle = this.toggle.bind(this);
    
    this.title = '';
    this.show = true;
    this.data = [];
    this.state = {
      show: this.props.show,
      shownCategories: 'all',
      selected: [],
    }

  };

toggle() {
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
  var index = selected.indexOf(data);
  if (index === -1)
    selected.push(data)
  else if (index > -1)
    selected.splice(index, 1);

  this.setState({selected})
}

  render() {
    var categoryHidden, trendHidden, targetHidden;

    switch(this.state.shownCategories){
      case 'Category':
        categoryHidden = false;
        trendHidden = true;
        targetHidden = true;
        console.log("Category (render, FilterWrapper");
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
        categoryHidden = false;
        trendHidden = false;
        targetHidden = false;
    }
    

    let isHidden = (title) => {
      console.log(title + "(isHidden, FilterWrapper");
      // eslint-disable-next-line
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

    let isSelected = title => this.state.selected.includes(title);

    let formatData = (dataset) =>{
      var filtersByCat = {
        'Category': [
          //'anyCat': []  Need to build
        ],
        'Trend': ['Treding Up', 'Trending Down'],
        'Strategic Target': ['On Target', 'Above Target', 'Below Target'],
      };

      //For each data point
      for (var i in dataset){
        let data = dataset[i];

        //Dynamically add each category
        for (var category in data.categories){
          //If it isnt already in the list, add it
          if(!filtersByCat['Category'].includes(data.categories[category]))
            filtersByCat['Category'].push(data.categories[category]);
        }
      }
      return filtersByCat;
    }

    let data = formatData(this.props.data);

    function uniqueCatagories(dataArr) {
      var allCats = dataArr.map(function(data){return data.category});
      var uniqueCats = Array.from(new Set(allCats));
      return uniqueCats;
    }

    function categories (filters, callback) {
      var children = [];
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
              childData.map((elem, id) => {
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
                      key: id,
                      title: elem,
                      selected: isSelected(elem),
                      callback: callback,
                    }, 
                    this
                  )
                )
              )}
            )
          )
        ))
      }
      return children;
    }

    function selectedResults(results){
      var selected = [];
      for (var result in results ){
        for(var title in result){
          if(isSelected(title))
            selected.push(title);
        }
      }
      console.log(selected)
      return selected;
    }
    
    return (
      <Fragment>
        <Button onClick={this.toggle}>{!this.state.show ? "Filter Charts" : "Hide Filter"}</Button>
          <Collapse isOpen={this.state.show}>
            <Jumbotron>
              <h1 style={{ marginBottom: '1rem'}}>{this.props.title}</h1>
              <FilterSearchGroup title={''}> <p> Choose an option to see only the charts you are looking for.</p> </FilterSearchGroup>
              <FilterSearchGroup title={'Select a Filter'} data={this.props.getFilters} callback={this.filterSearchGroupCallback}>
                <FilterSearchBar 
                  title='search'
                  categories={['Category', 'Trend', 'Strategic Target']}
                  callback={this.filterSearchBarCallback}
                />
                {categories(data, this.filterOptionCallback)}
              </FilterSearchGroup>
              <FilterSearchGroup title={'Your Selections'}>
                {selectedResults(data)}
              </FilterSearchGroup>
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