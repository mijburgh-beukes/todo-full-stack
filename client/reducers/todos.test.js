import todos from './todos'
import { addTodo } from '../actions'

describe('todos reducer', () => {
  test('initial state is an empty array', () => {
    const state = todos(undefined, { type: '_INIT_' })
    expect(state).toEqual([])
  })

  test('ADD_TODO adds a todo to the initial state', () => {
    const fakeTodo = { task: 'do a thing' }
    const action = addTodo(fakeTodo)
    const state = todos(undefined, action)
    expect(state).toHaveLength(1)
    expect(state[0]).toEqual(fakeTodo)
  })
})
