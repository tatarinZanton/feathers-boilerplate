# boilerplate

> boilerplate project

## About

This project uses [Feathers](http://feathersjs.com).

Includes:

- [Objection](https://vincit.github.io/objection.js/)
- [SoftDelete](https://github.com/griffinpp/objection-soft-delete)
- [Knex](http://knexjs.org/)
- [EmailTemplates](https://github.com/forwardemail/email-templates)
- [AuthManagement](https://github.com/feathers-plus/feathers-authentication-management/blob/master/docs.md)

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Create databases

   ```
   CREATE DATABASE todo;
   CREATE DATABASE todo-test;
   ```

2. Create user and give privileges

   ```
   CREATE USER todo WITH password 'todo';
   GRANT ALL PRIVILEGES ON DATABASE todo TO todo;
   GRANT ALL PRIVILEGES ON DATABASE todo-test TO todo;
   ```

3. Create extension in database

   ```
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

4. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

5. Install your dependencies

   ```
   cd path/to/todo
   npm install
   ```

6. Start your app

   ```
   npm start
   ```

## Testing

1. Start test

   ```
   npm test
   ```
