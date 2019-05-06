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
      shownCategories: '',
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
  for (var i in selected){
    //If the option already exists, remove it
    if(data.title === selected[i].title){
      selected.splice(i, 1);
      this.setState({selected})
      console.log("exists")
      return;
    }
  }

  //Not in the list, add it
  console.log("pushing")
  selected.push(data);
  this.setState({selected})

  // var index = selected.indexOf(data);
  // if (index === -1)
  //   selected.push(data)
  // else if (index > -1)
  //   selected.splice(index, 1);
  
  
}

  render() {
    var categoryHidden, trendHidden, targetHidden;

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
    

    let isHidden = (title) => {
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

    let isSelected = (title) => {
      var selected = this.state.selected;
      for (var i in selected){
        //If the option already exists, remove it
        if(title === selected[i].title){
          return true;
        }
      }
      this.state.selected.includes(title)
    }

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
                      category: key,
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

      var filtersByCat = {};
      for (var i in results ){
        if(results[i].title){
          if(!filtersByCat[results[i].category])
              filtersByCat[results[i].category] = [];

          filtersByCat[results[i].category].push(results[i].title);
        }
      }

      for(var category in filtersByCat){
        var options = '';
        for (var option in filtersByCat[category])
          options += filtersByCat[category][option] + ", ";

        options = options.substring(0, options.length-2);
        options += "   (x)";
        
        selected.push(
          <div>
            <hr/>
            {category + ": " + options}
          </div>
        )
      }
      return selected;
    }
    
    return (
      <Fragment>
        <Button onClick={this.toggle}>{!this.state.show ? "Filter Charts" : "Hide Filter"}</Button>
          <Collapse isOpen={this.state.show}>
            <Jumbotron>
              <h1 style={{ marginBottom: '1rem'}}>{this.props.title}</h1>
              <FilterSearchGroup title={'Instructions'}> <p> This is a large block of words that tells you how to do stuff. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </FilterSearchGroup>
              <FilterSearchGroup title={'Select a Filter'} data={this.props.getFilters} callback={this.filterSearchGroupCallback}>
                <FilterSearchBar 
                  title='search'
                  categories={['Category', 'Trend', 'Strategic Target']}
                  callback={this.filterSearchBarCallback}
                />
                {categories(data, this.filterOptionCallback)}
              </FilterSearchGroup>
              <FilterSearchGroup title={'Your Selections'}>
                {selectedResults(this.state.selected)}
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