import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle,
  Row, Col,
 } from 'reactstrap';

class SelectWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.title = '';
  };

  render() {
    return (
      <Fragment>
        <Card>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            <Row>
              <Col>
                {this.props.children}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

SelectWrapper.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SelectWrapper;