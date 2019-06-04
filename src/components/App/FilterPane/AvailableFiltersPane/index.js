import React from 'react';
import PropTypes from 'prop-types';

import FilterBadge from '../FilterBadge';
import './styles.scss';

const AvailableFiltersPane = ({
  availableFilters,
  selectedFilters,
  filterType,
  toggleFilterOption,
  children,
}) => (
  <div className="ud-AvailableFiltersPane">
    {children}
    {availableFilters.map(filter => (
      <FilterBadge
        key={`ud-filter-${filter.key}`}
        title={filter.label}
        onSelect={() => { toggleFilterOption(filterType, filter.key); }}
        isSelected={selectedFilters.some(selectedFilter => selectedFilter === filter.key)}
      />
    ))}
  </div>
);

AvailableFiltersPane.propTypes = {
  availableFilters: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterType: PropTypes.string.isRequired,
  toggleFilterOption: PropTypes.func.isRequired,
  children: PropTypes.node,
};

AvailableFiltersPane.defaultProps = {
  children: undefined,
};

export default AvailableFiltersPane;
