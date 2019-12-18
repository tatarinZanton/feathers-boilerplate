const assert = require('assert');
const app = require('../../../src/app');

const { EMAIL, PASSWORD, NAME, PHONE } = require('../../constants/user');
const expect = require('chai').expect;

const url = require('url');
const hostname = app.get('host') || 'localhost';
const port = app.get('port') || 8998;
const axios = require('axios');

const getUrl = pathname =>
  url.format({
    protocol: 'http',
    hostname,
    port,
    pathname,
  });

describe("'users' service", () => {
  let _axios;

  // *****************************
  // set user credentials for test
  // *****************************
  let userCredentials = {
    email: EMAIL,
    password: PASSWORD,
  };

  // ************************************************
  // start and keep server running, during test cases
  // ************************************************
  let server;
  // eslint-disable-next-line no-unused-vars
  before(function(done) {
    server = app.listen(port, hostname);
    server.once('listening', () => done());
  });
  // eslint-disable-next-line no-unused-vars
  after(function(done) {
    server.close(done);
  });

  it('registered the service', () => {
    const service = app.service('users');
    assert.ok(service, 'Registered the service');
  });

  describe('create user', () => {
    let user;
    it('should create user', async () => {
      user = await app.service('users').create(userCredentials);

      //remember user verify token for later using
      userCredentials.verifyToken = user.verifyToken;

      expect(user).to.be.a('object');
    });

    describe('check user params', () => {
      it('should have .email as STRING', async () => {
        expect(user.email).to.be.a('string');
      });
      it('should have .name as NULL', async () => {
        expect(user.name).to.equal(null);
      });
      it('should have .phone as NULL', async () => {
        expect(user.phone).to.equal(null);
      });
    });

    it('should try to create duplicate user', async () => {
      try {
        await app.service('users').create(userCredentials, { provider: 'rest' });
      } catch (error) {
        expect(error)
          .to.have.property('code')
          .to.equal(400);
      }
    });
  });

  describe('verify user', () => {
    let user;
    it('should verify user account', async () => {
      user = await app.service('authManagement').create(
        {
          action: 'verifySignupLong',
          value: userCredentials.verifyToken,
        },
        { provider: 'rest' },
      );
      expect(user)
        .to.have.property('isVerified')
        .to.equal(true);
    });
  });

  describe('login user', () => {
    let user;
    it('should authenticate user', async () => {
      user = await app
        .service('/authentication')
        .create({ strategy: 'local', ...userCredentials }, { provider: 'rest' });

      userCredentials.accessToken = user.accessToken;
      userCredentials.userId = user.user.id;

      expect(user)
        .to.have.property('accessToken')
        .to.be.a('string');

      // ******************************************
      // set axios config and Authorization header
      // ******************************************
      _axios = await axios.create({
        baseURL: getUrl('/'),
        timeout: 3000,
        headers: { Authorization: userCredentials.accessToken },
      });
    });
  });

  describe('patch user', () => {
    it('should change user name and phone', async () => {
      let response = await _axios.patch(getUrl(`users/${userCredentials.userId}`), {
        name: NAME,
        phone: PHONE,
      });
      expect(response.status).to.be.equal(200);
      expect(response.data.name).to.be.equal(NAME);
      expect(response.data.phone).to.be.equal(PHONE);
    });
  });

  describe('delete user', () => {
    it('should delete user', async () => {
      let response = await _axios.delete(getUrl(`users/${userCredentials.userId}`));
      expect(response.status).to.be.equal(200);
    });
  });
});
