import React from 'react'

export default function Todo ({ todo }) {
  const className = todo.completed ? 'completed' : ''
  return (
    <li className={className}>
      <div className="view">
        <input className="toggle" type="checkbox" /* checked */ />
        <label>{todo.task}</label>
        <button className="destroy"></button>
      </div>
    </li>
  )
}
