import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import './styles.scss';


const ChartWrapper = (
  {
    title,
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
    <Container>
      <Row>
        <Col>
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
};

ChartWrapper.defaultProps = {
  title: '',
};

export default ChartWrapper;
