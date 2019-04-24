import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { baseDataType } from '../../../constants';
import './styles.scss';

const FILTER_TYPE = {
  CATEGORY: 'category',
  TREND: 'trend',
  TREND_TO_TARGET: 'trendTowardTarget',
  DIFF_FROM_TARGET: 'diffFromTarget',
};


const addFilter = (type, callback, filterSet) => {
  const newFilterSet = filterSet.slice(0); // clone array
  let found = false;
  newFilterSet.forEach((filter) => {
    if (filter.type === type) {
      filter.funcs.push(callback);
      found = true;
    }
  });
  if (!found) {
    newFilterSet.push({
      type,
      funcs: [callback],
    });
  }

  return newFilterSet;
};

const applyFilter = (filter, element) => filter.funcs.some(fn => fn(element));

export default class Filters extends Component {
  static propTypes = {
    setFilteredData: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(baseDataType).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      filters: [],
    };
  }

  filterData() {
    const { filters } = this.state;
    const { data, setFilteredData } = this.props;
    const filteredData = data.filter(elem => filters.every(filter => applyFilter(filter, elem)));
    setFilteredData(filteredData);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>

          </Col>
          <Col>

          </Col>
        </Row>
      </Container>
    );
  }
};
