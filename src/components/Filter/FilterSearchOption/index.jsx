import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
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

    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);

    this.title = '';
    this.category = '';
    this.selected = false;
    this.hidden = false;
    this.clickedOn = 'success';
    this.clickedOff = false;
    this.callback = (t) => console.log("FilterSearchOption uninitialized callback: " + t);

    this.state = { 
      activation: this.props.selected ? this.deactivate : this.activate,
    }      
  }

  activate() {
    this.props.callback(
      {
        'title': this.props.title,
        'category': this.props.category,
      }
    );

    this.setState({
      activation: this.deactivate,
    })
    return false;
  }

  deactivate() {
    this.props.callback(
      {
        'title': this.props.title,
        'category': this.props.category,
      }
    );

    this.setState({
      activation: this.activate,
    })
    return false;
  }

  render() {

    if(this.props.hidden)
      return null;
    
    return (
      <Toast fade={false} onClick={this.state.activation} style={this.props.selected ? {"background": "green"} : {"background": ""}}>
        <ToastHeader toggle = {!this.props.selected ? false : this.props.callback}  style={{ height: '2rem'}}>
          { this.props.title }
        </ToastHeader>
      </Toast>
    );
    
  }
}