const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    migrations: {
      tableName: "migrations",
      stub: "migrations/template.ts",
    },
    seeds: {
      directory: "./seeds/dev",
    },
  },
  heroku: {
    client: "mysql",
    connection: process.env.JAWSDB_MARIA_URL,
    migrations: {
      tableName: "migrations",
      stub: "migrations/template.ts",
    },
    seeds: {
      directory: "./seeds/dev",
    },
  },
};
