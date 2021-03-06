import React from 'react';
import { Spinner } from 'react-bootstrap';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './Main';

const cache = new InMemoryCache();

const graphQlURI = process.env.GRAPHQL_URI;
const graphQlAuth = process.env.GRAPHQL_CRED || '';

const httpLink = new HttpLink({
  uri: graphQlURI,
  headers: {
    authorization: `Bearer ${
      graphQlAuth
    }`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache,
});

const sheetsDataQuery = gql`
  query {
    sheetsData {
      title
      description
      type
      categories
      target
      targetTrend
      trending
      axisLabels
      dataSets {
        title
        description
        color
        showTrendLine
        values {
          values
        }
      }
    }
  }`;


const App = () => (
  <ApolloProvider client={client}>
    <Query query={sheetsDataQuery}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Spinner color="primary" />;
        }
        if (error) {
          console.error(error);
        }
        if (data) {
          const { sheetsData } = data;
          return <Main data={sheetsData} />;
        }
        return <span />;
      }}
    </Query>
  </ApolloProvider>
);

export default App;
