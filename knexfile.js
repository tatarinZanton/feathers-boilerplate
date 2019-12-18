const configuration = require('@feathersjs/configuration')()();

module.exports = {
  client: 'pg',
  connection: configuration.postgres.connection,
  migrations: {
    tableName: 'knex_migrations',
  },
};
