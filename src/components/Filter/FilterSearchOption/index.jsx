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
    this.callback = (t) => console.log("FilterSearchOption uninitialized callback: " + t);

    this.state = { 
      selected: this.props.selected,
      onclick: this.props.selected ? this.deactivateFilter : this.activateFilter,
    }      
  }

  activateFilter() {
    this.props.callback(
      this.props.title
    );

    this.setState({
      onclick: this.deactivateFilter,
      selected: true,
    }) 
  }

  deactivateFilter() {
    this.props.callback(
      this.props.title
    );

    this.setState({
      onclick: this.activateFilter,
      selected: false,
    }) 
  }

  render() {

    if(this.props.hidden)
      return null;
    
    return (
      <Toast fade={false} onClick={()=>this.state.onclick(this.props.title)}>
        <ToastHeader icon={this.state.selected ? (this.clickedOn) : (this.clickedOff)}>
          { this.props.title }
        </ToastHeader>
      </Toast>
    );
    
  }
}