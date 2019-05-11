import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FilterSearchOption from '../FilterSearchOption';

export default class FilterSearchGroup extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.children = props.children;

    this.renderSearchOption = this.renderSearchOption.bind(this);
  }

  renderSearchOption(child) {
    return (
      <FilterSearchOption
        key={child}
        title={this.title}
        category={child}
      />
    );
  }

  render() {
    const { title } = this.props;
    const { children } = this.props;
    return (
      <Fragment>
        <hr />
        <h2 style={{ marginBottom: '1rem' }}>
          { title }
        </h2>
        { children }
      </Fragment>
    );
  }
}

FilterSearchGroup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.string),
};

FilterSearchGroup.defaultProps = {
  children: [],
};
