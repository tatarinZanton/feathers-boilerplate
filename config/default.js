module.exports = {
  host: 'localhost',
  port: 3030,
  public: '../public/',
  paginate: {
    default: 10,
    max: 50,
  },
  authentication: {
    entity: 'user',
    service: 'users',
    secret: 'A88UcSZo89OSMVJV07/D83YEF1M=',
    authStrategies: ['jwt', 'local'],
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: 'https://yourdomain.com',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    local: {
      usernameField: 'email',
      passwordField: 'password',
    },
  },
  postgres: {
    client: 'pg',
    connection: 'postgres://todo@localhost:5432/todo',
  },
  mail: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER ? process.env.SMTP_USER : 'inna.artkai@gmail.com', // generated ethereal user
      pass: process.env.SMTP_PASS ? process.env.SMTP_PASS : 'HelloArtkai27',
    },
    from: process.env.FROM_EMAIL ? process.env.FROM_EMAIL : 'admin@development.org',
  },
};
