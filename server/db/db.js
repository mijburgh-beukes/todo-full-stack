const connection = require('./connection')

module.exports = {
  addTask
}

function addTask (task, db = connection) {
  const { id, details, priority, status } = task
  return db('todos')
    .insert({ id, details, priority, status })
    .then(todo => {
      return todo
    })
}
