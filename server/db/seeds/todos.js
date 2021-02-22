exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todos').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        { id: 1, details: 'practice knex', priority: 3, completed: false },
        { id: 2, details: 'practice react', priority: 3, completed: false },
        { id: 3, details: 'practice redux', priority: 3, completed: false }
      ])
    })
}
