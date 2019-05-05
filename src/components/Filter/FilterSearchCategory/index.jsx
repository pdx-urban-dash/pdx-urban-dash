import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle,
 } from 'reactstrap';

class FilterCategory extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.checkForChildren = this.checkForChildren.bind(this);

    this.title = '';
    this.hidden = false;
    this.callback = (val) => console.log(val);
  };

  checkForChildren(category){
    console.log(this.props.children + " (FilterSearchCategory, checkForChildren)");
    return null;
  }

  render() {

    if(this.props.hidden)
      return null;

    return (
      <Fragment>
        <Card>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            {this.props.children}
            {this.checkForChildren()}
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

export default FilterCategory;