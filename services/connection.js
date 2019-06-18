const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const connectionString =
  process.env.ENV === "testing"
    ? process.env.TEST_URL
    : process.env.DATABASE_URL;

const pool = new Pool({ connectionString: connectionString });

module.exports = pool;
