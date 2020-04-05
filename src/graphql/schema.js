import { buildSchema } from 'graphql';

const schema = buildSchema(
    `
    type User {
        first_name: String!,
        last_name: String!,
        email: String!,
        password: String!,
        is_admin: Boolean,
        token: String
    }

    input UserInput {
        first_name: String!,
        last_name: String!,
        email: String!,
        password: String!,
    }

    type Query {
        hello: String
    }

    type Mutation {
        createUser(first_name: String!, last_name: String!, email: String!, password: String!): User
        loginUser(email: String!, password: String!): User
    }

    `
);

export default schema;