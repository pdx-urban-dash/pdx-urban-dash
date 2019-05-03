import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Icon from '../../../Icon';

import './styles.scss';


const ChartWrapper = (
  {
    title,
    className,
    iconType,
    iconSize,
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
          <Row> <Icon type={iconType} size={iconSize} /> </Row>
          <Row> { legendChild } </Row>
        </Col>
      </Row>
    </Container>
  );
};

ChartWrapper.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  iconType: PropTypes.string,
  iconSize: PropTypes.string,
};

ChartWrapper.defaultProps = {
  title: '',
  className: '',
  iconType: '',
  iconSize: '',
};

export default ChartWrapper;
