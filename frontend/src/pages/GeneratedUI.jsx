import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import './GeneratedUI.css'

const GeneratedUI = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('generated')
  const [viewTab, setViewTab] = useState('compare')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  const kpiData = [
    { icon: '✨', label: 'Generated UIs', value: '35', change: '+8', positive: true, color: '#7C5CFF' },
    { icon: '📥', label: 'Applied UIs', value: '12', change: '+5', positive: true, color: '#22C55E' },
    { icon: '😊', label: 'User Satisfaction', value: '92%', change: '+6%', positive: true, color: '#3B82F6' },
    { icon: '📉', label: 'Friction Reduced', value: '38%', change: '+12%', positive: true, color: '#F59E0B' },
  ]

  const originalIssues = [
    '❌ Too many fields',
    '❌ Long scrolling',
    '❌ High Cognitive Load',
    '❌ No hierarchy',
    '❌ Confusing buttons',
  ]

  const aiImprovements = [
    '✔ Reduced Fields',
    '✔ Better Layout',
    '✔ Better Hierarchy',
    '✔ Better Readability',
    '✔ Less Scrolling',
  ]

  const changes = [
    'Reduced Fields',
    'Added Progress Bar',
    'Simplified Layout',
    'Better Typography',
    'Better Contrast',
    'Responsive',
  ]

  const impactData = [
    { label: 'Task Success', value: '+27%', color: '#22C55E' },
    { label: 'Completion Time', value: '-32%', color: '#3B82F6' },
    { label: 'Error Rate', value: '-41%', color: '#EF4444' },
    { label: 'Satisfaction', value: '+31%', color: '#7C5CFF' },
  ]

  const recentData = [
    { id: 'UI035', page: 'Pricing', before: '72', after: '32', status: 'Applied' },
    { id: 'UI034', page: 'Registration', before: '85', after: '28', status: 'Applied' },
    { id: 'UI033', page: 'Checkout', before: '68', after: '35', status: 'Pending' },
    { id: 'UI032', page: 'Dashboard', before: '54', after: '24', status: 'Applied' },
    { id: 'UI031', page: 'Profile Setup', before: '78', after: '30', status: 'Pending' },
  ]

  return (
    <div className="generated-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="generated-main">
        {/* Header */}
        <div className="generated-header">
          <div>
            <h1 className="generated-title">Generated UI</h1>
            <p className="generated-subtitle">View and manage AI-generated user interfaces.</p>
          </div>
          <button 
            className="btn-primary generated-generate-btn"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? '⏳ Generating...' : '✨ Generate New UI'}
          </button>
        </div>

        {/* KPI Cards */}
        <div className="generated-kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="generated-kpi-card glass-card" style={{ borderColor: kpi.color }}>
              <div className="generated-kpi-header">
                <span className="generated-kpi-icon">{kpi.icon}</span>
                <span className={`generated-kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>
                  {kpi.change}
                </span>
              </div>
              <span className="generated-kpi-value">{kpi.value}</span>
              <span className="generated-kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="generated-tabs">
          <button 
            className={`generated-tab ${viewTab === 'compare' ? 'active' : ''}`}
            onClick={() => setViewTab('compare')}
          >
            Compare
          </button>
          <button 
            className={`generated-tab ${viewTab === 'preview' ? 'active' : ''}`}
            onClick={() => setViewTab('preview')}
          >
            Preview
          </button>
          <button 
            className={`generated-tab ${viewTab === 'code' ? 'active' : ''}`}
            onClick={() => setViewTab('code')}
          >
            Code View
          </button>
        </div>

        {/* Split Comparison */}
        <div className="generated-compare">
          {/* Original UI */}
          <div className="generated-original glass-card">
            <h3 className="generated-compare-title">Original UI</h3>
            <div className="generated-compare-content">
              <div className="generated-form-mockup">
                <div className="generated-form-field">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" disabled />
                </div>
                <div className="generated-form-field">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" disabled />
                </div>
                <div className="generated-form-field">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="Enter your phone" disabled />
                </div>
                <div className="generated-form-field">
                  <label>Address</label>
                  <input type="text" placeholder="Enter your address" disabled />
                </div>
                <div className="generated-form-field">
                  <label>City</label>
                  <input type="text" placeholder="Enter your city" disabled />
                </div>
                <div className="generated-form-field">
                  <label>Zip Code</label>
                  <input type="text" placeholder="Enter zip code" disabled />
                </div>
                <button className="generated-form-submit" disabled>Submit</button>
              </div>
              <div className="generated-compare-bottom">
                <div className="generated-issues">
                  <span className="generated-issues-title">Issues</span>
                  {originalIssues.map((issue, index) => (
                    <div key={index} className="generated-issue-item">{issue}</div>
                  ))}
                </div>
                <div className="generated-friction-score">
                  <span className="generated-friction-label">Friction Score</span>
                  <span className="generated-friction-value high">72/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="generated-arrow">
            <span className="generated-arrow-icon">➡</span>
          </div>

          {/* AI Generated UI */}
          <div className="generated-ai glass-card">
            <h3 className="generated-compare-title">AI Generated UI</h3>
            <div className="generated-compare-content">
              <div className="generated-wizard-mockup">
                <div className="generated-wizard-step">
                  <span className="generated-wizard-number">1</span>
                  <div className="generated-wizard-content">
                    <h4>Personal Info</h4>
                    <input type="text" placeholder="Enter your name" />
                    <input type="email" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="generated-wizard-step">
                  <span className="generated-wizard-number">2</span>
                  <div className="generated-wizard-content">
                    <h4>Contact Details</h4>
                    <input type="tel" placeholder="Enter your phone" />
                  </div>
                </div>
                <button className="generated-wizard-next">Continue →</button>
              </div>
              <div className="generated-compare-bottom">
                <div className="generated-improvements">
                  <span className="generated-improvements-title">Improvements</span>
                  {aiImprovements.map((improvement, index) => (
                    <div key={index} className="generated-improvement-item">{improvement}</div>
                  ))}
                </div>
                <div className="generated-friction-score">
                  <span className="generated-friction-label">Friction Score</span>
                  <span className="generated-friction-value low">32/100</span>
                  <span className="generated-friction-badge low">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generation Details | Changes | Impact */}
        <div className="generated-bottom-grid">
          {/* Generation Details */}
          <div className="generated-details-card glass-card">
            <h3 className="generated-card-title">Generation Details</h3>
            <div className="generated-details-grid">
              <div className="generated-detail-item">
                <span className="generated-detail-label">Generated On</span>
                <span className="generated-detail-value">May 16, 2026</span>
              </div>
              <div className="generated-detail-item">
                <span className="generated-detail-label">Target Page</span>
                <span className="generated-detail-value">Pricing</span>
              </div>
              <div className="generated-detail-item">
                <span className="generated-detail-label">AI Model</span>
                <span className="generated-detail-value">Gemini</span>
              </div>
              <div className="generated-detail-item">
                <span className="generated-detail-label">Generation Time</span>
                <span className="generated-detail-value">2.48 sec</span>
              </div>
              <div className="generated-detail-item">
                <span className="generated-detail-label">Reason</span>
                <span className="generated-detail-value">High Cognitive Load</span>
              </div>
            </div>
          </div>

          {/* Changes Implemented */}
          <div className="generated-changes-card glass-card">
            <h3 className="generated-card-title">Changes Implemented</h3>
            {changes.map((change, index) => (
              <div key={index} className="generated-change-item">
                <span className="generated-change-icon">✔</span>
                <span className="generated-change-text">{change}</span>
              </div>
            ))}
          </div>

          {/* Estimated Impact */}
          <div className="generated-impact-card glass-card">
            <h3 className="generated-card-title">Estimated Impact</h3>
            <div className="generated-impact-grid">
              {impactData.map((item, index) => (
                <div key={index} className="generated-impact-item">
                  <span className="generated-impact-value" style={{ color: item.color }}>{item.value}</span>
                  <span className="generated-impact-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Generated UI Table */}
        <div className="generated-table-card glass-card">
          <h3 className="generated-card-title">Recent Generated UI</h3>
          <table className="generated-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Page</th>
                <th>Generated On</th>
                <th>Before</th>
                <th>After</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentData.map((item, index) => (
                <tr key={index}>
                  <td className="generated-table-id">{item.id}</td>
                  <td>{item.page}</td>
                  <td>May {15 - index}, 2026</td>
                  <td>
                    <span className="generated-table-badge high">{item.before}</span>
                  </td>
                  <td>
                    <span className="generated-table-badge low">{item.after}</span>
                  </td>
                  <td>
                    <span className={`generated-table-status ${item.status === 'Applied' ? 'applied' : 'pending'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="generated-table-action">👁</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default GeneratedUI