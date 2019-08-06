import pool from "./connection";
import { dropSchema } from "./tables";

pool
  .query(dropSchema)
  .then(res => {
    console.log(query);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
