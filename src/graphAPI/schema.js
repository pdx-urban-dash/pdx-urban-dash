const { gql } = require('apollo-server-express');

const typeDef = gql`
enum TrendType {
  UP
  DOWN
  NEUTRAL
}

enum ChartType {
  LINE
  BAR
  DONUT
}

enum TargetTrendType {
  ON_TARGET
  OFF_TARGET
  TRENDING_TO_TARGET
  TRENDING_FROM_TARGET
}

type FilterSet {
  categories: [String!]!
  trends: [TrendType!]!
  targets: [TargetTrendType!]!
  keywords: [String!]!
}

type DataSetValue {
  values: [String!]!
}

type DataSet {
  # This is to store non-visible info about this particular data set
  metaData: String
  title: String!
  description: String
  # If this is a bar/line chart, the color to use.
  # Otherwise, a chart may use a DataSetValue to specify colors per data point
  color: String
  showTrendLine: Boolean!
  values: [DataSetValue!]!
}

# Represents a single chart's data
type VizData {
  # This is to store non-visible info about the chart information
  metaData: String
  title: String!
  description: String
  type: ChartType!
  categories: [String!]!
  target: Float
  targetTrend: TrendType
  trending: TrendType
  axisLabels: [String!]!
  dataSets: [DataSet!]!
}

type Query {
  sheetsData: [VizData!]!
}
`;

const resolvers = {
  Query: {
    sheetsData: async (_source, _args, { dataSources }) => dataSources.googleSheetsAPI.getCharts(),
  },
};

module.exports = {
  typeDef,
  resolvers,
};
