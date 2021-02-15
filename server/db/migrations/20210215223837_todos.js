exports.up = function (knex) {
  return knex.schema.createTable('todos', table => {
    table.increments('id').primary()
    table.string('details')
    table.int('priority')
    table.string('status')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('todos')
};
