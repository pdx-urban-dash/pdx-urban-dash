import React from 'react';
import PropTypes from 'prop-types';
import { createClassFromSpec } from 'react-vega';

import { injectPropsIntoSchema } from '../../../utils/vegaUtils';
import { getDefaultColor } from '../../../utils/vizUtils';
import { colors, sizes } from '../../../constants';
import TreemapSchema from './schema';
import './styles.scss';

import Legend from '../shared/Legend';
import ChartWrapper from '../shared/ChartWrapper';

const buildTreemapData = (data) => {
  const retData = [{
    name: 'City Of Portland',
    id: 'City Of Portland',
  }];
  data.forEach((dataSet) => {
    const bureauName = dataSet.Bureau;
    const serviceName = dataSet['City Service Area'];
    const councilName = dataSet['Council Priority Area'];
    const measureName = dataSet['Measure Title'];
    const measureValue = dataSet['FY 2017-18 Actual'];

    const bureauID = bureauName;
    const serviceID = `${bureauName}, ${serviceName}`;
    const councilID = `${serviceID}, ${serviceName}`;
    const measureID = `${councilID}, ${measureName}`;

    if (retData.findIndex(x => x.id === councilID) === -1) {
      retData.push({
        name: councilName,
        id: councilID,
        parent: serviceID,
      });

      if (retData.findIndex(x => x.id === serviceID) === -1) {
        retData.push({
          name: serviceName,
          id: serviceID,
          parent: bureauID,
        });

        if (retData.findIndex(x => x.id === bureauID) === -1) {
          retData.push({
            id: bureauID,
            name: bureauName,
            parent: 'City Of Portland',
          });
        }
      }
    }

    retData.push({
      name: measureName,
      id: measureID,
      parent: councilID,
      size: measureValue,
    });
  });
  console.log(retData);
  return retData;
};

const getColors = data => data.map((elem, idx) => elem.barColor || getDefaultColor(idx));

const Treemap = (
  {
    data,
    title,
    className,
    colorScheme,
  },
) => {
  const colorRange = getColors(data);
  const Graph = createClassFromSpec(
    injectPropsIntoSchema(
      {
        $dataValues: {
          name: 'values',
          value: buildTreemapData(data),
        },
        $labelColor: {
          name: 'labelColor',
          value: colorScheme === 'light' ? colors.fontDark : colors.fontLight,
        },
        $labelFontSize: {
          name: 'labelFontSize',
          value: parseInt(sizes.fontSM.slice(0, -2), 10),
        },
        $colorRange: {
          name: 'range',
          value: colorRange,
        },
      },
      TreemapSchema,
    ),
  );
  return (
    <ChartWrapper title={title} className={className}>
      <Graph />
      <Legend
        series={data.map((elem, idx) => ({
          title: elem.dataSetName,
          description: elem.description,
          color: elem.barColor || getDefaultColor(idx),
        }))}
      />
    </ChartWrapper>
  );
};

Treemap.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    dataSetName: PropTypes.string,
    barColor: PropTypes.string,
    description: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })),
  })).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  colorScheme: PropTypes.oneOf(['light', 'dark']),
};

Treemap.defaultProps = {
  title: 'chart title',
  className: '',
  colorScheme: 'light',
};

export default Treemap;
