import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import Icon from "../../../components/Icon";

export default class FilterSelect extends React.Component {
  static propTypes = {
    callback: PropTypes.func,
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);

    this.callback = data =>
      console.log(
        "FilterSelect Default Callback: " + data.category + ", " + data.title
      );
    this.title = "";
  }

  onClick() {
    this.props.callback({
      title: this.props.title,
      category: this.props.category
    });
  }

  render() {
    return (
      <Row>
        <h5
          style={{
            marginBottom: "1rem",
            marginLeft: "2em",
            whiteSpace: "nowrap"
          }}
          onClick={this.onClick}
        >
          {this.props.title + "   "} <Icon type={"x-circle"} size={"sm"} />
        </h5>
      </Row>
    );
  }
}