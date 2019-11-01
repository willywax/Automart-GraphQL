const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  },
  development: {
    use_env_variable: "DEV_DATABASE_URL",
    dialect: "postgres"
  },
  test: {
    use_env_variable: "TEST_DATABASE_URL",
    dialect: "postgres"
  }
};
