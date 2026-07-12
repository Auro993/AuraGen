import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const sections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', path: '/features' },
        { name: 'Architecture', path: '/architecture' },
        { name: 'Demo', path: '/demo' },
        { name: 'Pricing', path: '/pricing' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '/docs' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' }
      ]
    }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">✦</span>
              <span className="logo-text">AuraGen</span>
            </div>
            <p className="footer-description">
              Self-Healing Generative UI via Cognitive Load. 
              Making complex tasks feel effortless.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">💼</a>
              <a href="#" className="social-link">📺</a>
              <a href="#" className="social-link">🐙</a>
            </div>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4 className="footer-section-title">{section.title}</h4>
              <ul className="footer-links">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 AuraGen. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer