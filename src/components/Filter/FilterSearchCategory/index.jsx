import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Card, CardBody, CardTitle,
 } from 'reactstrap';

class FilterSearchCategory extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.title = '';
    this.hidden = false;
  }

  render() {      
    if(this.props.hidden)
      return null;

    return (
      <Container>
      <hr/>
        <h3 style={{ marginBottom: '1rem'}}>{this.props.title}</h3>
        
        {this.props.children}
      </Container>
    );
  }
}

export default FilterSearchCategory;