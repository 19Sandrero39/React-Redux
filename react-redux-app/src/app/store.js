import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todoSlice'
import authReducer from '../features/authSlice'
import vehicleInteractionReducer from '../features/vehicleInteractionSlice'
import authMiddleware from '../middlewares/authMiddleware'

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        auth: authReducer,
        vehicleInteractions: vehicleInteractionReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authMiddleware)
})
