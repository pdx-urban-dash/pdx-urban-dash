import React from 'react';
import PropTypes from 'prop-types';
import { filterSetType } from '../../../../propTypes';
import Icon from '../../../Icon';

import { FILTERS } from '..';

const SelectedFiltersPane = ({ filterSet, toggleFilter }) => (
  <div>
    {Object.keys(filterSet).map(key => {
      if (key !== 'name') {
        return (
          <div className="ud-SelectedFiltersPane" key={`ud-selected-filter-cat-${key}`}>
            {filterSet[key].map(filter => (
              <div>
                <span>{filter}</span>
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
