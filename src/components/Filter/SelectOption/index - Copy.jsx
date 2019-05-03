import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Card,
  CardBody,
  Button
} from 'reactstrap';

export default class SelectOption extends Component {

  static propTypes = {
      text: PropTypes.string.isRequired,
    };

  constructor (props) {
    super(props);

    this.state = { 
      rendered: <Button outline color="primary" onClick={() => this.activateFilter(1)} >{ this.props.text }</Button>,
    };

    this.activateFilter = this.activateFilter.bind(this);
    this.deactivateFilter = this.deactivateFilter.bind(this);
  }

  activateFilter() {
    this.setState({
      rendered: <Button color="success" onClick={() => this.deactivateFilter(1)}> { this.props.text } </Button>,
    }) 
  }

  deactivateFilter() {
    this.setState({
      rendered: <Button outline color="primary" onClick={() => this.activateFilter()} > { this.props.text }</Button>,
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

