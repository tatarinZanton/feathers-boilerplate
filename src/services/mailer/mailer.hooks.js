const { disallow } = require('feathers-hooks-common');
const EmailTemplates = require('email-templates');
const emailTemplates = new EmailTemplates();

module.exports = {
  before: {
    all: [disallow('external')],
    find: [],
    get: [],
    create: [
      async ctx => {
        //TODO remove to hook or service
        ctx.data.payload.url = `http://${ctx.app.get('host')}:${ctx.app.get('port')}`;

        let emailBody = await emailTemplates.renderAll(ctx.data.type, ctx.data.payload);

        ctx.data = {
          to: ctx.data.payload.email,
          ...emailBody,
        };

        return ctx;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
