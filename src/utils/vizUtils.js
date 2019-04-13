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
