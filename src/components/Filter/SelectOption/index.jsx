import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonGroup,
  Button
} from 'reactstrap';
import Icon from "../../Icon";


export default class SelectOption extends Component {

  static propTypes = {
      text: PropTypes.string.isRequired,
      icon: PropTypes.node,
    };

  constructor (props) {
    super(props);

    this.state = { 
      icon: null,
      iconWrapper: null,
    };

    this.updateIcon = this.updateIcon.bind(this);
  }

  updateIcon(selected) {
    this.setState({
      icon: <Icon type='target' size='sm' />,
      iconWrapper: <Button color="success" onClick={() => this.updateIcon(1)} active="false"> <Icon type='target' size='sm' /></Button>,
    }) 
  }

  render() {
    return (
      <Fragment>
        <ButtonGroup>
          <Button color="primary" onClick={() => this.updateIcon(1)}>{ this.props.text} </Button>
          {this.state.iconWrapper}
        </ButtonGroup>
      </Fragment>
    );
  }
}

