import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

export default class FilterSearchCategory extends React.Component {
  constructor(props) {
    super(props);

    this.title = props.title;
    this.hidden = props.hidden;
  }

  render() {
    const { hidden } = this.props;
    const { title } = this.props;
    const { children } = this.props;
    if (hidden) {
      return null;
    }
    return (
      <Container>
        <hr />
        <h3 style={{ marginBottom: '1rem' }}>
          { title }
        </h3>
        { children }
      </Container>
    );
  }
}

FilterSearchCategory.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.string),
  hidden: PropTypes.bool,
};

FilterSearchCategory.defaultProps = {
  hidden: false,
  children: [],
};
