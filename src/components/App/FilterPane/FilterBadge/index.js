import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const FilterBadge = ({ title, isSelected, onSelect }) => (
  <div
    className={`ud-FilterBadge ud-clickable ${isSelected ? 'ud-FilterBadge--selected' : ''}`}
    onClick={onSelect}
  >
    {title}
  </div>
);

FilterBadge.propTypes = {
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
};

FilterBadge.defaultProps = {
  isSelected: false,
  onSelect: () => console.log('clicked...'),
};

export default FilterBadge;
