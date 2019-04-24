import PropTypes from 'prop-types';

export const colors = {
  fontDark: '#231123',
  fontLight: '#EFF7FF',
  primary: '#82204A',
  secondary: '#558C8C',
  tertiary: '#E8DB7D',
  success: '#6CC551',
  warning: '#ff9966',
  error: '#cc3300',
  trendLine: '#bcbcbc',
};

export const sizes = {
  fontXSM: '10px',
  fontSM: '14px',
  fontMD: '18px',
  fontLG: '28px',
  fontXL: '38px',
  spacing1: '4px',
  spacing2: '8px',
  spacing3: '16px',
  spacing4: '32px',
  spacing5: '48px',
  spacing6: '64px',
};

export const baseDataType = PropTypes.shape({
  metaData: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  target: PropTypes.number,
  targetTrend: PropTypes.string,
  axisLabels: PropTypes.arrayOf(PropTypes.string),
  dataSets: PropTypes.shape({
    metaData: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
    showTrendLine: PropTypes.bool,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  }),
});
