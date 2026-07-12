import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Demo.css'

const Demo = () => {
  const [step, setStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const [wizardStep, setWizardStep] = useState(0)

  const formFields = [
    { label: 'Full Name', placeholder: 'Enter your full name' },
    { label: 'Email Address', placeholder: 'Enter your email' },
    { label: 'Phone Number', placeholder: 'Enter your phone' },
    { label: 'Annual Income ($)', placeholder: 'Enter your income' }
  ]

  const wizardSteps = [
    { step: 'Step 1 of 3', question: 'What is your full name?', placeholder: 'Enter your full name' },
    { step: 'Step 2', question: 'Enter PAN Number', placeholder: 'Enter PAN' },
    { step: 'Step 3', question: 'Enter Annual Income', placeholder: 'Enter income' },
    { step: 'Step 4', question: 'Enter Business & Salary', placeholder: 'Enter details' }
  ]

  const handleRageClick = () => {
    if (!isGenerating && !showWizard) {
      setIsGenerating(true)
      setStep(0)
      
      const steps = [
        { text: 'Analyzing behavior...', delay: 1000 },
        { text: 'Calculating cognitive load...', delay: 1500 },
        { text: 'Generating simplified UI...', delay: 2000 },
        { text: 'Optimizing user interface...', delay: 1000 }
      ]

      steps.forEach((s, index) => {
        setTimeout(() => {
          setStep(index + 1)
          if (index === steps.length - 1) {
            setTimeout(() => {
              setIsGenerating(false)
              setShowWizard(true)
              setWizardStep(0)
            }, 500)
          }
        }, s.delay)
      })
    }
  }

  const handleWizardNext = () => {
    if (wizardStep < wizardSteps.length - 1) {
      setWizardStep(wizardStep + 1)
    }
  }

  const resetDemo = () => {
    setShowWizard(false)
    setWizardStep(0)
    setIsGenerating(false)
  }

  return (
    <div className="page demo-page">
      <Navbar />
      
      <div className="demo-hero">
        <div className="container">
          <h1 className="demo-title">AI-Powered UI Transformation</h1>
          <p className="demo-subtitle">See how AuraGen turns confusion into clarity.</p>
        </div>
      </div>

      <div className="container">
        <div className="demo-grid">
          {/* Left: Original Form */}
          <div className="demo-card glass-card">
            <h3 className="demo-card-title">Original Complex Forms</h3>
            <div className="demo-form">
              {formFields.map((field, index) => (
                <div key={index} className="form-group">
                  <label>{field.label}</label>
                  <input 
                    type="text" 
                    placeholder={field.placeholder}
                    className="form-input"
                    disabled={showWizard}
                  />
                </div>
              ))}
              <button 
                className="btn-danger demo-rage-btn"
                onClick={handleRageClick}
                disabled={showWizard || isGenerating}
              >
                😤 I'm Confused! (Rage Click)
              </button>
            </div>
          </div>

          {/* Center: AI Processing */}
          <div className="demo-card glass-card demo-processing">
            <h3 className="demo-card-title">User Problem Detected</h3>
            <div className="processing-steps">
              <div className={`processing-step ${step >= 1 ? 'active' : ''}`}>
                <span className="step-check">{step >= 1 ? '✓' : '○'}</span>
                <span>Analyzing behavior...</span>
              </div>
              <div className={`processing-step ${step >= 2 ? 'active' : ''}`}>
                <span className="step-check">{step >= 2 ? '✓' : '○'}</span>
                <span>Calculating cognitive load...</span>
              </div>
              <div className={`processing-step ${step >= 3 ? 'active' : ''}`}>
                <span className="step-check">{step >= 3 ? '✓' : '○'}</span>
                <span>Generating simplified UI...</span>
              </div>
              <div className={`processing-step ${step >= 4 ? 'active' : ''}`}>
                <span className="step-check">{step >= 4 ? '✓' : '○'}</span>
                <span>Optimizing user interface...</span>
              </div>
            </div>
          </div>

          {/* Right: Wizard UI */}
          <div className="demo-card glass-card">
            <h3 className="demo-card-title">AI Generated Simplified UI</h3>
            
            {showWizard && !isGenerating ? (
              <div className="wizard-container">
                <div className="wizard-progress">
                  {wizardSteps[wizardStep].step}
                </div>
                <div className="wizard-step">
                  <h4 className="wizard-question">{wizardSteps[wizardStep].question}</h4>
                  <input 
                    type="text" 
                    placeholder={wizardSteps[wizardStep].placeholder}
                    className="wizard-input"
                  />
                  <button className="btn-primary wizard-next" onClick={handleWizardNext}>
                    Next →
                  </button>
                </div>
                <div className="wizard-indicators">
                  {wizardSteps.map((_, index) => (
                    <div 
                      key={index} 
                      className={`wizard-dot ${index === wizardStep ? 'active' : ''} ${index < wizardStep ? 'completed' : ''}`}
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="wizard-placeholder">
                <div className="placeholder-icon">✨</div>
                <p>Click the "I'm Confused!" button</p>
                <p className="placeholder-hint">to see AI generate a simplified UI</p>
              </div>
            )}

            {showWizard && !isGenerating && (
              <button className="btn-secondary reset-btn" onClick={resetDemo}>
                Reset Demo
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Demo