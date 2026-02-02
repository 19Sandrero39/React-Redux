import {useEffect, useState} from 'react'
import './header.css'

function Header() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.body.className = dark ? 'dark' : ''
  }, [dark])

  return (
    <header className = "header">
      <div className = "header-top">
        <h1 className = "logo">TaskFlow 🚀</h1 >
        <button
          onClick = {() => setDark(!dark)}
          className = "theme-btn"
        >
          {dark ? '☀ Светлая' : '🌙 Тёмная'}
        </button >
      </div >
      <p className = "tagline">Управляй задачами. Управляй жизнью.</p >
    </header >
  )
}

export default Header
