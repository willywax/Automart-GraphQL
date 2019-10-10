const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  productions: {
    use_env_variables: "DATABASE_URL",
    dialect: "postgres"
  },
  development: {
    use_env_variables: "DEV_DATABASE_URL",
    dialect: "postgres"
  },
  test: {
    use_env_variables: "TEST_DATABASE_URL",
    dialect: "postgres"
  }
};
