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
    hideFilter: PropTypes.bool,
    data: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);
    this.filterCallback = this.filterCallback.bind(this);

    this.hideFilter = true;
    this.data = [];
    this.state = {
      hideFilter: this.props.hideFilter,
      filteredCharts: this.props.data
    };
  }

  toggleFilterWindow() {
    this.setState({
      hideFilter: !this.state.hideFilter
    });
  }

  filterCallback(returned) {
    this.setState({ filteredCharts: returned });
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
                    {this.state.hideFilter ? "Hide Filter" : "Filter results" }
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
              hidden={this.state.hideFilter}
              callback={this.filterCallback}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            Chart manager goes here
            {console.log("StateManager shows the following charts: ")}
            {console.log(this.state.filteredCharts)}
          </Col>
        </Row>
      </Fragment>
    );
  }
}
