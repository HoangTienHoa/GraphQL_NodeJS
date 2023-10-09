const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
require("isomorphic-fetch");

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within"
    },
    random: () => {
        return Math.random()
    },
    rollThreeDice: () => {
        return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
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
app.get("/",async (req, res)=>{
    let dice = 3
    let sides = 6
    let query = `query RollDice($dice: Int!, $sides: Int) {rollDice(numDice: $dice, numSides: $sides)}`;

    fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ query: "{ quoteOfTheDay,random ,rollThreeDice}" }),
    }).then(r => r.json())
        .then(data => {
            console.log("data returned:", data);
            res.send(data);
        });
})
app.listen(3000)
console.log("Running a GraphQL API server at http://localhost:3000/graphql")