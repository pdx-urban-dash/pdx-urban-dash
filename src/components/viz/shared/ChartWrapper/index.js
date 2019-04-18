import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import './styles.scss';


const ChartWrapper = (
  {
    title,
    className,
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
        <Col>{nonLegendChildren}</Col>
        { legendChild }
      </Row>
    </Container>
  );
};

ChartWrapper.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

ChartWrapper.defaultProps = {
  title: '',
  className: '',
};

export default ChartWrapper;
