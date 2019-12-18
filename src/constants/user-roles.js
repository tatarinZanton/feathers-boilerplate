const roles = Object.freeze({
  ADMIN: 'admin',
});

module.exports = {
  ...roles,
  userRoles: Object.values(roles),
};
