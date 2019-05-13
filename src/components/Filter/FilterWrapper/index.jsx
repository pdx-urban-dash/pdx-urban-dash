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
  FilterSelectedCategory,
  FilterSelectedOption,
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
      shownCategory: '',
      selected: [],
    }

  };

toggleFilterWindow() {
  this.setState({
    show: !this.state.show,
  })
}

filterSearchBarCallback(shownCategory){
  this.setState({shownCategory})
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
    let data = formatData(this.props.data);

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
        for (var category in data.categories)
          //If it isn't already in the list, add it
          if(!filtersByCat['Category'].includes(data.categories[category]))
            filtersByCat['Category'].push(data.categories[category]);
      }
      return filtersByCat;
    }

    function selectAFilterCategories (filters, selections, shownCategory, callback) {
      
      var children = [];
      var selectedOptions = selections.map((option)=>{return option.title})      

      let child = data => data.map((elem, id) => {
        return (
          React.createElement(
          Col,
          {
            key: category,
            md: 6,
          },
          React.createElement(
            FilterSearchOption,
            {
              key: category,
              title: elem,
              category: category,
              selected: selectedOptions.includes(elem),
              callback: callback,
            }, 
            )
          )
        )
      })

      for (var category in filters ){
        var childData = filters[category].sort();
        children.push (
          React.createElement(
            FilterSearchCategory,
            {
              key: category,
              title: category,
              hidden: (shownCategory !== category),
            },
            React.createElement(
              Row,
              {
                key: category
              },
              child(childData)
            )
          )
        )
      }
      return children;
    }

    function yourSelections(selections, shownCategory, callback){
      var selected = [];
      var selectedCategories = selections.map((option)=>{return option.category})

      var filtersByCat = {};
      for (var i in selections ){
        var selection = selections[i];
        if(selection.title){
          if(!filtersByCat[selection.category])
              filtersByCat[selection.category] = [];

          filtersByCat[selection.category].push(selection.title);
          filtersByCat[selection.category].sort();
        }
      }

      for(var category in filtersByCat){
        var options = [];
        var hidden = !selectedCategories.includes(category);
        for (var option in filtersByCat[category])
          options.push(
            React.createElement(
              FilterSelectedOption,
              {
                key: option,
                title: filtersByCat[category][option],
                category,
                callback,
              },
            )
          )
        
        selected.push(
          React.createElement(
            FilterSelectedCategory,
            {
              key: option,
              title: category,
              hidden,
            },
            options
          )
        )
      }
      return selected;
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
                  {selectAFilterCategories(data, this.state.selected, this.state.shownCategory, this.filterOptionCallback)}
                </FilterSearchGroup>
                </Col>
                <Col lg="4">
                  <FilterSearchGroup title={'Your Selections'} data={[]}>
                    <Row>
                      {yourSelections(this.state.selected, this.state.shownCategory, this.filterOptionCallback)}
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