const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');

const graphQlSchema = require('./graqhql/schema/index');
const graphQlResolvers = require('./graqhql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-j6h1r.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
