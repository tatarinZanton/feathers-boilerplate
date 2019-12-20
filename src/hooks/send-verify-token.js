module.exports = () => {
  return async ctx => {
    ctx.app.service('mailer').create({
      type: 'resendVerifySignup',
      payload: {
        email: ctx.result.email,
        url: `http://${ctx.app.get('host')}:${ctx.app.get('port')}`,
        verifyToken: ctx.result.verifyToken,
      },
    });
  };
};
