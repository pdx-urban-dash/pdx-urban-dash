import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
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
      <Container style={{ marginTop: '1rem'}}>        
        {this.props.children}
      </Container>
    );
  }
}

export default FilterSearchCategory;