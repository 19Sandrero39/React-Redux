import {
    authFailure, loginRequest, loginSuccess, registerRequest, registerSuccess
} from '../features/authSlice'

const authMiddleware = store => next => action => {
    if (action.type === registerRequest.type) {
        const {username, login, password, confirmPassword} = action.payload

        if (!username?.trim() || !login?.trim() || !password?.trim()) {
            return next(authFailure('Заполните все поля регистрации.'))
        }

        if (password.length < 6) {
            return next(authFailure('Пароль должен быть минимум 6 символов.'))
        }

        if (password !== confirmPassword) {
            return next(authFailure('Пароли не совпадают.'))
        }

        const user = {
            username: username.trim(), login: login.trim(), password
        }

        localStorage.setItem('registeredUser', JSON.stringify(user))
        next(registerSuccess(user))
        return next(loginSuccess({username: user.username, login: user.login}))
    }

    if (action.type === loginRequest.type) {
        const {login, password} = action.payload
        const registeredUser = store.getState().auth.registeredUser || JSON.parse(localStorage.getItem('registeredUser'))

        if (!login?.trim() || !password?.trim()) {
            return next(authFailure('Введите логин и пароль.'))
        }

        if (!registeredUser) {
            return next(authFailure('Сначала выполните регистрацию.'))
        }

        if (registeredUser.login !== login.trim() || registeredUser.password !== password) {
            return next(authFailure('Неверный логин или пароль.'))
        }

        const currentUser = {
            username: registeredUser.username, login: registeredUser.login
        }

        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        return next(loginSuccess(currentUser))
    }

    return next(action)
}

export default authMiddleware
