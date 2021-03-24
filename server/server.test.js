import request from 'supertest'
import server from './server'
import { addTask, getTasks } from './db/db'

jest.mock('./db/db', () => ({
  addTask: jest.fn(),
  getTasks: jest.fn()
}))

let promise

describe('POST /api/v1/todos', () => {
  const fakeTodo = {
    id: 1,
    details: 'do the things',
    priority: null,
    completed: false
  }

  beforeAll(() => {
    addTask.mockImplementation(() => Promise.resolve(fakeTodo))
    promise = request(server)
      .post('/api/v1/todos')
      .send({ details: 'new task' })
  })

  test('returns a 201 status', () => {
    expect.assertions(1)
    return promise.then(res => {
      expect(res.body).toEqual(fakeTodo)
      return null
    })
  })

  test('calls addTask from db', () => {
    expect.assertions(1)
    return promise.then(res => {
      expect(addTask).toHaveBeenCalledWith({ details: 'new task' })
      return null
    })
  })

  test('returns the newly created task', () => {
    expect.assertions(1)
    return promise.then(res => {
      expect(res.body).toEqual(fakeTodo)
      return null
    })
  })

  describe('when db call is unsuccessful', () => {
    test('returns 500 status', () => {
      const err = new Error('p**s')
      addTask.mockImplementation(() => Promise.reject(err))
      expect.assertions(1)
      return request(server)
        .post('/api/v1/todos')
        .send({ details: 'new task' })
        .then(res => {
          expect(res.status).toBe(500)
          return null
        })
    })
  })
})

describe('GET /api/v1/todos', () => {
  describe('when database call works', () => {
    const fakeTodos = [{ details: 'something' }, { details: 'something else' }]
    beforeAll(() => {
      getTasks.mockImplementation(() => Promise.resolve(fakeTodos))
      promise = request(server)
        .get('/api/v1/todos')
    })

    test('calls getTasks', () => {
      return promise.then(() => {
        expect(getTasks).toHaveBeenCalled()
        return null
      })
    })

    test('returns all the tasks in the database', () => {
      return promise.expect(200).then(response => {
        expect(response.body).toEqual(fakeTodos)
        return null
      })
    })
  })

  describe("when the db call doesn't work", () => {
    test('returns 500', () => {
      expect.assertions(1)
      const err = new Error('oh sh*t')
      getTasks.mockImplementation(() => Promise.reject(err))
      return request(server).get('/api/v1/todos')
        .then(res => {
          expect(res.status).toBe(500)
          return null
        })
    })
  })
})
