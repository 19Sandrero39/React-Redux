import {createSlice} from '@reduxjs/toolkit'

const savedTodos = JSON.parse(localStorage.getItem('todos')) || []

const todoSlice = createSlice({
    name: 'todos',
    initialState: savedTodos,
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
            localStorage.setItem('todos', JSON.stringify(state))
        },
        removeTodo: (state, action) => {
            state.splice(action.payload, 1)
            localStorage.setItem('todos', JSON.stringify(state))
        }
    }
})

export const {addTodo, removeTodo} = todoSlice.actions
export default todoSlice.reducer
