const { Service } = require('feathers-objection');

exports.Uploads = class Uploads extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
