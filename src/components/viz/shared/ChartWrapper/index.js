import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Icon from '../../../Icon';
import { trend } from '../../../../constants';

import './styles.scss';


const ChartWrapper = (
  {
    title,
    className,
    trending,
    onTarget,
    // eslint-disable-next-line
    children,
  },
) => {
  const nonLegendChildren = [];
  let legendChild = null;

  React.Children.forEach(children, (child) => {
    if (child.type.name === 'Legend') {
      legendChild = child;
    } else {
      nonLegendChildren.push(child);
    }
  });


  return (
    <Container className={`ChartWrapper-wrapper ${className}`}>
      <Row>
        <Col className="ChartWrapper-title">
          <span className="ChartWrapper-title">{title}</span>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col>{nonLegendChildren} </Col>
        <Col>
          <Row>
            <Col> <Icon type={trending} size="sm" /></Col>
            <Col> <Icon type={onTarget ? ('on-target') : ('off-target')} size="sm" /></Col>
          </Row>
          <Row> { legendChild } </Row>
        </Col>
      </Row>
    </Container>
  );
};

ChartWrapper.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  trending: PropTypes.oneOf(Object.values(trend)),
  onTarget: PropTypes.bool,
};

ChartWrapper.defaultProps = {
  title: '',
  className: '',
  trending: trend.up,
  onTarget: false,
};

export default ChartWrapper;
