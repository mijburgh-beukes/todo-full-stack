import { addTodo, ADD_TODO, SET_ERROR } from './index'
import { postTodo } from '../apis'

jest.mock('../apis', () => ({
  postTodo: jest.fn()
}))

describe('addTodo', () => {
  const fakeDispatch = jest.fn()

  describe('when api call successful', () => {
    const fakeTodo = { task: 'fake task' }
    beforeAll(() => {
      postTodo.mockImplementation(() => Promise.resolve(fakeTodo))
      addTodo('new task')(fakeDispatch)
    })

    test('calls the postTodo api method', () => {
      expect(postTodo).toHaveBeenCalledWith('new task')
    })

    test('dispatches a addDetail action', () => {
      console.log(fakeDispatch.mock.calls[0][0].detail)
      expect(fakeDispatch.mock.calls[0][0].type).toEqual(ADD_TODO)
    })

    test('addDetail is created with results from postTodo api call', () => {
      expect(fakeDispatch.mock.calls[0][0].detail).toEqual(fakeTodo)
    })
  })

  describe('when api call is unsuccessful', () => {
    beforeAll(() => {
      // below referes to lines 8-10
      jest.clearAllMocks()
      postTodo.mockImplementation(() => Promise.reject('not happy'))
      addTodo('new task')(fakeDispatch)
    })

    test('dispatches a error action', () => {
      expect(fakeDispatch.mock.calls[0][0].type).toEqual(SET_ERROR)
      expect(fakeDispatch.mock.calls[0][0].message).toEqual('not happy')
    })
  })
})
