// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
module.exports = function(app) {
  const { Model } = require('objection');
  const softDelete = app.get('softDelete');

  class Uploads extends softDelete(Model) {
    static get tableName() {
      return 'uploads';
    }

    static get jsonSchema() {
      return {
        type: 'object',
        required: ['extension'],

        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          extension: { type: 'string' },
          orignalName: { type: 'string' },
          systemName: { type: 'string' },
        },
      };
    }

    $beforeInsert() {
      this.createdAt = this.updatedAt = new Date().toISOString();
    }

    $beforeUpdate() {
      this.updatedAt = new Date().toISOString();
    }
  }

  return Uploads;
};
