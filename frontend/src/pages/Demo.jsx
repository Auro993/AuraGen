// frontend/src/pages/Demo.jsx

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Demo.css'

const Demo = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const [wizardStep, setWizardStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    income: ''
  })
  const [wizardData, setWizardData] = useState({
    name: '',
    pan: '',
    income: '',
    business: ''
  })
  const [frictionScore, setFrictionScore] = useState(0)
  const [rageClicks, setRageClicks] = useState(0)

  const formFields = [
    { id: 'fullName', label: 'Full Name', placeholder: 'Enter your full name', required: true },
    { id: 'email', label: 'Email Address', placeholder: 'Enter your email', type: 'email', required: true },
    { id: 'phone', label: 'Phone Number', placeholder: 'Enter your phone', type: 'tel', required: true },
    { id: 'income', label: 'Annual Income ($)', placeholder: 'Enter your income', type: 'number', required: true }
  ]

  const wizardSteps = [
    { step: 'Step 1 of 4', question: 'What is your full name?', placeholder: 'Enter your full name', field: 'name', icon: '👤' },
    { step: 'Step 2 of 4', question: 'Enter your PAN Number', placeholder: 'Enter PAN', field: 'pan', icon: '🪪' },
    { step: 'Step 3 of 4', question: 'Enter your Annual Income', placeholder: 'Enter income in USD', field: 'income', icon: '💰' },
    { step: 'Step 4 of 4', question: 'Enter Business Details', placeholder: 'Enter business & salary details', field: 'business', icon: '🏢' }
  ]

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleWizardChange = (field, value) => {
    setWizardData({ ...wizardData, [field]: value })
  }

  const handleRageClick = () => {
    if (isGenerating || showWizard) return
    
    const newRageClicks = rageClicks + 1
    setRageClicks(newRageClicks)
    
    const newScore = Math.min(75 + newRageClicks * 5, 95)
    setFrictionScore(newScore)
    
    toast.error(`😤 Frustration detected! Friction Score: ${newScore}/100`)
    
    // Check if form has empty fields
    const emptyFields = Object.values(formData).filter(v => v.trim() === '')
    if (emptyFields.length > 0) {
      toast.error('Please fill in all fields first')
      return
    }
    
    startAIGeneration()
  }

  const startAIGeneration = () => {
    setIsGenerating(true)
    setStep(0)
    setProgress(0)
    
    const steps = [
      { text: 'Analyzing user behavior...', delay: 800, icon: '🔍' },
      { text: 'Calculating cognitive load...', delay: 1200, icon: '🧠' },
      { text: 'Generating simplified UI...', delay: 1600, icon: '🤖' },
      { text: 'Optimizing user interface...', delay: 800, icon: '✨' }
    ]

    steps.forEach((s, index) => {
      setTimeout(() => {
        setStep(index + 1)
        setProgress(((index + 1) / steps.length) * 100)
        
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsGenerating(false)
            setShowWizard(true)
            setWizardStep(0)
            toast.success('✅ Simplified UI generated successfully!')
          }, 500)
        }
      }, s.delay)
    })
  }

  const handleWizardNext = () => {
    const currentField = wizardSteps[wizardStep].field
    const currentValue = wizardData[currentField]
    
    if (!currentValue || currentValue.trim() === '') {
      toast.error('Please fill in this field')
      return
    }
    
    if (wizardStep < wizardSteps.length - 1) {
      setWizardStep(wizardStep + 1)
    } else {
      toast.success('🎉 Form submitted successfully!')
      setWizardStep(wizardStep + 1)
    }
  }

  const handleWizardBack = () => {
    if (wizardStep > 0) {
      setWizardStep(wizardStep - 1)
    }
  }

  const resetDemo = () => {
    setShowWizard(false)
    setWizardStep(0)
    setIsGenerating(false)
    setStep(0)
    setProgress(0)
    setRageClicks(0)
    setFrictionScore(0)
    setFormData({ fullName: '', email: '', phone: '', income: '' })
    setWizardData({ name: '', pan: '', income: '', business: '' })
    toast.success('🔄 Demo reset!')
  }

  const handleViewGeneratedUI = () => {
    navigate('/generated', { 
      state: { frictionScore: frictionScore || 81, from: 'demo' } 
    })
  }

  const isWizardComplete = wizardStep >= wizardSteps.length

  return (
    <div className="demo-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="demo-hero">
        <div className="container">
          <h1 className="demo-title">AI-Powered UI Transformation</h1>
          <p className="demo-subtitle">See how AuraGen turns confusion into clarity with real-time AI generation</p>
        </div>
      </section>

      {/* Main Demo Section */}
      <section className="demo-main">
        <div className="container">
          <div className="demo-grid">
            {/* Column 1: Original Form */}
            <div className="demo-card original-form-card">
              <div className="demo-card-header">
                <span className="demo-card-icon">📝</span>
                <h3 className="demo-card-title">Original Complex Form</h3>
                <span className="demo-card-badge">High Friction</span>
              </div>
              
              {showWizard ? (
                <div className="demo-success-state">
                  <div className="success-icon">✅</div>
                  <h4>Form Simplified!</h4>
                  <p>AI has transformed this complex form</p>
                  <button className="btn-primary view-generated-btn" onClick={handleViewGeneratedUI}>
                    View Generated UI →
                  </button>
                </div>
              ) : (
                <div className="demo-form">
                  {formFields.map((field) => (
                    <div key={field.id} className="form-group">
                      <label>
                        {field.label}
                        {field.required && <span className="required-star">*</span>}
                      </label>
                      <input 
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        className="form-input"
                        value={formData[field.id] || ''}
                        onChange={(e) => handleFormChange(field.id, e.target.value)}
                        disabled={isGenerating || showWizard}
                      />
                    </div>
                  ))}
                  
                  <button 
                    className="btn-danger rage-btn"
                    onClick={handleRageClick}
                    disabled={isGenerating || showWizard}
                  >
                    😤 I'm Confused! (Rage Click)
                  </button>
                </div>
              )}
            </div>

            {/* Column 2: AI Processing */}
            <div className="demo-card processing-card">
              <div className="demo-card-header">
                <span className="demo-card-icon">🤖</span>
                <h3 className="demo-card-title">AI Processing</h3>
                <span className="demo-card-badge status-badge">
                  {isGenerating ? 'Processing' : showWizard ? 'Complete' : 'Waiting'}
                </span>
              </div>
              
              {isGenerating ? (
                <div className="processing-content">
                  <div className="processing-steps">
                    {[
                      { text: 'Analyzing behavior...', icon: '🔍' },
                      { text: 'Calculating cognitive load...', icon: '🧠' },
                      { text: 'Generating simplified UI...', icon: '🤖' },
                      { text: 'Optimizing UI...', icon: '✨' }
                    ].map((s, index) => (
                      <div key={index} className={`processing-step ${step >= index + 1 ? 'active' : ''}`}>
                        <span className="step-status">{step >= index + 1 ? '✅' : '⏳'}</span>
                        <span className="step-label">{s.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="progress-wrapper">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="progress-label">{Math.round(progress)}%</span>
                  </div>
                </div>
              ) : showWizard ? (
                <div className="processing-complete">
                  <div className="complete-icon">🎉</div>
                  <h4>Generation Complete!</h4>
                  <p>Friction reduced by 45%</p>
                  <div className="friction-compare">
                    <span className="before">81</span>
                    <span className="arrow">→</span>
                    <span className="after">44</span>
                  </div>
                </div>
              ) : (
                <div className="processing-waiting">
                  <div className="waiting-icon">⏳</div>
                  <p>Click "I'm Confused!"</p>
                  <span className="waiting-hint">to start AI generation</span>
                </div>
              )}
            </div>

            {/* Column 3: Generated UI */}
            <div className="demo-card wizard-card">
              <div className="demo-card-header">
                <span className="demo-card-icon">✨</span>
                <h3 className="demo-card-title">Generated UI</h3>
                <span className="demo-card-badge">
                  {showWizard ? 'Active' : 'Ready'}
                </span>
              </div>
              
              {showWizard && !isGenerating ? (
                <div className="wizard-content">
                  {isWizardComplete ? (
                    <div className="wizard-complete-state">
                      <div className="complete-icon">🎉</div>
                      <h4>All Done!</h4>
                      <p>Form submitted successfully</p>
                      <button className="btn-primary view-generated-btn" onClick={handleViewGeneratedUI}>
                        View UI →
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="wizard-progress">
                        <span className="wizard-step-label">{wizardSteps[wizardStep].step}</span>
                        <div className="wizard-progress-track">
                          <div 
                            className="wizard-progress-fill"
                            style={{ width: `${((wizardStep + 1) / wizardSteps.length) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="wizard-step-content">
                        <div className="wizard-icon">{wizardSteps[wizardStep].icon}</div>
                        <h4 className="wizard-question">{wizardSteps[wizardStep].question}</h4>
                        <input 
                          type="text"
                          placeholder={wizardSteps[wizardStep].placeholder}
                          className="wizard-input"
                          value={wizardData[wizardSteps[wizardStep].field] || ''}
                          onChange={(e) => handleWizardChange(
                            wizardSteps[wizardStep].field,
                            e.target.value
                          )}
                          onKeyPress={(e) => e.key === 'Enter' && handleWizardNext()}
                          autoFocus
                        />
                        <div className="wizard-nav">
                          <button 
                            className="btn-secondary wizard-back-btn"
                            onClick={handleWizardBack}
                            disabled={wizardStep === 0}
                          >
                            ← Back
                          </button>
                          <button 
                            className="btn-primary wizard-next-btn"
                            onClick={handleWizardNext}
                          >
                            {wizardStep === wizardSteps.length - 1 ? 'Submit ✓' : 'Next →'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="wizard-dots">
                        {wizardSteps.map((_, index) => (
                          <div 
                            key={index} 
                            className={`wizard-dot ${index === wizardStep ? 'active' : ''} ${index < wizardStep ? 'completed' : ''}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="wizard-placeholder">
                  <div className="placeholder-icon">✨</div>
                  <p>Click "I'm Confused!"</p>
                  <span className="placeholder-hint">to see AI generate a simplified UI</span>
                </div>
              )}
            </div>
          </div>

          {/* Reset Button */}
          {showWizard && (
            <div className="demo-reset-container">
              <button className="btn-secondary reset-demo-btn" onClick={resetDemo}>
                🔄 Reset Demo
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="demo-features">
        <div className="container">
          <h3 className="demo-features-title">What's Happening Behind the Scenes</h3>
          <div className="demo-features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h4>Friction Detection</h4>
              <p>Real-time analysis of user behavior and frustration signals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h4>AI Analysis</h4>
              <p>Gemini-powered cognitive load calculation and pattern recognition</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h4>Instant Generation</h4>
              <p>Automatic UI simplification and adaptive interface creation</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Demo