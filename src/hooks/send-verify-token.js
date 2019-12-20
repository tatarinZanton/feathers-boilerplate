module.exports = () => {
  return async ctx => {
    ctx.app.service('mailer').create({
      type: 'resendVerifySignup',
      payload: {
        email: ctx.result.email,
        verifyToken: ctx.result.verifyToken,
      },
    });
  };
};
