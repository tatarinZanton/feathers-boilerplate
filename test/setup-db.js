const app = require('../src/app');
const knex = app.get('knex');
before(async () => {
  try {
    await knex.raw('DROP SCHEMA IF EXISTS public CASCADE');
    await knex.raw('CREATE SCHEMA public;');
    await knex.migrate.latest();
  } catch (error) {
    console.log(error);
    process.exit();
  }
});
