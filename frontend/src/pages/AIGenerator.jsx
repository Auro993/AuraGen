import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import './AIGenerator.css'

const AIGenerator = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('ai')
  const [isGenerating, setIsGenerating] = useState(false)
  const [targetPage, setTargetPage] = useState('Pricing')
  const [goal, setGoal] = useState('Reduce Cognitive Load')
  const [style, setStyle] = useState('Minimal')
  const [layout, setLayout] = useState('Wizard')
  const [reduceFields, setReduceFields] = useState(true)
  const [improveHierarchy, setImproveHierarchy] = useState(true)
  const [progressiveDisclosure, setProgressiveDisclosure] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const kpiData = [
    { icon: '🤖', label: 'UI Generated', value: '128', change: '+12%', positive: true, color: '#7C5CFF' },
    { icon: '✅', label: 'Success Rate', value: '94%', change: '+8%', positive: true, color: '#22C55E' },
    { icon: '⏱️', label: 'Avg Generation Time', value: '2.48 sec', change: '-0.3s', positive: true, color: '#3B82F6' },
    { icon: '👥', label: 'Users Impacted', value: '320', change: '+15%', positive: true, color: '#F59E0B' },
  ]

  const frictionData = [
    { label: 'Cognitive Load', value: 42, max: 100, color: '#EF4444' },
    { label: 'Navigation Issues', value: 28, max: 100, color: '#F59E0B' },
    { label: 'Interaction Complexity', value: 18, max: 100, color: '#7C5CFF' },
    { label: 'Visual Clarity', value: 12, max: 100, color: '#22C55E' },
  ]

  const totalFriction = 72

  const reasons = [
    { icon: '⚠️', text: 'High Cognitive Load', color: '#EF4444' },
    { icon: '⚠️', text: 'Users Leaving Form', color: '#EF4444' },
    { icon: '⚠️', text: 'Too Many Fields', color: '#F59E0B' },
  ]

  const changes = [
    'Reduced Fields',
    'Step-by-Step Form',
    'Better Typography',
    'Better Button Placement',
    'Simplified Navigation',
  ]

  const impactData = [
    { label: 'Friction Reduced', value: '-38%', color: '#22C55E' },
    { label: 'Task Success', value: '+27%', color: '#7C5CFF' },
    { label: 'Completion Time', value: '-32%', color: '#3B82F6' },
    { label: 'User Satisfaction', value: '+31%', color: '#F59E0B' },
  ]

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="ai-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ai-main">
        {/* Header */}
        <div className="ai-header">
          <div>
            <h1 className="ai-title">AI Generator</h1>
            <p className="ai-subtitle">Generate adaptive interfaces using AI.</p>
          </div>
          <div className="ai-actions">
            <button className="btn-secondary">📅 Last 7 Days</button>
            <button className="btn-primary">Export Report</button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="ai-kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="ai-kpi-card glass-card" style={{ borderColor: kpi.color }}>
              <div className="ai-kpi-header">
                <span className="ai-kpi-icon">{kpi.icon}</span>
                <span className={`ai-kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>
                  {kpi.change}
                </span>
              </div>
              <span className="ai-kpi-value">{kpi.value}</span>
              <span className="ai-kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>

        {/* Main Layout: Friction Summary | AI Config | Generated Preview */}
        <div className="ai-main-grid">
          {/* Friction Summary */}
          <div className="ai-friction-card glass-card">
            <h3 className="ai-card-title">Friction Summary</h3>
            {frictionData.map((item, index) => (
              <div key={index} className="ai-friction-item">
                <div className="ai-friction-header">
                  <span className="ai-friction-label">{item.label}</span>
                  <span className="ai-friction-value">{item.value}/{item.max}</span>
                </div>
                <div className="ai-friction-bar-track">
                  <div 
                    className="ai-friction-bar-fill"
                    style={{ 
                      width: `${(item.value / item.max) * 100}%`,
                      background: item.color
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="ai-friction-total">
              <span className="ai-friction-total-label">Overall Score</span>
              <span className="ai-friction-total-value">{totalFriction}/100</span>
              <span className={`ai-friction-total-badge ${totalFriction > 70 ? 'high' : totalFriction > 40 ? 'medium' : 'low'}`}>
                {totalFriction > 70 ? '🔴 High' : totalFriction > 40 ? '🟡 Medium' : '🟢 Low'}
              </span>
            </div>
          </div>

          {/* AI Configuration */}
          <div className="ai-config-card glass-card">
            <h3 className="ai-card-title">AI Generation Parameters</h3>
            <div className="ai-config-group">
              <label className="ai-config-label">Target Page</label>
              <select 
                className="ai-config-select" 
                value={targetPage}
                onChange={(e) => setTargetPage(e.target.value)}
              >
                <option>Pricing</option>
                <option>Checkout</option>
                <option>Registration</option>
                <option>Dashboard</option>
              </select>
            </div>
            <div className="ai-config-group">
              <label className="ai-config-label">Goal</label>
              <select 
                className="ai-config-select" 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option>Reduce Cognitive Load</option>
                <option>Increase Conversions</option>
                <option>Improve Engagement</option>
                <option>Simplify Navigation</option>
              </select>
            </div>
            <div className="ai-config-group">
              <label className="ai-config-label">Style</label>
              <select 
                className="ai-config-select" 
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option>Minimal</option>
                <option>Modern</option>
                <option>Corporate</option>
                <option>Playful</option>
              </select>
            </div>
            <div className="ai-config-group">
              <label className="ai-config-label">Layout</label>
              <select 
                className="ai-config-select" 
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
              >
                <option>Wizard</option>
                <option>Grid</option>
                <option>List</option>
                <option>Cards</option>
              </select>
            </div>
            <div className="ai-config-options">
              <label className="ai-config-checkbox">
                <input 
                  type="checkbox" 
                  checked={reduceFields}
                  onChange={(e) => setReduceFields(e.target.checked)}
                />
                <span>Reduce Form Fields</span>
              </label>
              <label className="ai-config-checkbox">
                <input 
                  type="checkbox" 
                  checked={improveHierarchy}
                  onChange={(e) => setImproveHierarchy(e.target.checked)}
                />
                <span>Improve Hierarchy</span>
              </label>
              <label className="ai-config-checkbox">
                <input 
                  type="checkbox" 
                  checked={progressiveDisclosure}
                  onChange={(e) => setProgressiveDisclosure(e.target.checked)}
                />
                <span>Progressive Disclosure</span>
              </label>
            </div>
          </div>

          {/* Generated UI Preview */}
          <div className="ai-preview-card glass-card">
            <h3 className="ai-card-title">Generated UI Preview</h3>
            <div className="ai-preview-container">
              <div className="ai-preview-content">
                <div className="ai-preview-header">
                  <span className="ai-preview-badge">✨ AI Generated</span>
                </div>
                <div className="ai-preview-wizard">
                  <div className="ai-preview-step">
                    <span className="ai-preview-step-number">1</span>
                    <div className="ai-preview-step-content">
                      <h4>What is your full name?</h4>
                      <input type="text" placeholder="Enter your name" className="ai-preview-input" />
                    </div>
                  </div>
                  <div className="ai-preview-step">
                    <span className="ai-preview-step-number">2</span>
                    <div className="ai-preview-step-content">
                      <h4>What is your email address?</h4>
                      <input type="email" placeholder="Enter your email" className="ai-preview-input" />
                    </div>
                  </div>
                  <div className="ai-preview-step">
                    <span className="ai-preview-step-number">3</span>
                    <div className="ai-preview-step-content">
                      <h4>Select your plan</h4>
                      <div className="ai-preview-plans">
                        <div className="ai-preview-plan active">Basic</div>
                        <div className="ai-preview-plan">Pro</div>
                        <div className="ai-preview-plan">Enterprise</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="ai-preview-next">Next →</button>
              </div>
            </div>
            <div className="ai-preview-actions">
              <button className="btn-secondary" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? '⏳ Generating...' : '🔄 Regenerate'}
              </button>
              <button className="btn-secondary">📊 Compare</button>
              <button className="btn-primary">✅ Apply UI</button>
            </div>
          </div>
        </div>

        {/* Why Generated | Changes | Impact */}
        <div className="ai-bottom-grid">
          {/* Why Generated */}
          <div className="ai-reason-card glass-card">
            <h3 className="ai-card-title">Why AI Generated This</h3>
            {reasons.map((reason, index) => (
              <div key={index} className="ai-reason-item" style={{ borderColor: reason.color }}>
                <span className="ai-reason-icon">{reason.icon}</span>
                <span className="ai-reason-text">{reason.text}</span>
              </div>
            ))}
            <div className="ai-recommendation">
              <span className="ai-recommendation-icon">💡</span>
              <span className="ai-recommendation-text">Use Wizard Layout</span>
            </div>
          </div>

          {/* Changes Implemented */}
          <div className="ai-changes-card glass-card">
            <h3 className="ai-card-title">Changes Implemented</h3>
            {changes.map((change, index) => (
              <div key={index} className="ai-change-item">
                <span className="ai-change-icon">✔</span>
                <span className="ai-change-text">{change}</span>
              </div>
            ))}
          </div>

          {/* Estimated Impact */}
          <div className="ai-impact-card glass-card">
            <h3 className="ai-card-title">Estimated Impact</h3>
            <div className="ai-impact-grid">
              {impactData.map((item, index) => (
                <div key={index} className="ai-impact-item">
                  <span className="ai-impact-value" style={{ color: item.color }}>{item.value}</span>
                  <span className="ai-impact-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Model Status */}
        <div className="ai-status-card glass-card">
          <div className="ai-status-content">
            <div className="ai-status-left">
              <span className="ai-status-icon">🧠</span>
              <div className="ai-status-info">
                <h4 className="ai-status-title">AuraGen Adaptive Engine</h4>
                <span className="ai-status-subtitle">AI Model</span>
              </div>
            </div>
            <div className="ai-status-right">
              <div className="ai-status-item">
                <span className="ai-status-label">Status</span>
                <span className="ai-status-value running">🟢 Running</span>
              </div>
              <div className="ai-status-item">
                <span className="ai-status-label">Model</span>
                <span className="ai-status-value">Gemini</span>
              </div>
              <div className="ai-status-item">
                <span className="ai-status-label">Last Generation</span>
                <span className="ai-status-value">2.48 sec</span>
              </div>
              <div className="ai-status-item">
                <span className="ai-status-label">Confidence</span>
                <span className="ai-status-value">94%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AIGenerator