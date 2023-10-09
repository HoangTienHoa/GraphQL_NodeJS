const express = require('express');
const { buildSchema } = require('graphql');
const {graphqlHTTP} = require("express-graphql");
// GraphQL schema
const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);
const coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]
let getCourse = function(args) {
    let id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}
let getCourses = function(args) {
        if (args.topic) {
        let topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}
let root = {
    course: getCourse,
    courses: getCourses
};
// Create an express server and a GraphQL endpoint
let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
/*

    //Cach 1: Get course
    //Get course base on id
    {
      course(id:1){
        id,
        title
      }
    }
    //Cach 2: Get courses base on topic
    {
      courses(topic:"Node.js"){
        id,
        title
      }
    }

    //Cach 3. Query Code:
    //Query
    query getSingleCourse($courseID: Int!) {
        course(id: $courseID) {
            title
            author
            description
            topic
            url
        }
    }
    //Query Variable
    {
        "courseID":1
    }
    //Cach 4: Using Aliases & Fragments
    //Query
    query getCourseWithFragments($courseID1: Int!, $courseID2: Int!) {
          course1: course(id: $courseID1) {
                 ...courseFields
          },
          course2: course(id: $courseID2) {
                ...courseFields
          }
    }
    fragment courseFields on Course {
        title
        author
        description
        topic
        url
    }
    //Query Variable
    {
        "courseID1":1,
        "courseID2":2
    }
 */
app.listen(3000)
console.log("Running a GraphQL API server at http://localhost:3000/graphql")