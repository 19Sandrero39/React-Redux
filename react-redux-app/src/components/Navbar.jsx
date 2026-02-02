import {Link} from 'react-router-dom'
import './navbar.css'

function Navbar() {
  return (
    <nav className = "navbar">
      <Link to = "/">🏠 Главная</Link >
      <Link to = "/tasks">📋 Мои задачи</Link >
      <Link to = "/about">ℹ О проекте</Link >
    </nav >
  )
}

export default Navbar
