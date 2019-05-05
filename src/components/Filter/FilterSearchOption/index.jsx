import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Toast, ToastHeader
} from 'reactstrap';

export default class FilterSearchOption extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    hidden: PropTypes.bool,
    clickedOn: PropTypes.string,
    clickedOff: PropTypes.string,
    callback: PropTypes.func,
  };

  constructor (props) {
    super(props);

    this.activateFilter = this.activateFilter.bind(this);
    this.deactivateFilter = this.deactivateFilter.bind(this);

    this.title = '';
    this.selected = false;
    this.hidden = false;
    this.clickedOn = 'success';
    this.clickedOff = 'warning';
    this.callback = (t) => console.log(t);

    this.state = { 
      selected: this.props.selected,
      onclick: this.props.selected ? this.deactivateFilter : this.activateFilter,
    }      
  }

  activateFilter() {
    this.callback({
      'category': this.props.category, 
      'title': this.props.title,
      'selected': true,
    });

    this.setState({
      onclick: this.deactivateFilter,
      selected: true,
    }) 
  }

  deactivateFilter() {
    this.callback({
      'category': this.props.category, 
      'title': this.props.title,
      'selected': false,
    });

    this.setState({
      onclick: this.activateFilter,
      selected: false,
    }) 
  }

  render() {

    if(this.props.hidden)
      return null;
    
    return (
      <Form>
        <Fragment>
          <Toast data-category={this.props.category} onClick={this.state.onclick}>
            <ToastHeader icon={this.state.selected ? (this.clickedOn) : (this.clickedOff)}>
              { this.props.title }
            </ToastHeader>
          </Toast>
        </Fragment>
      </Form>
    );
    
  }
}