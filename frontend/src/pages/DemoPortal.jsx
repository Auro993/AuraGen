import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import TaxForm from '../components/demo/TaxForm'
import useBehaviourTracking from '../hooks/useBehaviourTracking'
import { saveBehaviour } from '../services/behaviourApi'
import './DemoPortal.css'

const DemoPortal = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('demoportal')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [frictionScore, setFrictionScore] = useState(null)
  
  // Track behaviour on this page
  const behaviour = useBehaviourTracking('demo-session-001')
  
  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    
    try {
      // Add behaviour data to form submission
      const payload = {
        ...formData,
        behaviour: {
          mouseDistance: behaviour.mouseDistance,
          clicks: behaviour.clicks,
          wrongClicks: behaviour.wrongClicks,
          idleTime: behaviour.idleTime,
          scrollDepth: behaviour.scrollDepth,
          formErrors: behaviour.formErrors || 0,
          sessionId: behaviour.sessionId,
          duration: behaviour.duration || 0
        }
      }
      
      // Save behaviour to backend
      const response = await saveBehaviour(payload)
      
      // Get friction score from response
      if (response.data?.frictionScore) {
        setFrictionScore(response.data.frictionScore)
        // Navigate to friction engine to see results
        setTimeout(() => {
          navigate('/friction', { 
            state: { 
              frictionScore: response.data.frictionScore,
              from: 'demo-portal'
            }
          })
        }, 1500)
      }
      
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="demo-portal-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="demo-portal-main">
        <div className="demo-portal-header">
          <div>
            <h1 className="demo-portal-title">📝 Demo Portal</h1>
            <p className="demo-portal-subtitle">
              Fill out the form below. AuraGen will track your behaviour 
              and analyze friction in real-time.
            </p>
          </div>
          <div className="demo-portal-status">
            <span className="status-label">Tracking:</span>
            <span className="status-dot active"></span>
            <span className="status-text">Active</span>
          </div>
        </div>
        
        <div className="demo-portal-content">
          <div className="demo-portal-form-card glass-card">
            <TaxForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
          
          <div className="demo-portal-info-card glass-card">
            <h3 className="info-title">📊 What's Happening?</h3>
            <div className="info-stats">
              <div className="info-stat">
                <span className="stat-icon">🖱️</span>
                <span className="stat-label">Mouse Distance</span>
                <span className="stat-value">{behaviour.mouseDistance || 0}px</span>
              </div>
              <div className="info-stat">
                <span className="stat-icon">👆</span>
                <span className="stat-label">Clicks</span>
                <span className="stat-value">{behaviour.clicks || 0}</span>
              </div>
              <div className="info-stat">
                <span className="stat-icon">❌</span>
                <span className="stat-label">Wrong Clicks</span>
                <span className="stat-value">{behaviour.wrongClicks || 0}</span>
              </div>
              <div className="info-stat">
                <span className="stat-icon">⏱️</span>
                <span className="stat-label">Idle Time</span>
                <span className="stat-value">{behaviour.idleTime || 0}s</span>
              </div>
              <div className="info-stat">
                <span className="stat-icon">📜</span>
                <span className="stat-label">Scroll Depth</span>
                <span className="stat-value">{behaviour.scrollDepth || 0}%</span>
              </div>
              <div className="info-stat">
                <span className="stat-icon">⏳</span>
                <span className="stat-label">Session Duration</span>
                <span className="stat-value">{behaviour.duration || 0}s</span>
              </div>
            </div>
            
            {frictionScore !== null && (
              <div className="info-friction-result">
                <h4>🧠 Friction Score Calculated</h4>
                <div className="friction-result-value">{frictionScore}/100</div>
                <p>Redirecting to Friction Engine...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DemoPortal