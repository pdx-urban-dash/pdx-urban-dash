import React from 'react';
import { Navbar } from 'react-bootstrap';

class Navigation extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      title: null,
      logo: null
    };
  };

  render () {
    return (
      <Navbar bg="light" className="justify-content-sm-center">
        <Navbar.Brand >
          <img src={this.props.logo} width="40" height="40" alt="City of Portland"/>
          <span></span> {this.props.title}
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Navigation;