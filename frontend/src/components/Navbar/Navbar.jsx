import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      setIsAuthenticated(true)
      try {
        const userData = JSON.parse(user)
        setUserName(userData.name || 'User')
      } catch {
        setUserName('User')
      }
    } else {
      setIsAuthenticated(false)
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    toast.success('Logged out successfully')
    navigate('/')
  }

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'Demo', path: '/demo' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="navbar">
      <div className="nav-container container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">✦</div>
          <span className="logo-text">AuraGen</span>
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="nav-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-user">
                  <span className="user-avatar">{userName?.charAt(0) || 'U'}</span>
                  <span className="user-name">{userName}</span>
                </Link>
                <button onClick={handleLogout} className="nav-logout">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary nav-signup">
                Get Started
              </Link>
            )}
          </div>
        </div>

        <div className="nav-hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar