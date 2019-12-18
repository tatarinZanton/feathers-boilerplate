// Initializes the `authmanagement` service on path `/authmanagement`
const authManagement = require('feathers-authentication-management');
const hooks = require('./authmanagement.hooks');

module.exports = function(app) {
  // Initialize our service with any options it requires
  // app.configure(authManagement(notifier(app)));
  app.configure(
    authManagement({
      notifier: async (type, payload) => {
        return app.service('mailer').create({
          type,
          payload,
        });
      },
    }),
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('authManagement');

  service.hooks(hooks);
};
