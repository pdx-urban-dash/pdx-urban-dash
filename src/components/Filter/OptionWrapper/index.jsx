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

class OptionWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.title = '';
    this.filters = []
    
    this.buildOptions = this.buildOptions.bind(this);

    this.state = {
      activeFilters: [],
    };
  };

  buildOptions(){
    return this.props.filters.map(
      function iterator( data ) {
        return (
          <SelectOption category={data.category} name={data.name} />
        )
      }
    );
  } 

  render() {

    return (
      <Fragment>
        <Card>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            {this.buildOptions()}
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

OptionWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
};

export default OptionWrapper;