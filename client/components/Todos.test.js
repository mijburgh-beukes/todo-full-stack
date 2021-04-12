import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'

import Todos from './Todos'

const fakeStore = {
  getState: jest.fn(),
  dispatch: jest.fn(),
  subscribe: jest.fn()
}

fakeStore.getState.mockImplementation(() => ({
  todos: [
    { id: 1, task: 'do a thing', completed: false },
    { id: 2, task: 'do another thing', completed: false },
    { id: 3, task: 'do nothing', completed: false }
  ]
}))

describe('<Todos />', () => {
  test('list out todos from redux', async () => {
    render(<Provider store={fakeStore}><Todos /></Provider>)
    const items = await screen.findAllByRole('listitem')
    expect(items).toHaveLength(3)
  })
})
