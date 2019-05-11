import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

export default class FilterSearchOption2 extends React.Component {
  constructor(props) {
    super(props);

    this.title = this.props;
    this.category = this.props;
    this.state = {
      selected: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      selected: !state.selected,
    }));

    const title = this.props;
    const category = this.props;
    this.props.callback(
      {
        title,
        category,
      },
    ); // Need to fix this
    return false;
  }

  render() {
    const { title } = this.props;
    const { category } = this.props;
    const { selected } = this.state;
    if (category === '' || title === '') {
      return null;
    }
    return (
      <Container style={{ cursor: 'pointer', background: selected ? 'green' : '', border: 'solid' }} onClick={this.handleClick}>
        <Container toggle={!selected ? false : this.callback}>
          { title }
        </Container>
      </Container>
    );
  }
}

FilterSearchOption2.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
