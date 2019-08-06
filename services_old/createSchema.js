import pool from "./connection";
import { createSchema } from "./tables";

pool
  .query(createSchema)
  .then(res => {
    console.log(query);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
