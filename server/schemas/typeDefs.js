const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        name: String
        email: String
        password: String
        image: String
        address: String
        postCode: String
        jobApplications: [Posting]
        activeJobs: [Posting]
        completedJobs: [Posting]
        ratings: [Rating]
    }

    type Posting {
        _id: ID!
        owner: User
        cost: String
        title: String
        description: String
        image: String
        status: String
        season: String
        createdAt: String
        applications: [User]
        chosenWorker: User
        workerNumber: String
    }

    type Rating {
        _id: ID!
        stars: Int
        comment: String
        createdAt: String
        byUser: User
        forUser: User
    }

    type Auth {
        token: ID!
        user: User  
      }

    type Query {
        posting: [Posting]!
        singlePosting(id: ID!): Posting
        me: User
        singleUser(id: ID!): User
        allUsers: [User]!
        sigleRating(id: ID!): Rating
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createPosting(input: createPostingInput!): Posting
        createUser(input: createUserInput!): Auth
        createRating(input: RatingInput!): Rating
        removePosting(id: ID!): Posting
        updatePosting(id: ID!, input: PostingInput!): Posting
        applyForJob(id: ID!): Posting
        removeApplication(id: ID!): Posting
    }

    input createUserInput {
        name: String
        email: String
        password: String
        image: String
        postCode: String
    }

    input PostingInput {
        title: String
        description: String
        cost: String
        status: String
    }

    input createPostingInput {
        cost: String
        description: String
        title: String
        image: String
        workerNumber: String
        status: String
    }

    input RatingInput {
        stars: Int
        comment: String
        byUser: ID
        forUser: ID
    }
`;


module.exports = typeDefs;