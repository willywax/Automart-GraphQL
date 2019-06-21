const client = require("../services/connection");

const selectQuery = async (tableName, column, value) => {
  let query = `SELECT * from ${tableName} WHERE ${column}= '${value}'`;

  let result = client.query(query).catch(error => console.log(error));

  return result;
};

const deleteQuery = async (tableName, column, value) => {
  let query = `DELETE FROM ${tableName} WHERE ${column}='${value}'`;

  let result = client.query(query);

  return result;
};

module.exports = { selectQuery, deleteQuery };
