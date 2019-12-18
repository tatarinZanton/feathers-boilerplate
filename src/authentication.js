const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

class ExtendedLocalStrategy extends LocalStrategy {
  getEntityQuery(query) {
    // Query for user but only include users marked as `isVerified`
    return {
      ...query,
      isVerified: true,
    };
  }
}

module.exports = app => {
  const authService = new AuthenticationService(app);

  authService.register('jwt', new JWTStrategy());
  authService.register('local', new ExtendedLocalStrategy());

  app.use('/authentication', authService);
  app.configure(expressOauth());
};
