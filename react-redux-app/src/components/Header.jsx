import {useEffect, useState} from 'react'
import './header.css'

function Header() {
    const [dark, setDark] = useState(true) // по умолчанию тёмная

    useEffect(() => {
        document.body.className = dark ? 'dark' : 'light'
    }, [dark])

    return (
        <header className="header">
            <div className="header-top">
                <h1 className="logo">WarTech Info 🛰️</h1>
                <button onClick={() => setDark(!dark)}
                    className="theme-btn">
                    {dark ? '☀ Светлая тема' : '🌙 Тёмная тема'}
                </button>
            </div>
            <p className="tagline">
                Современная военная техника и технологии </p>
        </header>
    )
}

export default Header
