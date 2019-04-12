import { colors } from '../constants';

export const defaultColors = [
  colors.primary,
  colors.secondary,
  colors.tertiary,
  colors.fontDark,
];

export const getDefaultColor = idx => (
  idx < 0 ? defaultColors[4 - (Math.abs(idx) % 4)] : defaultColors[idx % defaultColors.length]
);
