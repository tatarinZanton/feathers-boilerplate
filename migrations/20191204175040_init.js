exports.up = async knex => {
  await knex.schema.createTable('users', table => {
    table.uuid('id').unique();
    table.primary('id');

    table.string('email');
    table.string('password');
    table.string('name');
    table.string('phone');

    //for authmanagement, some fiels are missed in documentation
    //full list of required fields
    table.boolean('isVerified');
    table.string('verifyToken');
    table.string('verifyShortToken');
    table.bigint('verifyExpires');
    table.jsonb('verifyChanges');
    table.string('resetToken');
    table.string('resetShortToken');
    table.bigint('resetExpires');

    table.timestamp('createdAt');
    table.timestamp('updatedAt');
    table.timestamp('deletedAt');
  });
  await knex.raw(`CREATE UNIQUE INDEX email_unique ON users(email) WHERE "deletedAt" is null;`);
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('users');
};
