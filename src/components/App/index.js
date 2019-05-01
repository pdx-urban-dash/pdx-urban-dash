import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Collapse,
  Jumbotron,
} from 'reactstrap';
import Navigation from './Navigation';

export default class App extends Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      filtersOpen: true,
    };
  }

  render() {
    const { filtersOpen } = this.state;
    return (
      <Fragment>
        <Navigation title="PDX Dashboard" />
        <Collapse isOpen={filtersOpen}>
          <Container>
            <Row fluid>
              <Col md="4">
                <h1>Description</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </Col>
              <Col md="4">
                <h1>Filters</h1>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
              </Col>
              <Col md="4">
                <h1>Applied Filters</h1>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
              </Col>
            </Row>
          </Container>
          <Row>
            <Col style={{ padding: '1rem', 'text-align': 'center' }} lg="12">
            Chart Area
            </Col>
          </Row>
        </Collapse>
      </Fragment>
    );
  }
}
