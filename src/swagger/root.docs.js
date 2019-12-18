const { userRoles } = require('../constants/user-roles');

module.exports = app => ({
  openapi: '3.0.0',
  info: {
    title: 'Todo API',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://${app.get('host')}:${app.get('port')}`,
      description: 'Current',
    },
  ],
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'authentication', description: 'Authentication' },
    { name: 'users', description: 'Users' },
  ],
  components: {
    types: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      dateTime: {
        type: 'string',
        format: 'date-time',
      },
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        format: 'password',
      },
      userRole: {
        type: 'string',
        enum: userRoles,
      },
      action: {
        type: 'string',
      },
      value: {
        type: 'string',
      },
    },
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    responses: {
      abstract4xxError: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                message: {
                  type: 'string',
                },
                code: {
                  type: 'number',
                  minimum: 400,
                  maximum: 490,
                },
                className: {
                  type: 'string',
                },
                data: {
                  type: 'object',
                },
                errors: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                      },
                      path: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      400: {
        allOf: [
          { $ref: '#/components/responses/abstract4xxError' },
          {
            content: {
              'application/json': {
                schema: {
                  example: {
                    name: 'BadRequest',
                    message: 'Error message',
                    code: 400,
                    className: 'bad-request',
                    data: {},
                    errors: [
                      {
                        message: 'Error message in details',
                        path: 'path to the field with an error',
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
      },
      401: {
        allOf: [
          { $ref: '#/components/responses/abstract4xxError' },
          {
            content: {
              'application/json': {
                schema: {
                  example: {
                    name: 'NotAuthenticated',
                    message: 'Not authenticated',
                    code: 401,
                    className: 'not-authenticated',
                    errors: {},
                  },
                },
              },
            },
          },
        ],
      },
      403: {
        allOf: [
          { $ref: '#/components/responses/abstract4xxError' },
          {
            content: {
              'application/json': {
                schema: {
                  example: {
                    name: 'NotAuthenticated',
                    message: 'Not authenticated',
                    code: 403,
                    className: 'not-authenticated',
                    errors: {},
                  },
                },
              },
            },
          },
        ],
      },
      404: {
        allOf: [
          { $ref: '#/components/responses/abstract4xxError' },
          {
            content: {
              'application/json': {
                schema: {
                  example: {
                    name: 'NotFound',
                    message: "No record found for id 'xxx'",
                    code: 404,
                    className: 'not-found',
                    errors: {},
                  },
                },
              },
            },
          },
        ],
      },
      409: {
        allOf: [
          { $ref: '#/components/responses/abstract4xxError' },
          {
            content: {
              'application/json': {
                schema: {
                  example: {
                    name: 'Conflict',
                    message: 'Error details here',
                    code: 409,
                    className: 'conflict',
                    errors: {},
                  },
                },
              },
            },
          },
        ],
      },
    },
  },
});
