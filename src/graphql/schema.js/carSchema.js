
export const carSchema = `
    type Car {
        id: ID!,
        owner: User!,
        state: String!,
        status: String!,
        price: Int!,
        model: String!,
        manufacturer: String!,
        body_type: String!,
        primary_image: String
    }
`;
