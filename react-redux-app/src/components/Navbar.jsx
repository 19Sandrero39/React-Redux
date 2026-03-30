import {Link} from 'react-router-dom'
import './navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">🪖 Техника</Link>
            <Link to="/tasks">📚 Энциклопедия</Link>
            <Link to="/about">🌍 О проекте</Link>
        </nav>
    )
}

export default Navbar
