import {createSlice} from '@reduxjs/toolkit'

const registeredUser = JSON.parse(localStorage.getItem('registeredUser'))
const currentUser = JSON.parse(localStorage.getItem('currentUser'))

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        registeredUser,
        currentUser,
        error: null
    },
    reducers: {
        registerRequest: (state) => {
            state.error = null
        },
        registerSuccess: (state, action) => {
            state.registeredUser = action.payload
            state.error = null
        },
        loginRequest: (state) => {
            state.error = null
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
            state.error = null
        },
        authFailure: (state, action) => {
            state.error = action.payload
        },
        logout: (state) => {
            state.currentUser = null
            state.error = null
            localStorage.removeItem('currentUser')
        }
    }
})

export const {
    registerRequest,
    registerSuccess,
    loginRequest,
    loginSuccess,
    authFailure,
    logout
} = authSlice.actions

export default authSlice.reducer