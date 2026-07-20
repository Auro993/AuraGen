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
  const [submitError, setSubmitError] = useState(null)
  
  const behaviour = useBehaviourTracking('demo-session-001')
  
  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Prepare the payload with correct structure
      const payload = {
        sessionId: behaviour.sessionId || `demo-${Date.now()}`,
        behaviour: {
          mouseDistance: behaviour.mouseDistance || 0,
          clicks: behaviour.clicks || 0,
          wrongClicks: behaviour.wrongClicks || 0,
          idleTime: behaviour.idleTime || 0,
          scrollDepth: behaviour.scrollDepth || 0,
          formErrors: behaviour.formErrors || 0,
          duration: behaviour.duration || 0,
          rageClicks: behaviour.rageClicks || 0
        },
        formData: formData || {}
      }
      
      console.log('📤 Sending payload:', payload)
      
      const response = await saveBehaviour(payload)
      
      console.log('✅ Response:', response.data)
      
      if (response.data?.frictionScore) {
        setFrictionScore(response.data.frictionScore)
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
      console.error('❌ Error submitting form:', error)
      setSubmitError(error.response?.data?.message || error.message || 'Something went wrong')
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
            <h1 className="demo-portal-title">🧪 Demo Portal</h1>
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
            {submitError && (
              <div className="demo-portal-error">
                <span>❌</span>
                <span>{submitError}</span>
              </div>
            )}
          </div>
          
          <div className="demo-portal-info-card glass-card">
            <h3 className="info-title">📊 Live Behaviour Stats</h3>
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