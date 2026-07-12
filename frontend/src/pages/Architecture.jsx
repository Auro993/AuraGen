import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Architecture.css'

const ArchitecturePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const steps = [
    { 
      label: 'React Engine', 
      sublabel: '(Tracking & Scoring)',
      icon: '⚙️',
      color: '#7C5CFF'
    },
    { 
      label: 'Frontend (React)', 
      sublabel: '(React)',
      icon: '⚛️',
      color: '#61DAFB'
    },
    { 
      label: 'WebSocket (Real-time)', 
      sublabel: '(Real-time)',
      icon: '🔌',
      color: '#06B6D4'
    },
    { 
      label: 'Backend (Node.js)', 
      sublabel: '(Node.js)',
      icon: '🟢',
      color: '#68A063'
    },
    { 
      label: 'LangChain (Orchestration)', 
      sublabel: '(GPT-4o (LLM))',
      icon: '⛓️',
      color: '#8B5CF6'
    },
    { 
      label: 'Generated React Component', 
      sublabel: '(React Component)',
      icon: '⚛️',
      color: '#F59E0B'
    },
    { 
      label: 'AST Validator', 
      sublabel: '(Babel & Node.js)',
      icon: '🔒',
      color: '#EF4444'
    },
    { 
      label: 'React Renderer', 
      sublabel: '(Dynamic Injection)',
      icon: '🔄',
      color: '#EC4899'
    },
    { 
      label: 'Updated UI', 
      sublabel: '',
      icon: '✨',
      color: '#22C55E'
    }
  ]

  return (
    <div className="page architecture-page">
      <Navbar />
      <div className="arch-hero">
        <div className="container">
          <h1 className="arch-title">System Architecture</h1>
          <p className="arch-subtitle">AuraGen high-level architecture overview</p>
        </div>
      </div>

      <div className="container">
        <div className="arch-flow-container">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="arch-node-wrapper">
                <div className="arch-node glass-card">
                  <div className="arch-node-left">
                    <div className="arch-node-color-bar" style={{ background: step.color }}></div>
                    <div className="arch-node-icon">{step.icon}</div>
                  </div>
                  <div className="arch-node-content">
                    <div className="arch-node-label">{step.label}</div>
                    {step.sublabel && (
                      <div className="arch-node-sublabel">{step.sublabel}</div>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="arch-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ArchitecturePage