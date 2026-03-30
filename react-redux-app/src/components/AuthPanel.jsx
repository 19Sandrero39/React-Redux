import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loginRequest, logout, registerRequest} from '../features/authSlice'
import './auth-panel.css'

const emptyRegistration = {
    username: '',
    login: '',
    password: '',
    confirmPassword: ''
}

const emptyLogin = {
    login: '',
    password: ''
}

function AuthPanel() {
    const dispatch = useDispatch()
    const {currentUser, registeredUser, error} = useSelector(state => state.auth)
    const [registrationForm, setRegistrationForm] = useState(emptyRegistration)
    const [loginForm, setLoginForm] = useState(emptyLogin)

    const handleRegistrationChange = event => {
        const {name, value} = event.target
        setRegistrationForm(prev => ({...prev, [name]: value}))
    }

    const handleLoginChange = event => {
        const {name, value} = event.target
        setLoginForm(prev => ({...prev, [name]: value}))
    }

    const handleRegister = event => {
        event.preventDefault()
        dispatch(registerRequest(registrationForm))
        setRegistrationForm(emptyRegistration)
    }

    const handleLogin = event => {
        event.preventDefault()
        dispatch(loginRequest(loginForm))
        setLoginForm(emptyLogin)
    }

    if (currentUser) {
        return (
            <section className="auth-panel">
                <h2>Авторизация</h2>
                <p className="auth-success">Вы вошли как <b>{currentUser.username}</b>.</p>
                <button
                    type="button"
                    onClick={() => dispatch(logout())}
                >Выйти
                </button>
            </section>
        )
    }

    return (
        <section className="auth-panel">
            <h2>Регистрация и вход</h2>

            <div className="auth-forms">
                <form
                    className="auth-form"
                    onSubmit={handleRegister}
                >
                    <h3>Кастомная регистрация</h3>
                    <input
                        name="username"
                        placeholder="Имя"
                        value={registrationForm.username}
                        onChange={handleRegistrationChange}
                    />
                    <input
                        name="login"
                        placeholder="Логин"
                        value={registrationForm.login}
                        onChange={handleRegistrationChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={registrationForm.password}
                        onChange={handleRegistrationChange}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Повторите пароль"
                        value={registrationForm.confirmPassword}
                        onChange={handleRegistrationChange}
                    />
                    <button type="submit">Зарегистрироваться</button>
                </form>

                <form
                    className="auth-form"
                    onSubmit={handleLogin}
                >
                    <h3>Авторизация</h3>
                    <input
                        name="login"
                        placeholder="Логин"
                        value={loginForm.login}
                        onChange={handleLoginChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                    />
                    <button type="submit">Войти</button>
                    {registeredUser && <small>Зарегистрирован: {registeredUser.username}</small>}
                </form>
            </div>

            {error && <p className="auth-error">{error}</p>}
        </section>
    )
}

export default AuthPanel