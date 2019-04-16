import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import './styles.scss';

// eslint-disable-next-line react/prefer-stateless-function
export default class Legend extends Component {
  static propTypes = {
    series: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      color: PropTypes.string,
    })).isRequired,
  };

  render() {
    const { series } = this.props;
    return (
      <Col>
        {
          series.map(s => (
            <div className="Legend-item" key={`legend-item-${s.title}`}>
<<<<<<< HEAD
              {s.color && <div className="Legend-colorIndicator" style={{ backgroundColor: s.color }} />}
=======
              {s.color && <div className="Legend-colorIndicator" style={{ backgroundColor: s.color }}/>}
>>>>>>> 1ab62bd72d313f1875f8ca362cdf0e840846ce01
              <span className="Legend-title">{s.title}</span>
              {s.description && <span className="Legend-description">{s.description}</span>}
            </div>
          ))
        }
      </Col>
    );
  }
}
