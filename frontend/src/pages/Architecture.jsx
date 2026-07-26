// frontend/src/pages/Architecture.jsx

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Architecture.css'

const ArchitecturePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [activeNode, setActiveNode] = useState(null)

  const architectureData = {
    title: 'System Architecture',
    subtitle: 'AuraGen high-level architecture overview',
    layers: [
      {
        name: 'Frontend Layer',
        icon: '🖥️',
        color: '#7C5CFF',
        nodes: [
          { 
            label: 'React Engine', 
            sublabel: 'Tracking & Scoring',
            icon: '⚙️',
            color: '#7C5CFF',
            description: 'Tracks user interactions, clicks, mouse movements, and idle time'
          },
          { 
            label: 'Frontend (React)', 
            sublabel: 'UI Rendering',
            icon: '⚛️',
            color: '#61DAFB',
            description: 'Dynamic UI components with real-time updates'
          },
          { 
            label: 'WebSocket', 
            sublabel: 'Real-time Communication',
            icon: '🔌',
            color: '#06B6D4',
            description: 'Bidirectional real-time data streaming'
          }
        ]
      },
      {
        name: 'Backend Layer',
        icon: '⚙️',
        color: '#F59E0B',
        nodes: [
          { 
            label: 'Backend (Node.js)', 
            sublabel: 'API & Logic',
            icon: '🟢',
            color: '#68A063',
            description: 'RESTful API, authentication, and business logic'
          },
          { 
            label: 'LangChain', 
            sublabel: 'Orchestration',
            icon: '⛓️',
            color: '#8B5CF6',
            description: 'Orchestrates AI workflows and LLM interactions'
          },
          { 
            label: 'AI Model', 
            sublabel: 'Gemini 2.5 Flash',
            icon: '🧠',
            color: '#EC4899',
            description: 'Generates UI recommendations and improvements'
          }
        ]
      },
      {
        name: 'Generation Layer',
        icon: '✨',
        color: '#22C55E',
        nodes: [
          { 
            label: 'Generated Component', 
            sublabel: 'React Component',
            icon: '⚛️',
            color: '#F59E0B',
            description: 'AI-generated React components'
          },
          { 
            label: 'AST Validator', 
            sublabel: 'Babel & Node.js',
            icon: '🔒',
            color: '#EF4444',
            description: 'Validates generated code syntax and structure'
          },
          { 
            label: 'React Renderer', 
            sublabel: 'Dynamic Injection',
            icon: '🔄',
            color: '#EC4899',
            description: 'Injects generated components into the DOM'
          },
          { 
            label: 'Updated UI', 
            sublabel: 'Final Output',
            icon: '✨',
            color: '#22C55E',
            description: 'Self-healing UI with reduced friction'
          }
        ]
      }
    ]
  }

  return (
    <div className="page architecture-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="arch-hero">
        <div className="container">
          <h1 className="arch-title">System Architecture</h1>
          <p className="arch-subtitle">AuraGen high-level architecture overview</p>
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="arch-content">
        <div className="container">
          <div className="arch-flow-container">
            {architectureData.layers.map((layer, layerIndex) => (
              <div key={layerIndex} className="arch-layer">
                <div className="arch-layer-header">
                  <span className="arch-layer-icon">{layer.icon}</span>
                  <h3 className="arch-layer-name" style={{ color: layer.color }}>
                    {layer.name}
                  </h3>
                  <div className="arch-layer-line" style={{ background: layer.color }} />
                </div>
                
                <div className="arch-layer-nodes">
                  {layer.nodes.map((node, nodeIndex) => (
                    <div 
                      key={nodeIndex} 
                      className="arch-node-wrapper"
                      onMouseEnter={() => setActiveNode(`${layerIndex}-${nodeIndex}`)}
                      onMouseLeave={() => setActiveNode(null)}
                    >
                      <div className={`arch-node glass-card ${activeNode === `${layerIndex}-${nodeIndex}` ? 'active' : ''}`}>
                        <div className="arch-node-left">
                          <div className="arch-node-color-bar" style={{ background: node.color }} />
                          <div className="arch-node-icon-wrapper">
                            <span className="arch-node-icon">{node.icon}</span>
                          </div>
                        </div>
                        <div className="arch-node-content">
                          <div className="arch-node-label">{node.label}</div>
                          <div className="arch-node-sublabel">{node.sublabel}</div>
                          {activeNode === `${layerIndex}-${nodeIndex}` && (
                            <div className="arch-node-description">{node.description}</div>
                          )}
                        </div>
                      </div>
                      
                      {nodeIndex < layer.nodes.length - 1 && (
                        <div className="arch-arrow">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12l7 7 7-7"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {layerIndex < architectureData.layers.length - 1 && (
                  <div className="arch-layer-divider">
                    <div className="arch-divider-line" />
                    <span className="arch-divider-icon">⬇</span>
                    <div className="arch-divider-line" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="arch-legend">
            <h4 className="arch-legend-title">Legend</h4>
            <div className="arch-legend-items">
              {architectureData.layers.map((layer, index) => (
                <div key={index} className="arch-legend-item">
                  <span className="arch-legend-dot" style={{ background: layer.color }} />
                  <span className="arch-legend-label">{layer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ArchitecturePage