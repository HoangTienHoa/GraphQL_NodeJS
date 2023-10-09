# GraphQL_NodeJS
Use GraphQL and NodeJS

+ There are more powerful clients like Relay which can automatically handle batching, caching, and other features.
+ But you don't need a complex client to call a GraphQL server. With express-graphql,
  you can just send an HTTP POST request to the endpoint you mounted your GraphQL server on, 
  passing the GraphQL query as the query field in a JSON payload.

# Call a GraphQL API
#1: Using GraphQL IDEs (Apollo Explorer)
  GraphQL IDEs let you build queries, browse schemas, and test out GraphQL APIs.
  https://studio.apollographql.com/

#2: Curl
  Run on terminal to Send HTTP POST request with header + query.

  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ hello }"}' \
  http://localhost:3000/graphql


#3: Fetch. Make a GraphQL HTTP request i
//NodeJS Code
  require("isomorphic-fetch");
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

//Js code run on Developer Console on browser
  fetch("/graphql", {
  method: "POST",
  headers: {
  "Content-Type": "application/json",
  Accept: "application/json",
  },
  body: JSON.stringify({ query: "{ hello }" }),
  })
  .then(r => r.json())
  .then(data => console.log("data returned:", data))

#4: Using GraphQL clients (Apollo Client)
  Ex: https://www.apollographql.com/blog/graphql/examples/4-simple-ways-to-call-a-graphql-api/
# Ref
    https://graphql.org/graphql-js/running-an-express-graphql-server/
