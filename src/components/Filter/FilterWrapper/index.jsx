import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
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
    
    this.title = '';
    this.state = {
      shownCategories: 'all',
      selected: [],
    }

  };

filterSearchBarCallback(data){
  this.setState({
    shownCategories: data
  })

  // console.log(data);
  // console.log("^ (filterSearchBarCallback, FilterWrapper)");
}

filterOptionCallback(data){

  //Toggle weather an option is selected or not
  //If a category exists in selected, remove it.
  //Otherwise add it
  var temp = this.state.selected;
  var index = temp.indexOf(data);
  if (index === -1)
    temp.push(data)
  else if (index > -1)
    temp.splice(index, 1);

  this.setState({
    selected: temp
  })

  // console.log(temp);
  // console.log("^ (filterOptionCallback, FilterWrapper)");
}

  render() {
    var upHidden, downHidden, targetHidden;

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
        break;
    }
    
    let isSelected = title => this.state.selected.includes(title);
    
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
            categories={['Trending Down', 'Trending Up', 'On Target']}
            callback={this.filterSearchBarCallback}
          />
          <FilterSearchCategory title='Trending Up' hidden={upHidden}>
            <FilterSearchOption title='Police' selected={isSelected('Police')} callback={this.filterOptionCallback}/>
            <FilterSearchOption title='Fire' selected={isSelected('Fire')} callback={this.filterOptionCallback}/>
          </FilterSearchCategory>
          <FilterSearchCategory title='Trending Down' hidden={downHidden}>
            <FilterSearchOption title='Parks & Rec.' selected={isSelected('Parks & Rec.')} callback={this.filterOptionCallback}/>
            <FilterSearchOption title='Sanitary' selected={isSelected('Sanitary')} callback={this.filterOptionCallback}/>
          </FilterSearchCategory>
          <FilterSearchCategory title='On Target' hidden={targetHidden}>
            <FilterSearchOption title='Public Relations' selected={isSelected('Public Relations')} callback={this.filterOptionCallback}/>
            <FilterSearchOption title='Sewage' selected={isSelected('Sewage')} callback={this.filterOptionCallback}/>
          </FilterSearchCategory>
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