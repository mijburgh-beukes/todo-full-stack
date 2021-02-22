const connection = require('./connection')

module.exports = {
  addTask,
  getTasks
}

function addTask (task, db = connection) {
  const { details } = task
  return db('todos')
    .insert({ details })
    .then(idArr => {
      return findTodo(idArr[0], db)
    })
}

function getTasks (db = connection) {
  return db('todos').select()
}

function findTodo (id, db = connection) {
  return db('todos').where({ id }).select().first()
}