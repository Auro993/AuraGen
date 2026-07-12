import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Pages.css'

const NotFound = () => {
  return (
    <div className="page">
      <Navbar />
      <div style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <h1 style={{ fontSize: '80px', fontWeight: '800', color: '#7C5CFF' }}>404</h1>
        <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Page Not Found</h2>
        <p style={{ color: '#9CA3AF', marginBottom: '24px' }}>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
      <Footer />
    </div>
  )
}

export default NotFound