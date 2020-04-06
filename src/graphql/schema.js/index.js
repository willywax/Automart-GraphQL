import { buildSchema } from 'graphql';
import { userInput, userSchema } from './userSchema';
import { carSchema } from './carSchema';

const schema = buildSchema(
    `
    ${userSchema}
    ${userInput}

    ${carSchema}

    
    type Query {
        hello: String
        getCars(type: String, model: String, price:Int, owner:String): [Car!]
        getOneCar(id: Int!): Car
    }

    type Mutation {
        createUser(first_name: String!, last_name: String!, email: String!, password: String!): User
        loginUser(email: String!, password: String!): User
        saveCar(manufacturer: String!, body_type: String!, model: String!, state: String!, price: Int!, owner:Int!): Car
        updateCar(id: Int!, manufacture: String, body_type: String, model: String, state: String, price: Int, owner:Int): Car
    }

    `
);

export default schema;