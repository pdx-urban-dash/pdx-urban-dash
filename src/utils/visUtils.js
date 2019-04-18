import { colors, category20 } from '../constants';

export const defaultColors = [
  colors.primary,
  colors.secondary,
  colors.tertiary,
  colors.fontDark,
];

export const getDefaultColor = idx => (
  idx < 0 ? defaultColors[4 - (Math.abs(idx) % 4)] : defaultColors[idx % defaultColors.length]
);

export const getTrendLineFunc = (points) => {
  const n = points.length;
  const sumOfProducts = points.reduce((acc, val) => acc + (val.x * val.y), 0);
  const sumOfX = points.reduce((acc, val) => acc + val.x, 0);
  const sumOfY = points.reduce((acc, val) => acc + val.y, 0);
  const sumOfXsq = points.reduce((acc, val) => (acc + (val.x ** 2)), 0);

  const slope = ((n * sumOfProducts) - (sumOfX * sumOfY)) / ((n * sumOfXsq) - (sumOfX ** 2));
  const offset = (sumOfY - (slope * sumOfX)) / n;

  return x => (slope * x) + offset;
};
export const defaultDonutColors = [
  category20.color1,
  category20.color2,
  category20.color3,
  category20.color4,
  category20.color5,
  category20.color6,
  category20.color7,
  category20.color8,
  category20.color9,
  category20.color10,
  category20.color11,
  category20.color12,
  category20.color13,
  category20.color14,
  category20.color15,
  category20.color16,
  category20.color17,
  category20.color18,
  category20.color19,
  category20.color20,
];

export const getDefaultDonutColor = idx => (
  idx < 0 ? defaultDonutColors[20 - (Math.abs(idx) % 20)]
    : defaultDonutColors[idx % defaultDonutColors.length]
);
