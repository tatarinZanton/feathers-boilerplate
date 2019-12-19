exports.up = async knex => {
  await knex.schema.createTable('uploads', async table => {
    table.uuid('id').unique();
    table.primary('id');

    table.string('title');
    table.string('description');
    table.string('extension');
    table.string('orignalName');
    table.string('systemName');

    table.timestamp('createdAt');
    table.timestamp('updatedAt');
    table.timestamp('deletedAt');
  });
  await knex.raw(`CREATE UNIQUE INDEX system_name_unique ON uploads("systemName") WHERE "deletedAt" is null;`);
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('uploads');
};
