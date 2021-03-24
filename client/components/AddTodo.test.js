import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'

import AddTodo from './AddTodo'
import { addTodo } from '../actions'

const fakeAction = { type: 'fakeAction' }
jest.mock('../actions/', () => ({
  addTodo: jest.fn(() => fakeAction)
}))

const store = {
  dispatch: jest.fn(),
  getState: jest.fn(),
  subscribe: jest.fn()
}

describe('<AddTodo />', () => {
  let input
  beforeEach(() => {
    render(<Provider store={store}><AddTodo /></Provider>)
    input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new task' } })
    fireEvent.submit(input)
  })

  test('submitting a todo dispatches a addTodo action', () => {
    expect(store.dispatch).toHaveBeenCalledWith(fakeAction)
    expect(addTodo).toHaveBeenCalledWith('new task')
  })

  test('submitting input clears input value', () => {
    expect(input.value).toBe('')
  })
})
