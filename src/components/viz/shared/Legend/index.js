import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Legend = ({ series }) => (
  <div className="Legend-wrapper">
    {
      series.map(s => (
        <div className="Legend-item">
          { s.color && <div className="Legend-colorIndicator" style={{ backgroundColor: s.color }} /> }
          <span className="Legend-title">{s.title}</span>
          { s.description && <span className="Legend-description">{s.description}</span> }
        </div>
      ))
    }
  </div>
);

Legend.propTypes = {
  series: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string,
  })).isRequired,
};

export default Legend;
