import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
 } from 'reactstrap';

class FilterSelectedCategory extends React.Component {
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
      <Col>
        <hr/>
        <h4 style={{ marginBottom: '1rem'}}>{this.props.title}</h4>
        {this.props.children}
      </Col>
    );
  }
}

export default FilterSelectedCategory;