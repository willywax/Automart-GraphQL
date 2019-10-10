import client from "../services/connection";

export let selectQuery = async (tableName, column, value) => {
  let query = `SELECT * from ${tableName} WHERE ${column}= '${value}'`;

  let result = client.query(query).catch(error => console.log(error));

  return result;
};

export let deleteQuery = async (tableName, column, value) => {
  let query = `DELETE FROM ${tableName} WHERE ${column}='${value}'`;

  let result = client.query(query);

  return result;
};

export let insertQuery = async (tableName, values) => {
  let query = `INSERT INTO ${tableName} VALUES (${values})`;

  let result = client.query(query);

  return result;
};
