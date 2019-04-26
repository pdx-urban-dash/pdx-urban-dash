import React from 'react';
import PropTypes from 'prop-types';
import {
  Target,
  TrendingUp,
  TrendingDown,
  Maximize,
  Minimize,
  GitHub,
} from 'react-feather';

import { colors, iconSizes } from '../../constants';

const Icon = ({ size, type }) => {
  const validSizes = {
    sm: iconSizes.small,
    md: iconSizes.medium,
    lg: iconSizes.large,
    xl: iconSizes.xlarge,
  };

  const mSize = Object.keys(validSizes).includes(size) ? size : 'md';

  switch (type.toLowerCase()) {
    case 'target':
      return <Target size={validSizes[mSize]} />;
    case 'off-target':
      return <Target size={validSizes[mSize]} color={colors.warning} />;
    case 'on-target':
      return <Target size={validSizes[mSize]} color={colors.success} />;
    case 'trending-up':
      return <TrendingUp size={validSizes[mSize]} />;
    case 'trending-down':
      return <TrendingDown size={validSizes[mSize]} />;
    case 'maximize':
      return <Maximize size={validSizes[mSize]} />;
    case 'minimize':
      return <Minimize size={validSizes[mSize]} />;
    case 'github':
      return <GitHub size={validSizes[mSize]} />;
    default:
      throw new Error(`Icon type: ${type} does not exist`);
  }
};

Icon.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  size: 'md',
};

export default Icon;
