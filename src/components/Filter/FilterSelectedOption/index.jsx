import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
 } from 'reactstrap';
 import Icon from '../../../components/Icon';

class FilterSelectedOption extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.title = '';
    this.hidden = false;
    this.callback = (data) => console.log('FilterSelectedOption Default Callback: ' + data.category + ', ' + data.title)
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    this.props.callback({
      'title': this.props.title,
      'category': this.props.category,
    });
  }

  render() {      
    if(this.props.hidden)
      return null;

    return (
      <Row>
        <h5 style={{ marginBottom: '1rem',marginLeft: '2em', whiteSpace: 'nowrap'}} onClick={this.onClick}>{this.props.title+'   '} <Icon type={'x-circle'} size={'sm'}/></h5>
      </Row>
    );
  }
}

export default FilterSelectedOption;