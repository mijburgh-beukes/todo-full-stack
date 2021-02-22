exports.up = function (knex) {
  return knex.schema.table('todos', table => {
    table.dropColumn('status')
    table.boolean('completed').default(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('todos')
}
