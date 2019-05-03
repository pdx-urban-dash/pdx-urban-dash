import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Toast, ToastHeader
} from 'reactstrap';

export default class SelectOption extends Component {

  static propTypes = {
      name: PropTypes.string.isRequired,
    };

  constructor (props) {
    super(props);
    this.category = '';
    this.name = '';

    this.state = { 
      rendered: 
      <Fragment>
        <Toast data-category={this.props.category} onClick={() => this.activateFilter()}>
          <ToastHeader icon="warning">
            { this.props.name }
          </ToastHeader>
        </Toast>
      </Fragment>,
    };

    this.activateFilter = this.activateFilter.bind(this);
    this.deactivateFilter = this.deactivateFilter.bind(this);
  }

  activateFilter() {
    this.setState({
      rendered: 
      <Fragment>
        <Toast data-category={this.props.category} onClick={() => this.deactivateFilter()}>
          <ToastHeader icon="success">
            { this.props.name }
          </ToastHeader>
        </Toast>
      </Fragment>,
    }) 
  }

  deactivateFilter() {
    this.setState({
      rendered: 
      <Fragment>
        <Toast data-category={this.props.category} onClick={() => this.activateFilter()}>
          <ToastHeader icon="warning">
            { this.props.name }
          </ToastHeader>
        </Toast>
      </Fragment>,
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

