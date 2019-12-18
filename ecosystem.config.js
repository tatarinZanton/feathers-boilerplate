process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
module.exports = {
  apps: [
    {
      name: 'todo-api',
      script: 'src/index.js',
      instances: 1,
      exec_mode: 'fork',
      watch: process.env.NODE_ENV == 'development' ? true : false,
    },
  ],
};
