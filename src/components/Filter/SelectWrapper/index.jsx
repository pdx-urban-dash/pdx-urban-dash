import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle,
  Row, Col,
 } from 'reactstrap';
 import {
  SelectSearch,
  SelectOption,
} from '../FilterComponents';

class SelectWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.filters = []
    
    this.narrowFilters = this.narrowFilters.bind(this);
    this.buildOptions = this.buildOptions.bind(this);
    this.uniqueCatagories = this.uniqueCatagories.bind(this);

    this.state = {
      activeFilters: [],
    };
  };

  buildOptions(){
    console.log("activeFilters:"+this.state.activeFilters.map(function(data){return data.category}));
    return this.state.activeFilters.map(
      function iterator( data ) {
        return (
          <SelectOption category={data.category} name={data.name} />
        )
      }
    );
  } 

  narrowFilters (category) {
    console.log(category);

    if (category === "All") {
      this.setState({
        activeFilters: this.props.filters,
      })
    }
    else {
      //Get the filter matching the chosen category
      var activeFilter = this.props.filters.filter(
        function(filter){
          return filter.category === category;
        }
      )
      console.log("activeFilter:"+activeFilter);

      //Set active filters to only those that match the chosen category
      this.setState({
        activeFilters: activeFilter,
      })
    }
    
    
  }

  uniqueCatagories() {
    var allCats = this.props.filters.map(function iterator(data) {return data.category});
    var uniqueCats = Array.from(new Set(this.props.filters.map(function iterator(data) {return data.category})));
    return uniqueCats;
  }

  render() {

    

    return (
      <Fragment>
        <Card>
          <CardBody>
            <CardTitle>Filter Options</CardTitle>
            <Row>
              <Col>

                <SelectSearch 
                  categories={this.uniqueCatagories()}
                  callback={this.narrowFilters}
                />

              </Col>
            </Row>
            <Row>
              <Col>

                {this.buildOptions()}
                
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

SelectWrapper.propTypes = {
  categories: PropTypes.array,
};

export default SelectWrapper;