import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  // Card, CardText, CardBody, CardTitle,
  Button,
  Nav, NavItem, Navbar, NavbarBrand,
  Row, Col
} from 'reactstrap';
import LineChart from './../viz/LineChart';
import {
  FilterWrapper,
} from './../Filter/FilterComponents';
import logo from './../Filter/images/SealofPortland.png';
import Icon from './../Icon';

class StateManager extends React.Component {
  constructor(props) {
    super(props);

    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);
    this.filterCallback = this.filterCallback.bind(this);

    this.show = false;
    this.data = [];
    this.state = {
      show: this.props.show,
      selected: [],
    }
  };

  toggleFilterWindow() {
    this.setState({
      show: !this.state.show,
    })
  }

  filterCallback(returned) {
    this.setState({selected: returned})
  }

  render() {
    
    return (
      <Fragment>
        <Row>
          <Col>
            <Navbar color="light" light expand="md">
             <NavbarBrand><img src={logo} width="40" height="40" alt="City of Portland" /> City of Portland Dashboard</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button onClick={this.toggleFilterWindow}>{this.state.show ? "Hide Filter" : "Filter results"}</Button>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col>
            <FilterWrapper data={this.props.data} show={this.state.show} callback={this.filterCallback}/>
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

export default StateManager;