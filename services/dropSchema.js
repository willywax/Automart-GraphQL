const pool = require("./connection");

const { dropSchema } = require("./tables");

pool
  .query(dropSchema)
  .then(res => {
    console.log(query);
    return res;
  })
  .catch(err => {
    console.log(err);
    return err;
  });
