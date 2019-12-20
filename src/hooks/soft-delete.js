//works only with one level nesting!
module.exports = () => {
  return async ctx => {
    if (ctx.params && ctx.params.query && !Object.prototype.hasOwnProperty.call(ctx.params.query, 'deletedAt')) {
      ctx.params.query.deletedAt = null;
    }
  };
};
