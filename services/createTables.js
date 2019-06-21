const pool = require("./connection");

const { userTable } = require("./tables");

prepareTables(userTable);

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
