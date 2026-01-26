import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addTodo, removeTodo} from './features/todoSlice'

function App() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [newTask, setNewTask] = useState('')

  const handleAdd = () => {
    if (newTask.trim() === '') return
    dispatch(addTodo(newTask))
    setNewTask('')
  }

  const handleRemove = (index) => {
    dispatch(removeTodo(index))
  }

  return (
    <div style = {{padding: 20, maxWidth: 400}}>
      <h1 >ToDo List</h1 >

      <input
        type = "text"
        value = {newTask}
        onChange = {e => setNewTask(e.target.value)}
        placeholder = "Новая задача"
      />
      <button onClick = {handleAdd}>Добавить</button >

      <ul >
        {todos.map((task, index) => (
          <li key = {index}>
            {task}
            <button
              onClick = {() => handleRemove(index)}
              style = {{marginLeft: 10}}
            >
              ❌
            </button >
          </li >
        ))}
      </ul >
    </div >
  )
}

export default App
