import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";

export default class FilterGroup extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.title = "";
  }

  render() {
    return (
      <Container style={{ borderLeft: "2px solid rgba(0,0,0,.1)" }}>
        <h2 style={{ marginBottom: "1rem" }}>{this.props.title}</h2>
        {this.props.children}
      </Container>
    );
  }
}
