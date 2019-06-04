import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { standardizedDataType, filterSetType } from '../../../propTypes';
import Header from '../Header';
import FilterPane from '../FilterPane';
import ChartPane from '../ChartPane';

const noFilterSet = {
  name: 'No Filters',
  categoryFilters: [],
  trendFilters: [],
  targetFilters: [],
  keywordFilters: [],
};

const Main = ({ data, filterSets }) => {
  const [visibleData, setVisibleData] = useState(data);
  const [showFilters, setFilterVisibility] = useState(false);
  const [selectedFilterSet, setSelectedFilterSet] = useState(undefined);
  if (!filterSets.some(filterSet => filterSet.name === noFilterSet.name)) {
    filterSets.push(noFilterSet);
  }
  return (
    <Fragment>
      <Header
        toggleFilterVisibility={() => setFilterVisibility(!showFilters)}
        setSelectedFilterSet={setSelectedFilterSet}
        filterSets={filterSets}
        isFilterVisible={showFilters}
      />
      <FilterPane
        data={data}
        setVisibleData={setVisibleData}
        visible={showFilters}
        loadFilterSet={selectedFilterSet}
      />
      <ChartPane visibleCharts={visibleData} />
    </Fragment>
  );
};

Main.propTypes = {
  data: PropTypes.arrayOf(standardizedDataType).isRequired,
  filterSets: PropTypes.arrayOf(filterSetType),
};

Main.defaultProps = {
  filterSets: [],
};

export default Main;
