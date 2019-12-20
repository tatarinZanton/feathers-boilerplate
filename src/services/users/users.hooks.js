const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const commonHooks = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;
const { iff, isProvider, preventChanges } = require('feathers-hooks-common');
const allowNull = require('../../hooks/allow-null');
const softDelete = require('../../hooks/soft-delete');
const sendVerifyToken = require('../../hooks/send-verify-token');

module.exports = {
  before: {
    all: [allowNull(), softDelete()],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword('password'), verifyHooks.addVerification()],
    update: [hashPassword('password'), authenticate('jwt'), commonHooks.disallow('external')],
    patch: [
      iff(
        isProvider('external'),
        preventChanges(
          true,
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires',
        ),
        hashPassword('password'),
        authenticate('jwt'),
      ),
    ],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],

    find: [protect('verifyToken', 'verifyExpires', 'verifyChanges', 'resetToken', 'verifyShortToken', 'resetExpires')],

    get: [protect('verifyToken', 'verifyExpires', 'verifyChanges', 'resetToken', 'verifyShortToken', 'resetExpires')],

    create: [
      sendVerifyToken(),
      verifyHooks.removeVerification(),
      protect(
        'isVerified',
        'verifyToken',
        'verifyExpires',
        'verifyChanges',
        'resetToken',
        'verifyShortToken',
        'resetExpires',
      ),
    ],

    update: [
      protect('verifyToken', 'verifyExpires', 'verifyChanges', 'resetToken', 'verifyShortToken', 'resetExpires'),
    ],

    patch: [protect('verifyToken', 'verifyExpires', 'verifyChanges', 'resetToken', 'verifyShortToken', 'resetExpires')],

    remove: [
      protect('verifyToken', 'verifyExpires', 'verifyChanges', 'resetToken', 'verifyShortToken', 'resetExpires'),
    ],
  },

  error: {
    all: [
      ctx => {
        console.log(ctx);

        return ctx;
      },
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
