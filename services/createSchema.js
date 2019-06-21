const pool = require("./connection");

const { createSchema } = require("./tables");

pool
  .query(createSchema)
  .then(res => {
    console.log(query);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
