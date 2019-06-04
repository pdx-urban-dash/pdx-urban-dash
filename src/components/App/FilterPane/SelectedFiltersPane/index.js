import React from 'react';
import PropTypes from 'prop-types';
import { trend, target } from '../../../../constants';
import { filterSetType } from '../../../../propTypes';
import Icon from '../../../Icon';
import './styles.scss';

import { FILTERS } from '..';

const getFilterSetName = filterSetKey => Object.values(FILTERS)
  .find(filter => filter.key === filterSetKey).name;

const getFilterName = (filterKey, filterType) => {
  switch (filterType) {
    case FILTERS.TARGET.key:
      return Object.values(target).find(val => val.key === filterKey).label;
    case FILTERS.TREND.key:
      return Object.values(trend).find(val => val.key === filterKey).label;
    default:
      return filterKey;
  }
};

const SelectedFiltersPane = ({ filterSet, toggleFilter }) => (
  <div>
    {Object.keys(filterSet).map((key) => {
      if (key !== 'name') {
        return (
          <div className="ud-SelectedFiltersPane" key={`ud-selected-filter-cat-${key}`}>
            {filterSet[key].length > 0 && <h3>{getFilterSetName(key)}</h3>}
            {filterSet[key].map(filter => (
              <div className="ud-SelectedFiltersPane-toggle" key={`ud-selected-filter-toggle-${filter}`}>
                <span>{getFilterName(filter, key)}</span>
                <span
                  className="ud-clickable ud-SelectedFiltersPane-icon"
                  onClick={() => toggleFilter(key, filter)}
                >
                  <Icon type="x-circle" size="xs" />
                </span>
              </div>
            ))}
          </div>
        );
      }
      return null;
    })}
  </div>
);

SelectedFiltersPane.propTypes = {
  filterSet: filterSetType.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};

export default SelectedFiltersPane;
