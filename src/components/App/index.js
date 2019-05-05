import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const graphQlURI = process.env.GRAPHQL_URI || 'localhost:8080/graphql';
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

const App = () => (
  <ApolloProvider client={client}>
    <div>Hello Apollo GraphQL!</div>
  </ApolloProvider>
);

export default App;
