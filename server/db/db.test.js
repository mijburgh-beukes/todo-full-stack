const knex = require('knex')
const config = require('./knexfile')
const connection = knex(config.test)

const { addTask } = require('./db')

beforeAll(() => connection.migrate.latest())
beforeEach(() => connection.seed.run())

describe('addTasks', () => {
  test('saves a task into db', () => {
    expect.assertions(2)
    const task = { details: 'new task' }
    return addTask(task, connection)
      .then(() => {
        return connection('todos').select()
      }).then(todos => {
        expect(todos).toHaveLength(4)
        expect(todos[3].details).toEqual('new task')
        return null
      })
  })

  test('returns newly created task', () => {
    expect.assertions(1)
    const task = { details: 'new task' }
    return addTask(task, connection)
      .then(newTask => {
        const { details } = task
        expect(newTask).toEqual({
          id: 4,
          details,
          priority: null,
          completed: 0
        })
        return null
      })
  })
})
