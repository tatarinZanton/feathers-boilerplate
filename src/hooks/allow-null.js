function convertNull(query) {
  Object.keys(query).forEach(key => {
    if (typeof query[key] === 'object') convertNull(query[key]);
    if (query[key] === 'null') query[key] = null;
  });
}

module.exports = () => {
  return async ctx => {
    if (!ctx.params.query) return;
    convertNull(ctx.params.query);
    return ctx;
  };
};
