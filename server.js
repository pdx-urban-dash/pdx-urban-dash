const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const graphSchema = require('./src/graphAPI/schema');

const app = express();
const port = process.env.PORT || 8080;

const graphQlServer = new ApolloServer({
  typeDefs: graphSchema.typeDef,
  resolvers: graphSchema.resolvers,
  mocks: true,
});
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
graphQlServer.applyMiddleware({
  app,
  playground: {
    endpoint: `http://localhost:${port}/graphql`,
    settings: {
      'editor.theme': 'light',
    },
  },
  path: '/graphql',
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`📈 Listening on port ${port}`);
  console.log(`🚀 serving graphql API at http://localhost:${port}/graphql`);
});
