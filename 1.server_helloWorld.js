const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
require("isomorphic-fetch");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each API endpoint
//Provide data for each API endpoint
const root = {
    hello: () => {
        return "Hello world!"
    },
}

let app = express();
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)
app.get("/", (req, res)=>{
    fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ query: "{ hello }" }),
    })
        .then(r => r.json())
        .then(data => {
            console.log("data returned:", data);
            res.send(data);
        })
})
app.listen(3000)
console.log("Running a GraphQL API server at http://localhost:3000/graphql")