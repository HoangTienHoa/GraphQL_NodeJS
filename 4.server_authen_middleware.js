const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
require("isomorphic-fetch");

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    ip: String
  }
`)

const loggingMiddleware = (req, res, next) => {
    console.log("ip:", req.ip);
    next()
}

let root = {
    ip: function (args, request) {
        console.log("rootip:", request.ip);
        return request.ip
    },
}

let app = express();
app.use(loggingMiddleware);
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)
app.listen(3000)
console.log("Running a GraphQL API server at http://localhost:3000/graphql")