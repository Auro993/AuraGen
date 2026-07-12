import React from 'react'
import { Link } from 'react-router-dom'
import './Features.css'

const Features = () => {
  const features = [
    {
      icon: '🧠',
      title: 'Cognitive Load Detection',
      description: 'Tracks mouse movement, hesitation time, rage clicks, and other signals to measure user frustration in real-time.',
      color: '#7C5CFF'
    },
    {
      icon: '⚡',
      title: 'Real-Time AI Generation',
      description: 'Uses LLMs (GPT-4) to generate simple, step-by-step interfaces on the fly based on user behavior patterns.',
      color: '#4F8CFF'
    },
    {
      icon: '🔄',
      title: 'Dynamic Rendering',
      description: 'Injects newly generated React components into the live UI without refreshing the page using React Suspense.',
      color: '#22C55E'
    },
    {
      icon: '🔒',
      title: 'Secure AST Validation',
      description: 'Parses and validates AI-generated code using Abstract Syntax Tree to ensure security and reliability.',
      color: '#EF4444'
    },
    {
      icon: '📡',
      title: 'WebSocket Communication',
      description: 'Bi-directional real-time communication between frontend and backend for instant updates and monitoring.',
      color: '#F59E0B'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Visualizes user behavior, friction scores, and interface performance on a real-time interactive dashboard.',
      color: '#06B6D4'
    }
  ]

  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card glass-card">
              <div className="feature-icon" style={{ background: `${feature.color}15` }}>
                <span>{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="features-cta glass-card">
          <h3>Build interfaces that understand your users.</h3>
          <p>AuraGen adapts. Users succeed.</p>
          <Link to="/demo" className="btn-primary">Get Started</Link>
        </div>
      </div>
    </section>
  )
}

export default Features