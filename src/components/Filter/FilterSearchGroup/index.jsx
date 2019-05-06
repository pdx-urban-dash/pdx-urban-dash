import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle,
  Row, Col,
 } from 'reactstrap';

class FilterSearchGroup extends React.Component {
  constructor(props) {
    super(props);

    this.title = '';
  }

  render() {

    return (
      <Fragment>
        <hr/>
        <h2 style={{ marginBottom: '1rem'}}>{this.props.title}</h2>
        {this.props.children}
      </Fragment>
    );
  }
}

FilterSearchGroup.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FilterSearchGroup;