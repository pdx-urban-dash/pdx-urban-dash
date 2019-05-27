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
        key={`ud-filter-${filter}`}
        title={filter}
        onSelect={() => { toggleFilterOption(filterType, filter); }}
        isSelected={selectedFilters.some(selectedFilter => selectedFilter === filter)}
      />
    ))}
  </div>
);

AvailableFiltersPane.propTypes = {
  availableFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterType: PropTypes.string.isRequired,
  toggleFilterOption: PropTypes.func.isRequired,
  children: PropTypes.node,
};

AvailableFiltersPane.defaultProps = {
  children: undefined,
};

export default AvailableFiltersPane;
