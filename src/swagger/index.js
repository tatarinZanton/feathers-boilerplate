const swaggerUi = require('swagger-ui-express');
const deepmerge = require('deepmerge');

const rootDocs = require('./root.docs');

/**
 * Generates complete Open API doc and serves it using Swagger UI.
 *
 * @param app
 */
exports.attachSwaggerDocs = app => {
  const servicesDocs = Object.keys(app.services)
    .map(path => app.service(path).docs)
    .filter(doc => doc);
  const completeSwaggerDocs = deepmerge.all([{}, rootDocs(app), ...servicesDocs]);

  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(completeSwaggerDocs, {
      customCss: '.swagger-ui > .topbar { display: none }',
      swaggerOptions: { docExpansion: 'list' },
    }),
  );
};
