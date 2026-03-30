import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todoSlice'
import authReducer from '../features/authSlice'
import authMiddleware from '../middlewares/authMiddleware'

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authMiddleware)
})
