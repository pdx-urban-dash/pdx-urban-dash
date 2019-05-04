import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle,
 } from 'reactstrap';
 import {
  SelectOption,
} from '../FilterComponents';

class OptionWrapper extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.title = '';
    this.hidden = false;
  };

  render() {
    
    if(this.props.hidden)
      return null;

    return (
      <Fragment>
        <Card>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            {this.props.children}
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

export default OptionWrapper;