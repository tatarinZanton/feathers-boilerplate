const { Model } = require('objection');
const softDeleteModule = require('objection-soft-delete');

module.exports = function(app) {
  const { client, connection } = app.get('postgres');
  const knex = require('knex')({ client, connection, useNullAsDefault: false });

  const softDelete = softDeleteModule({
    columnName: 'deletedAt',
    deletedValue: knex.fn.now(),
    notDeletedValue: null,
  });

  Model.knex(knex);

  app.set('knex', knex);
  app.set('softDelete', softDelete);
};
