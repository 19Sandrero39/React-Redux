import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addTodo, removeTodo} from '../features/todoSlice'
import './tasks.css'

function Tasks() {
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
    <div className = "tasks-container">
      <h2 >Мои задачи</h2 >

      <div className = "task-input">
        <input
          type = "text"
          value = {newTask}
          onChange = {e => setNewTask(e.target.value)}
          placeholder = "Новая задача"
        />
        <button onClick = {handleAdd}>Добавить</button >
      </div >

      <ul className = "task-list">
        {todos.map((task, index) => (
          <li
            key = {index}
            className = "task-card"
          >
            <span >📝 {task}</span >
            <button onClick = {() => handleRemove(index)}>🗑</button >
          </li >
        ))}
      </ul >

    </div >
  )
}

export default Tasks
