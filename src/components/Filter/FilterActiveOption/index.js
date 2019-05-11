import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Icon from '../../Icon';

import './styles.scss';

export default class FilterActiveOption extends React.Component {
  constructor(props) {
    super(props);

    this.category = this.props;
    this.callback = this.props;

    this.state = {
      active: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      active: !state.active,
    }));
    this.props.callback(
      {
        category: this.props.category,
      },
    );
    return false;
  }

  render() {
    const { title } = this.props;
    const { category } = this.props;
    const { active } = this.state;

    if (!active || title === '' || category === '') {
      return null;
    }
    return (
      <Container className="filter-active-option" style={{ height: '22px', width: '220px', margin: '4px' }}>
        <Container style={{ height: '20px', width: '220px' }}>
          { category }
          <span onClick={this.handleClick} toggle={active ? true : this.callback} style={{ float: 'right', cursor: 'pointer' }}>
            <Icon size="sm" type="x-circle" />
          </span>
        </Container>
      </Container>
    );
  }
}

FilterActiveOption.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
