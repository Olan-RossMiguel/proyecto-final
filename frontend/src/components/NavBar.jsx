import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css' // Vamos a separar estilos

export default function NavBar () {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='logo'>MiApp</div>
        <div className={`links ${menuOpen ? 'active' : ''}`}>
          <Link to='/' className='nav-link'>Home</Link>
          <Link to='/login' className='nav-link'>Login</Link>
          <Link to='/about' className='nav-link'>About</Link>
        </div>
        <div
          className='hamburger'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>
    </nav>
  )
}
