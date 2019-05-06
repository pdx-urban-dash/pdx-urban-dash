import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col,
  Card, CardText, CardBody, CardTitle,
} from 'reactstrap';
import {
  FilterSearchGroup,
  FilterSearchCategory,
  FilterSearchOption,
  FilterSearchBar,
} from '../FilterComponents';

console.ignoredRedBox = [
  "Warning: Failed prop type...",
];

class FilterWrapper extends React.Component {
  constructor(props) {
    super(props);

    //callbacks
    this.filterSearchBarCallback = this.filterSearchBarCallback.bind(this);
    this.filterOptionCallback = this.filterOptionCallback.bind(this);
    
    this.title = '';
    this.data = [];
    this.state = {
      shownCategories: 'all',
      selected: [],
    }

  };

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
    var upHidden, downHidden, targetHidden;

    // eslint-disable-next-line
    switch(this.state.shownCategories.toLowerCase()){
      case 'trending down':
        upHidden = true;
        downHidden = false;
        targetHidden = true;
        break;
      case 'trending up': 
        upHidden = false;
        downHidden = true;
        targetHidden = true;
        break;
      case 'on target':
        upHidden = true;
        downHidden = true;
        targetHidden = false;
        break;
      default:
        upHidden = false;
        downHidden = false;
        targetHidden = false;
    }
    

    let isHidden = (title) => {
      // eslint-disable-next-line
      switch(title.toLowerCase()){
        case 'trending down':
          return downHidden;
          break;
        case 'trending up': 
          return upHidden;
          break;
        case 'on target':
          return targetHidden;
          break;
        default:
          return false;
          break;
      }};

    let isSelected = title => this.state.selected.includes(title);
    
    //Formats data:
    //[{'category': x, 'name': y}, ...] => {x: [y, ...]}
    let formatData = (filters) => {
      var filtersByCat = {};

      //For each data point
      for (var i in filters){
        var filter = filters[i];

        //If the category is not in our list, create it
        if (!filtersByCat[filter.category])
          filtersByCat[filter.category] = [];

        //Build lists of names in each category
        filtersByCat[filter.category].push(filter.dataSetName);
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

    return (
      <Fragment>
        <Card>
          <CardBody> 
            <CardTitle>Welcome</CardTitle>
            <CardText>Some text stuff is here</CardText>
          </CardBody>
        </Card>

        <FilterSearchGroup title={this.props.title} data={this.props.getFilters} callback={this.filterSearchGroupCallback}>
          <FilterSearchBar 
            title='search'
            categories={uniqueCatagories(this.props.data)}
            callback={this.filterSearchBarCallback}
          />

          {categories(data, this.filterOptionCallback)}
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

          // <FilterSearchCategory title='Trending Up' hidden={upHidden}>
          //   <Row>
          //     <Col>
          //       <FilterSearchOption title='Police' selected={isSelected('Police')} callback={this.filterOptionCallback}/>
          //     </Col>
          //     <Col>
          //       <FilterSearchOption title='Fire' selected={isSelected('Fire')} callback={this.filterOptionCallback}/>
          //     </Col>
          //   </Row>
            
          // </FilterSearchCategory>
          // <FilterSearchCategory title='Trending Down' hidden={downHidden}>
          //   <FilterSearchOption title='Parks & Rec.' selected={isSelected('Parks & Rec.')} callback={this.filterOptionCallback}/>
          //   <FilterSearchOption title='Sanitary' selected={isSelected('Sanitary')} callback={this.filterOptionCallback}/>
          // </FilterSearchCategory>
          // <FilterSearchCategory title='On Target' hidden={targetHidden}>
          //   <FilterSearchOption title='Public Relations' selected={isSelected('Public Relations')} callback={this.filterOptionCallback}/>
          //   <FilterSearchOption title='Sewage' selected={isSelected('Sewage')} callback={this.filterOptionCallback}/>
          // </FilterSearchCategory>