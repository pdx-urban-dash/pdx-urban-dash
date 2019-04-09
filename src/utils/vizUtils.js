import { colors } from '../constants';

const defaultColors = [
  colors.primary,
  colors.secondary,
  colors.tertiary,
  colors.fontDark,
];

// eslint-disable-next-line
export const getDefaultColor = idx => defaultColors[idx % defaultColors.length];