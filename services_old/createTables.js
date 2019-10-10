import pool from "./connection";
import { tables } from "./tables";

tables.forEach(element => {
  prepareTables(element);
});

function prepareTables(query) {
  pool
    .query(query)
    .then(res => {
      console.log(query);
    })
    .catch(err => {
      console.log(err);
    });
}
