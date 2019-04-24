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
import Article from './Article';
import Filters from './Filters';

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
        <Navigation title="Some Shit" />
        <Collapse isOpen={filtersOpen}>
          <Jumbotron fluid>
            <Container>
              <Row>
                <Col>
                  <Article title="Tight tight tight">
                    So fucking tight
                  </Article>
                </Col>
                <Col>
                  <Filters />
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </Collapse>
      </Fragment>
    );
  }
}
