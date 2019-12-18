module.exports = {
  components: {
    schemas: {
      user: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/types/id',
          },
          email: {
            $ref: '#/components/types/email',
          },
          role: {
            $ref: '#/components/types/userRole',
          },
          created_at: {
            $ref: '#/components/types/dateTime',
          },
          updated_at: {
            $ref: '#/components/types/dateTime',
          },
        },
      },
    },
    types: {
      password: {
        type: 'string',
        format: 'password',
      },
      jwtToken: {
        type: 'string',
        example: 'xxxxx.yyyyy.zzzzz',
      },
      authStrategy: {
        type: 'string',
        enum: ['local'],
      },
    },
  },
  paths: {
    '/users/{id}': {
      get: {
        tags: ['users'],
        security: [
          {
            JWT: [],
          },
        ],
        summary: "Returns a user's data",
        description: '',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'User ID or alias',
            required: true,
            schema: {
              oneOf: [
                {
                  $ref: '#/components/types/id',
                },
                {
                  type: 'string',
                  enum: ['self'],
                },
              ],
            },
            examples: {
              uid: {
                value: '00000000-1111-2222-3333-444444444444',
                summary: "User's UUID",
              },
              self: {
                value: 'self',
                summary: 'Request own user data',
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                example: {
                  id: '00000000-1111-2222-3333-444444444444',
                  email: 'hello@company.com',
                  createdAt: '2019-09-19T10:53:50.421Z',
                  updatedAt: '2019-09-19T13:57:26.116Z',
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/400',
          },
          401: {
            $ref: '#/components/responses/401',
          },
        },
      },
      patch: {
        tags: ['users'],
        security: [
          {
            JWT: [],
          },
        ],
        summary: 'Update user fields',
        description: '',
        operationId: 'patchUser',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'User ID or alias',
            required: true,
            schema: {
              oneOf: [
                {
                  $ref: '#/components/types/id',
                },
                {
                  type: 'string',
                  enum: ['self'],
                },
              ],
            },
            examples: {
              uid: {
                value: '00000000-1111-2222-3333-444444444444',
                summary: "User's UUID",
              },
              self: {
                value: 'self',
                summary: 'Request own user data',
              },
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    required: true,
                    $ref: '#/components/types/email',
                  },
                  password: {
                    required: true,
                    $ref: '#/components/types/password',
                  },
                },
              },
              examples: {
                candidate: {
                  value: {
                    email: 'hello@company.com',
                    password: 'Supersecret1',
                  },
                  summary: 'candidate',
                },
                employer: {
                  value: {
                    email: 'hello_emp@company.com',
                    password: 'Supersecret1',
                  },
                  summary: 'employer',
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/user',
                },
                example: {
                  id: '00000000-1111-2222-3333-444444444444',
                  email: 'hello@company.com',
                  createdAt: '2019-09-19T10:53:50.421Z',
                  updatedAt: '2019-09-19T13:57:26.116Z',
                  deletedAt: null,
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/400',
          },
        },
      },
      delete: {
        tags: ['users'],
        security: [
          {
            JWT: [],
          },
        ],
        summary: 'Delete user',
        description: '',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'User ID or alias',
            required: true,
            schema: {
              oneOf: [
                {
                  $ref: '#/components/types/id',
                },
                {
                  type: 'string',
                  enum: ['self'],
                },
              ],
            },
            examples: {
              uid: {
                value: '00000000-1111-2222-3333-444444444444',
                summary: "User's UUID",
              },
              self: {
                value: 'self',
                summary: 'Request own user data',
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                example: {
                  id: '00000000-1111-2222-3333-444444444444',
                  email: 'hello@company.com',
                  role: 'candidate',
                  createdAt: '2019-09-19T10:53:50.421Z',
                  updatedAt: '2019-09-19T13:57:26.116Z',
                  deletedAt: null,
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/400',
          },
          401: {
            $ref: '#/components/responses/401',
          },
        },
      },
    },
    '/users': {
      get: {
        tags: ['users'],
        security: [
          {
            JWT: [],
          },
        ],
        summary: 'Get the list of users',
        description:
          'Get the list of users. By default endpoint returns only NOT deleted record. Send deletedAt[$ne]=null ',
        parameters: [
          {
            in: 'query',
            name: '$limit',
            schema: {
              type: 'number',
            },
            example: 10,
            required: false,
            description: 'Limit amount of records in response',
          },
          {
            in: 'query',
            name: '$skip',
            schema: {
              type: 'number',
            },
            example: 0,
            required: false,
            description: 'Skip amount of records in response',
          },
          {
            in: 'query',
            name: 'deletedAt[$ne]',
            schema: {
              type: 'string',
            },
            example: 'null',
            required: false,
            description: 'Switch to archived records',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                example: {},
              },
            },
          },
          400: {
            $ref: '#/components/responses/400',
          },
          401: {
            $ref: '#/components/responses/400',
          },
        },
      },
      post: {
        tags: ['authentication', 'users'],
        summary: 'Create user / Sign up',
        description: '',
        operationId: 'createUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    required: true,
                    $ref: '#/components/types/email',
                  },
                  password: {
                    required: true,
                    $ref: '#/components/types/password',
                  },
                },
              },
              examples: {
                candidate: {
                  value: {
                    email: 'hello@company.com',
                    password: 'Supersecret1',
                  },
                  summary: 'candidate',
                },
                employer: {
                  value: {
                    email: 'hello_emp@company.com',
                    password: 'Supersecret1',
                  },
                  summary: 'employer',
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/user',
                },
                example: {
                  id: '00000000-1111-2222-3333-444444444444',
                  email: 'hello@company.com',
                  createdAt: '2019-09-19T10:53:50.421Z',
                  updatedAt: '2019-09-19T13:57:26.116Z',
                  deletedAt: null,
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/400',
          },
        },
      },
    },
    '/authentication': {
      post: {
        tags: ['authentication'],
        summary: 'Login / Generate Auth token',
        description: '',
        operationId: 'authenticate',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  strategy: {
                    $ref: '#/components/types/authStrategy',
                    required: true,
                  },
                  email: {
                    $ref: '#/components/types/email',
                    required: true,
                  },
                  password: {
                    $ref: '#/components/types/password',
                    required: true,
                  },
                },
              },
              examples: {
                candidate: {
                  value: {
                    email: 'hello@company.com',
                    password: 'Supersecret1',
                    strategy: 'local',
                  },
                  summary: 'candidate',
                },
                employer: {
                  value: {
                    email: 'hello_emp@company.com',
                    password: 'Supersecret1',
                    strategy: 'local',
                  },
                  summary: 'employer',
                },
                admin: {
                  value: {
                    email: 'admin@testhub.tech',
                    password: 'Admin123',
                    strategy: 'local',
                  },
                  summary: 'admin',
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    accessToken: {
                      $ref: '#/components/types/jwtToken',
                    },
                    authentication: {
                      type: 'object',
                      properties: {
                        strategy: {
                          $ref: '#/components/types/authStrategy',
                        },
                      },
                    },
                    user: {
                      $ref: '#/components/schemas/user',
                    },
                  },
                },
                example: {
                  accessToken: 'xxxxxxxxxx.yyyyyyyyyyy.zzzzzzzzzzz',
                  authentication: {
                    strategy: 'local',
                  },
                  user: {
                    id: '00000000-0000-0000-0000-000000000000',
                    email: 'hello@company.com',
                    role: 'candidate',
                    createdAt: '2019-09-19T10:53:50.421Z',
                    updatedAt: '2019-09-19T13:57:26.116Z',
                    deletedAt: null,
                    signUpProgress: {
                      gpiTest: true,
                      autonomyTest: false,
                      profile: false,
                    },
                    fullName: 'John Doe',
                  },
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/400',
          },
          401: {
            $ref: '#/components/responses/401',
          },
        },
      },
    },
    '/authmanagement': {
      post: {
        tags: ['authentication'],
        summary: 'Managing account',
        description: '',
        operationId: 'authmanagement',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  action: {
                    $ref: '#/components/types/action',
                    required: true,
                  },
                  value: {
                    $ref: '#/components/types/value',
                    required: true,
                  },
                },
              },
              examples: {
                checkUnique: {
                  value: {
                    action: 'checkUnique',
                    value: { email: 'hello@company.com' },
                    ownId: null,
                  },
                  summary: 'check email are unique',
                },
                verifyEmail: {
                  value: {
                    action: 'verifySignupLong',
                    value: '7ca3dbbd1fe4a4de83f5b840cb2cae',
                  },
                  summary: 'verify account',
                },
                sendResetPwd: {
                  value: {
                    action: 'sendResetPwd',
                    value: { email: 'hello@company.com' },
                  },
                  summary: 'send reset password link',
                },
                resetPwdLong: {
                  value: {
                    action: 'resetPwdLong',
                    value: {
                      token: '7ca3dbbd1fe4a4de83f5b840cb2cae',
                      password: 'newStrongPassword1',
                    },
                  },
                  summary: 'reset password',
                },
                passwordChange: {
                  value: {
                    action: 'passwordChange',
                    value: {
                      user: { email: 'hello@company.com' },
                      oldPassword: 'oldWeekPassword1',
                      password: 'newStrongPassword1',
                    },
                  },
                  summary: 'change password',
                },
                identityChange: {
                  value: {
                    action: 'identityChange',
                    value: {
                      user: { email: 'hello@company.com' },
                      password: 'Supersecret1',
                      changes: { email: 'john@company.com' },
                    },
                  },
                  summary: 'change user identity',
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    accessToken: {
                      $ref: '#/components/types/jwtToken',
                    },
                    authentication: {
                      type: 'object',
                      properties: {
                        strategy: {
                          $ref: '#/components/types/authStrategy',
                        },
                      },
                    },
                    user: {
                      $ref: '#/components/schemas/user',
                    },
                  },
                },
                example: {
                  id: '00000000-0000-0000-0000-000000000000',
                  email: 'hello@company.com',
                  phone: '+380672221133',
                  isVerified: true,
                  createdAt: '2019-09-19T10:53:50.421Z',
                  updatedAt: '2019-09-19T13:57:26.116Z',
                  deletedAt: null,
                },
              },
            },
          },
          204: {
            description: 'No Content',
          },
          400: {
            $ref: '#/components/responses/400',
          },
          401: {
            $ref: '#/components/responses/401',
          },
        },
      },
    },
  },
};
