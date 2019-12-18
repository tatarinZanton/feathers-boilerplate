const user = Object.freeze({
  EMAIL: 'hello@company.com',
  PASSWORD: 'Supersecret1',
  NAME: 'John Doe',
  PHONE: '+380672223344',
});

module.exports = {
  ...user,
};
