import PropTypes from 'prop-types';

export const dataSetType = PropTypes.shape({
  metaData: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string,
  showTrendLine: PropTypes.bool.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      values: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
});

export const standardizedDataType = PropTypes.shape({
  metaData: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  target: PropTypes.number,
  targetTrend: PropTypes.string,
  trending: PropTypes.string,
  axisLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataSets: PropTypes.arrayOf(dataSetType),
});

export const filterSetType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  categoryFilters: PropTypes.arrayOf(PropTypes.string),
  trendFilters: PropTypes.arrayOf(PropTypes.string),
  targetFilters: PropTypes.arrayOf(PropTypes.string),
  keywordFilters: PropTypes.arrayOf(PropTypes.string),
});
