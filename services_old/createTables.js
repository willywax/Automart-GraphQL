const pool = require("./connection");

const { tables } = require("./tables");

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
