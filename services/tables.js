const userTable = `CREATE TABLE IF NOT EXISTS
        users(
          id VARCHAR PRIMARY KEY,
          first_name VARCHAR(128) NOT NULL,
          last_name VARCHAR (128) NOT NULL,
          password VARCHAR(128) NOT NULL,
          email VARCHAR(128) NOT NULL,
          address VARCHAR(128) NOT NULL,
          is_admin BOOLEAN DEFAULT false,
          created_at DATE DEFAULT CURRENT_DATE
        )`;
const carTable = `CREATE TABLE IF NOT EXISTS 
        cars(
            id VARCHAR PRIMARY KEY,
            owner VARCHAR (100) NOT NULL,
            state VARCHAR (100) NOT NULL,
            status VARCHAR (100) NOT NULL,
            price DECIMAL NOT NULL,
            model VARCHAR (255) NOT NULL,
            manufacturer VARCHAR (255) NOT NULL,
            body_type VARCHAR (100) NOT NULL,
            primary_image VARCHAR(255) NOT NULL,

            created_at DATE DEFAULT CURRENT_DATE
        )`;
const ordersTable = `CREATE TABLE IF NOT EXISTS 
        orders(
            id VARCHAR PRIMARY KEY,
            buyer VARCHAR (100) NOT NULL,
            car VARCHAR (100) NOT NULL,
            status VARCHAR (100) NOT NULL,
            price_offered DECIMAL NOT NULL,
            created_at DATE DEFAULT CURRENT_DATE
        )`;
const flagsTable = `CREATE TABLE IF NOT EXISTS 
        flags(
            id VARCHAR PRIMARY KEY,
            car VARCHAR (100) NOT NULL,
            reason VARCHAR (100) NOT NULL,
            description VARCHAR (255) NOT NULL,
            created_at DATE DEFAULT CURRENT_DATE
        )`;

const dropSchema = `DROP SCHEMA IF EXISTS public CASCADE`;

const createSchema = `CREATE SCHEMA IF NOT EXISTS public`;

const tables = [userTable, carTable, ordersTable, flagsTable];

module.exports = { dropSchema, createSchema, tables };
//module.exports = [automartSchema, tables];
