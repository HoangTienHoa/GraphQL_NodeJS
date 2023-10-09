const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
require("isomorphic-fetch");

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`)

// This class implements the RandomDie GraphQL type
class RandomDie {
    constructor(numSides) {
        this.numSides = numSides
    }

    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides)
    }

    roll({ numRolls }) {
        let output = []
        for (let i = 0; i < numRolls; i++) {
            output.push(this.rollOnce())
        }
        return output
    }
}

// The root provides the top-level API endpoints
let root = {
    getDie: ({ numSides }) => {
        return new RandomDie(numSides || 6)
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

app.listen(3000)
console.log("Running a GraphQL API server at http://localhost:3000/graphql")