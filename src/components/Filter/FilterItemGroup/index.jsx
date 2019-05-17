import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";

export default class FilterItemGroup extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    hidden: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.title = "";
    this.hidden = false;
  }

  render() {
    if (this.props.hidden) return null;

    return (
      <Container style={{ marginTop: "1rem" }}>{this.props.children}</Container>
    );
  }
}
