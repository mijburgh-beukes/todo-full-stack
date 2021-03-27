import React, { useState } from 'react'
import { connect } from 'react-redux'
import { saveTodo } from '../actions'

function AddTodo (props) {
  const [task, setTask] = useState('')

  function handleChange (evt) {
    setTask(evt.target.value)
  }

  function handleSubmit (evt) {
    evt.preventDefault()
    const action = saveTodo(task)
    props.dispatch(action)
    return setTask('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="new-todo" placeholder="What needs to be done?" autoFocus={true} onChange={handleChange} value={task}/>
    </form>
  )
}

export default connect()(AddTodo)
