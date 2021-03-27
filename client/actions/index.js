import { postTodo } from '../apis'
export const ADD_TODO = 'ADD_TODO'
export const SET_ERROR = 'SET_ERROR'

function addDetail (newTask) {
  return {
    type: ADD_TODO,
    detail: newTask
  }
}

function setError (message) {
  return {
    type: SET_ERROR,
    message
  }
}

export function addTodo (task) {
  return (dispatch => {
    postTodo(task)
      .then((newTask) => {
        dispatch(addDetail(newTask))
        return null
      })
      .catch(err => {
        dispatch(setError(err))
      })
  })
}
