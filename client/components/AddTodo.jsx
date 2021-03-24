import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions/'

function AddTodo (props) {
  const [task, setTask] = useState('')

  function handleChange (evt) {
    // console.log(evt.target)
    return setTask(evt.target.value)
  }

  function handleSubmit (evt) {
    evt.preventDefault()
    props.dispatch(addTodo(task))
    setTask('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        onChange={handleChange}
        value={task}/>
    </form>
  )
}

export default connect()(AddTodo)
