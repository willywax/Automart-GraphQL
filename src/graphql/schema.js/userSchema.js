// import { gql } from 'graphql';

export const userSchema = `
    type User {
        id: Int,
        first_name: String!,
        last_name: String!,
        email: String!,
        password: String!,
        is_admin: Boolean,
        token: String
    }
`;

export const userInput = `
    input UserInput {
        first_name: String!,
        last_name: String!,
        email: String!,
        password: String!,
    }
`;

