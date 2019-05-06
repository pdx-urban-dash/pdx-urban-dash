import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col,
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
    this.clickedOff = false;
    this.callback = (t) => console.log("FilterSearchOption uninitialized callback: " + t);

    this.state = { 
      selected: this.props.selected,
      onclick: this.props.selected ? this.deactivateFilter : this.activateFilter,
      showx: false
    }      
  }

  activateFilter() {
    this.props.callback(
      this.props.title
    );

    this.setState({
      onclick: this.deactivateFilter,
      selected: true,
      showx: true,
    })
    return false;
  }

  deactivateFilter() {
    this.props.callback(
      this.props.title
    );

    this.setState({
      onclick: this.activateFilter,
      selected: false,
      showx: false,
    })
    return false;
  }

  render() {

    if(this.props.hidden)
      return null;
    
    return (
      <Toast fade={false} onClick={()=>this.state.onclick(this.props.title)} style={{ marginBottom: '1rem'}}>
        <ToastHeader toggle = {!this.state.selected ? false : this.props.callback} icon={this.state.selected ? (this.clickedOn) : (this.clickedOff)} style={{ height: '2rem'}}>
          { this.props.title }
        </ToastHeader>
      </Toast>
    );
    
  }
}

//icon={this.state.selected ? (this.clickedOn) : (this.clickedOff)}