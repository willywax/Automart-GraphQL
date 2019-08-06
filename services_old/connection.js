import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.ENV === "testing"
    ? process.env.TEST_URL
    : process.env.DATABASE_URL;

export let pool = new Pool({ connectionString: connectionString });

export let client = (queries, params) => {
  return new Promise((resolve, reject) => {
    pool
      .query(queries, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
