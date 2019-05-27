import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';

import { filterSetType, standardizedDataType } from '../../../propTypes';
import { trend, target } from '../../../constants';
import AvailableFiltersPane from './AvailableFiltersPane';

import './styles.scss';

export const FILTERS = {
  CATEGORY: {
    apply: (dataSetItem, categories) => {
      if (categories.length === 0) return true;
      return dataSetItem.categories.some(
        dataCategory => categories.some(
          filterCategory => (
            filterCategory.toLocaleLowerCase() === dataCategory.toLocaleLowerCase()
          ),
        ),
      );
    },
    key: 'categoryFilters',
    label: 'Category filters',
    name: 'Category',
  },
  TARGET: {
    apply: (dataSetItem, targets) => {
      if (targets.length === 0) return true;
      return false;
    },
    key: 'targetFilters',
    label: 'Target filters',
    name: 'Target',
  },
  TREND: {
    apply: (dataSetItem, trends) => {
      if (trends.length === 0) return true;
      return trends.some(trend => dataSetItem.dataSets.some(setTrend => trend === setTrend));
    },
    key: 'trendFilters',
    label: 'Trend filters',
    name: 'Trend',
  },
  KEYWORD: {
    apply: (dataSetItem, keywords) => {
      if (keywords.length === 0) return true;
      const mKeyWords = keywords.map(keyword => keyword.toLocaleLowerCase());
      const matchesCategory = dataSetItem.categories.some(
        dataCategory => mKeyWords.some(
          keyword => (
            keyword.includes(dataCategory.toLocaleLowerCase())
          ),
        ),
      );
      const matchesDescription = mKeyWords.some(keyword => (
        (dataSetItem.description || '')
          .toLocaleLowerCase()
          .includes(keyword)));
      const matchesAxisLabels = dataSetItem.axisLabels.some(
        axisLabel => mKeyWords.some(
          keyword => axisLabel.toLocaleLowerCase().includes(keyword),
        ),
      );
      return matchesCategory || matchesDescription || matchesAxisLabels;
    },
    key: 'keywordFilters',
    label: 'Search for a keyword',
    name: 'Keyword',
  },
};

const filterDataSets = (data, filterSet) => (
  data
    .filter(dataSetItem => FILTERS.CATEGORY.apply(dataSetItem, filterSet[FILTERS.CATEGORY.key]))
    .filter(dataSetItem => FILTERS.KEYWORD.apply(dataSetItem, filterSet[FILTERS.KEYWORD.key]))
    .filter(dataSetItem => FILTERS.TREND.apply(dataSetItem, filterSet[FILTERS.TREND.key]))
    .filter(dataSetItem => FILTERS.TARGET.apply(dataSetItem, filterSet[FILTERS.TARGET.key]))
);

const getCategoriesFromData = data => data.flatMap(dataSetItem => dataSetItem.categories);

const FilterPane = ({
  data,
  setVisibleData,
  filterSet,
  visible,
}) => {
  const mFilterSet = filterSet || {
    name: 'Custom',
    categoryFilters: [],
    trendFilters: [],
    targetFilters: [],
    keywordFilters: [],
  };
  const [activeFilters, setActiveFilters] = useState(mFilterSet);
  const [activeFilterPane, setActiveFilterPane] = useState(FILTERS.CATEGORY.label);
  const [isFilterTypeSelectOpen, setFilterTypeSelectOpen] = useState(false);
  const toggleFilterTypeDropdown = () => {
    setFilterTypeSelectOpen(!isFilterTypeSelectOpen);
  };
  const toggleFilter = (filterType, filter) => {
    const newFilters = { ...activeFilters };
    if (activeFilters[filterType].every(filterName => filterName !== filter)) {
      newFilters[filterType].push(filter);
      setActiveFilters(newFilters);
    } else {
      newFilters[filterType] = newFilters[filterType]
        .filter(filterName => filterName !== filter);
      setActiveFilters(newFilters);
    }
    setVisibleData(filterDataSets(data, newFilters));
  };
  return (
    <div className={`ud-FilterPane ${visible ? 'ud-FilterPane--show' : 'ud-FilterPane--hide'}`}>
      <Jumbotron>
        <Container fluid>
          <Row>
            <Col sm={8}>
              <Dropdown isOpen={isFilterTypeSelectOpen} toggle={toggleFilterTypeDropdown}>
                <DropdownToggle className="ud-FilterPane-filter-type-dropdown" caret>{activeFilterPane}</DropdownToggle>
                <DropdownMenu className="ud-FilterPane-filter-type-dropdown">
                  {Object.keys(FILTERS).map(key => (
                    <DropdownItem onClick={() => setActiveFilterPane(FILTERS[key].label)}>
                      {FILTERS[key].label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {activeFilterPane === FILTERS.CATEGORY.label && (
                <AvailableFiltersPane
                  filterType={FILTERS.CATEGORY.key}
                  availableFilters={getCategoriesFromData(data)}
                  selectedFilters={activeFilters[FILTERS.CATEGORY.key]}
                  toggleFilterOption={toggleFilter}
                />
              )}
              {activeFilterPane === FILTERS.TREND.label && (
                <AvailableFiltersPane
                  filterType={FILTERS.TREND.key}
                  availableFilters={Object.values(trend)}
                  selectedFilters={activeFilters[FILTERS.TREND.key]}
                  toggleFilterOption={toggleFilter}
                />
              )}
              {activeFilterPane === FILTERS.TARGET.label && (
                <AvailableFiltersPane
                  filterType={FILTERS.TARGET.key}
                  availableFilters={Object.values(target)}
                  selectedFilters={activeFilters[FILTERS.TARGET.key]}
                  toggleFilterOption={toggleFilter}
                />
              )}
              {activeFilterPane === FILTERS.KEYWORD.label && (
                <AvailableFiltersPane
                  filterType={FILTERS.KEYWORD.key}
                  availableFilters={activeFilters[FILTERS.KEYWORD.key]}
                  selectedFilters={activeFilters[FILTERS.KEYWORD.key]}
                  toggleFilterOption={toggleFilter}
                >

                </AvailableFiltersPane>
              )}
            </Col>
            <Col sm={4}>
              selected filters...
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
};

FilterPane.propTypes = {
  data: PropTypes.arrayOf(standardizedDataType),
  setVisibleData: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  filterSet: filterSetType,
};

FilterPane.defaultProps = {
  data: [],
  visible: false,
  filterSet: undefined,
};

export default FilterPane;
