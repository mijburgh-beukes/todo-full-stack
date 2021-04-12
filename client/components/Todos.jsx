import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Todo from './Todo'
import { fetchTodos } from '../apis'

function Todos ({ dispatch, todos }) {
  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  return (
    <>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
      </ul>
    </>
  )
}

function mapStateToProps ({ todos }) {
  return { todos }
}

export default connect(mapStateToProps)(Todos)