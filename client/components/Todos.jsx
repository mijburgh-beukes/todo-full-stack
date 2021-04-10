import React from 'react'
import { connect } from 'react-redux'

function Todos ({ todos }) {
  return (
    <>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map(todo => {
          return (
            <li className="completed" key={ todo.id }>
              <div className="view">
                <input className="toggle" type="checkbox" /* checked */ />
                <label>Taste JavaScript</label>
                <button className="destroy"></button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function mapStateToProps ({ todos }) {
  return { todos }
}

export default connect(mapStateToProps)(Todos)
