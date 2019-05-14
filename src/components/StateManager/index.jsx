import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  Row,
  Col
} from "reactstrap";
import { FilterManager } from "./../Filter/FilterComponents";
import logo from "./../Filter/images/SealofPortland.png";

export default class StateManager extends React.Component {
  static propTypes = {
    hidden: PropTypes.bool,
    data: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);
    this.filterCallback = this.filterCallback.bind(this);

    this.hidden = false;
    this.data = [];
    this.state = {
      hidden: this.props.hidden,
      selected: []
    };
  }

  toggleFilterWindow() {
    this.setState({
      hidden: !this.state.hidden
    });
  }

  filterCallback(returned) {
    this.setState({ selected: returned });
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <Navbar color="light" light expand="md">
              <NavbarBrand>
                <img src={logo} width="40" height="40" alt="City of Portland" />{" "}
                City of Portland Dashboard
              </NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button onClick={this.toggleFilterWindow}>
                    {this.state.hidden ? "Filter results" : "Hide Filter"}
                  </Button>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col>
            <FilterManager
              data={this.props.data}
              hidden={this.state.hidden}
              callback={this.filterCallback}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            Chart manager goes here
            {console.log(this.state.selected)}
          </Col>
        </Row>
      </Fragment>
    );
  }
}
