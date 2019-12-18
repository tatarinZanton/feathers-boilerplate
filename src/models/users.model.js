module.exports = function(app) {
  const knex = app.get('knex');
  const Model = require('objection').Model;
  const uuid = require('uuid/v4');

  const softDelete = require('objection-soft-delete')({
    columnName: 'deletedAt',
    deletedValue: knex.fn.now(),
    notDeletedValue: null,
  });

  class Users extends softDelete(Model) {
    static get tableName() {
      return 'users';
    }

    static get jsonSchema() {
      return {
        type: 'object',
        required: ['email', 'password'],

        properties: {
          id: { type: 'string' },
          email: { type: ['string'] },
          password: 'string',
          name: 'string',
          phone: 'string',
          //for authmanagement, some fiels are missed in documentation
          //full list of required fields
          isVerified: 'boolean',
          verifyToken: 'jsonb',
          verifyExpires: 'bigint',
          verifyChanges: 'string',
          resetToken: 'string',
          resetShortToken: 'string',
          verifyShortToken: 'string',
          resetExpires: 'bigint',
        },
      };
    }

    $beforeInsert() {
      this.createdAt = this.updatedAt = new Date().toISOString();

      // generate user uuid
      this.id = uuid();
    }

    $beforeUpdate() {
      this.updatedAt = new Date().toISOString();
    }
  }

  return Users;
};
