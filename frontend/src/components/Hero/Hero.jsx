import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            AI-Powered Adaptive UI
          </div>
          
          <h1 className="hero-title">
            Self-Healing
            <br />
            <span className="gradient-text">Generative UI</span>
            <br />
            via Cognitive Load
          </h1>
          
          <p className="hero-subtitle">
            AuraGen detects user frustration in real time and generates simplified, 
            adaptive interfaces that make complex tasks feel effortless.
          </p>

          <div className="hero-buttons">
            <Link to="/demo" className="btn-primary hero-btn">
              Get Started
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 5l7 7-7 7M5 12h15" />
              </svg>
            </Link>
            <button className="btn-secondary hero-btn">Watch Demo</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero