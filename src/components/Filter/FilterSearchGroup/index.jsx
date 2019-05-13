import React, { Fragment } from 'react';
import {
  Container,
} from 'reactstrap';
import PropTypes from 'prop-types';

class FilterSearchGroup extends React.Component {
  constructor(props) {
    super(props);

    this.title = '';
  }

  render() {

    return (
      <Container style={{borderLeft:"2px solid rgba(0,0,0,.1)"}}>
        <h2 style={{ marginBottom: '1rem'}}>{this.props.title}</h2>
        {this.props.children}
      </Container>
    );
  }
}

FilterSearchGroup.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FilterSearchGroup;