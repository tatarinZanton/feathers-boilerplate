function convertNull(query) {
  Object.keys(query).forEach(key => {
    if (typeof query[key] === 'object') convertNull(query[key]);
    if (query[key] === 'null') query[key] = null;
  });
}

exports.allowNull = () => {
  // convert all strings that are "null" to null
  return ctx => {
    if (!ctx.params.query) return;
    convertNull(ctx.params.query);
  };
};

//works only with one level nesting!
exports.softDelete = () => {
  return ctx => {
    if (ctx.params && ctx.params.query && !Object.prototype.hasOwnProperty.call(ctx.params.query, 'deletedAt')) {
      ctx.params.query.deletedAt = null;
    }
  };
};

exports.sendEmail = () => {
  return ctx => {
    ctx.app.service('mailer').create({
      type: 'resendVerifySignup',
      payload: {
        email: ctx.result.email,
        verifyToken: ctx.result.verifyToken,
      },
    });
  };
};
