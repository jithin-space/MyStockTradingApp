// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "mysecretpassword",
      database: "stock_trading",
      port: 5555,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
  test: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "mysecretpassword",
      database: "stock_trading_test",
      port: 5555,
    },
    pool: {
      min: 2,
      max: 15,
      idleTimeoutMillis: 120000,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  staging: {
    client: "pg",
    connection: {
      host: "stock-trading-db.postgres.database.azure.com",
      database: "stock_trading",
      user: "stock_trading_db_admin",
      password: "dbadmin123$",
      port: 5432,
      // ssl: true
    },
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 120000,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
