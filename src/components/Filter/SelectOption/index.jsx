import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  CustomInput,
  ButtonGroup,
  Button
} from 'reactstrap';
import Icon from "../../Icon";


export default class SelectOption extends Component {

  static propTypes = {
      text: PropTypes.string.isRequired,
    };

  constructor (props) {
    super(props);

    this.state = { 
      rendered: <Button outline color="primary" onClick={() => this.activateFilter(1)} > { this.props.text }</Button>,
    };

    this.activateFilter = this.activateFilter.bind(this);
    this.deactivateFilter = this.deactivateFilter.bind(this);
  }

  activateFilter(selected) {
    this.setState({
      rendered: <Button color="success" onClick={() => this.deactivateFilter(1)} > { this.props.text }</Button>,
    }) 
  }

  deactivateFilter(selected) {
    this.setState({
      rendered: <Button outline color="primary" onClick={() => this.activateFilter(1)} > { this.props.text }</Button>,
    }) 
  }

  render() {
    return (
      <Fragment>
          {this.state.rendered}
      </Fragment>
    );
  }
}

