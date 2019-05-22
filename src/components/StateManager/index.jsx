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
import {genChart} from '../../utils/chartUtils';

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

    function displayCharts(data) {
      var ret = []
      data.forEach((chart) => {
        ret.push(genChart(chart, "light", chart.chart_type));
      })
      
      return ret
    }

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
            {console.log("StateManager.filteredCharts")}
            {console.log(this.state.filteredCharts)}
            {displayCharts(this.state.filteredCharts.length === 0 ? this.props.data : this.state.filteredCharts)}
          </Col>
        </Row>
      </Fragment>
    );
  }
}
