import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import './History.css'

const History = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('history')
  const [selectedVersion, setSelectedVersion] = useState(null)
  const [showVersionModal, setShowVersionModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const kpiData = [
    { icon: '📂', label: 'Total Generations', value: '235', change: '↑ 6.6% from last 7 days', positive: true, color: '#7C5CFF' },
    { icon: '✅', label: 'Applied UIs', value: '180', change: '↑ 14.2% from last 7 days', positive: true, color: '#22C55E' },
    { icon: '🔄', label: 'Regenerated UIs', value: '42', change: '↑ 6.3% from last 7 days', positive: false, color: '#F59E0B' },
    { icon: '⭐', label: 'Success Rate', value: '96%', change: '↑ 8.7% from last 7 days', positive: true, color: '#3B82F6' },
  ]

  const historyData = [
    { version: 'v1.3', page: 'Pricing Page', date: 'May 16, 2024 10:24 AM', before: 72, after: 32, status: 'Applied', changes: 3 },
    { version: 'v1.2', page: 'Checkout Page', date: 'May 16, 2024 10:24 AM', before: 64, after: 28, status: 'Applied', changes: 3 },
    { version: 'v1.1', page: 'Delivery Page', date: 'May 16, 2024 10:24 AM', before: 48, after: 24, status: 'Applied', changes: 3 },
    { version: 'v1.0', page: 'Login Page', date: 'May 16, 2024 10:24 AM', before: 48, after: 20, status: 'Applied', changes: 2 },
    { version: 'v0.9', page: 'Signup Page', date: 'May 16, 2024 10:24 AM', before: 48, after: 22, status: 'Applied', changes: 2 },
    { version: 'v0.8', page: 'Pricing Page', date: 'May 16, 2024 10:24 AM', before: 48, after: 26, status: 'Applied', changes: 3 },
    { version: 'v0.7', page: 'Profile Page', date: 'May 16, 2024 10:24 AM', before: 48, after: 20, status: 'Applied', changes: 4 },
  ]

  const timelineData = [
    { date: 'May 10, 2024', event: 'AI' },
    { date: 'May 16, 2024', event: 'AI' },
    { date: 'May 19, 2024', event: 'AI' },
    { date: 'May 21, 2024', event: 'AI' },
    { date: 'May 23, 2024', event: 'AI' },
    { date: 'May 25, 2024', event: 'AI' },
    { date: 'May 27, 2024', event: 'AI' },
    { date: 'May 29, 2024', event: 'AI' },
    { date: 'May 31, 2024', event: 'AI' },
    { date: 'Jun 2, 2024', event: 'AI' },
  ]

  const activities = [
    { 
      time: '10:24 AM', 
      event: 'UI Generated for Pricing Page', 
      detail: 'High confidence lead candidate. AI generated suggested variants.',
      type: 'generated'
    },
    { 
      time: '10:24 AM', 
      event: 'UI Applied Successfully', 
      detail: 'The generated UI was applied to Pricing Page.',
      type: 'applied'
    },
    { 
      time: '10:24 AM', 
      event: 'Version Saved', 
      detail: 'Changes were saved in 12 hours. V1.3',
      type: 'saved'
    },
    { 
      time: '10:24 AM', 
      event: 'UI Regenerated', 
      detail: 'New UI was generated. V1.3',
      type: 'regenerated'
    },
    { 
      time: '10:24 AM', 
      event: 'Version Saved', 
      detail: 'Changes were saved in V1.3.',
      type: 'saved'
    },
  ]

  const changes = [
    'Converted long-form text-to-doc video',
    'Reduced text-to-text text to 1:1',
    'Improved voice-to-text accuracy',
    'Added progress indicator',
    'Enhanced audio quality',
    'Enhanced audio quality and context',
  ]

  const handleVersionClick = (version) => {
    setSelectedVersion(version)
    setShowVersionModal(true)
  }

  const closeVersionModal = () => {
    setShowVersionModal(false)
    setSelectedVersion(null)
  }

  return (
    <div className="history-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="history-main">
        {/* Header */}
        <div className="history-header">
          <div>
            <h1 className="history-title">History</h1>
            <p className="history-subtitle">View and track all AI-generated UI versions and changes over time.</p>
          </div>
          <div className="history-actions">
            <button className="btn-secondary">📅 Date</button>
            <button className="btn-primary">📥 Export</button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="history-kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="history-kpi-card glass-card" style={{ borderColor: kpi.color }}>
              <div className="history-kpi-header">
                <span className="history-kpi-icon">{kpi.icon}</span>
                <span className={`history-kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>
                  {kpi.change}
                </span>
              </div>
              <span className="history-kpi-value">{kpi.value}</span>
              <span className="history-kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>

        {/* AI Generation Timeline */}
        <div className="history-timeline-card glass-card">
          <h3 className="history-card-title">AI Generation Timeline</h3>
          <div className="history-timeline-list">
            {timelineData.map((item, index) => (
              <div key={index} className="history-timeline-item">
                <span className="history-timeline-date">{item.date}</span>
                <span className="history-timeline-event-dot"></span>
                <span className="history-timeline-event-label">{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* History Table */}
        <div className="history-table-card glass-card">
          <h3 className="history-card-title">History of Generations</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>Version</th>
                <th>Page</th>
                <th>Generated UIs</th>
                <th>Friction Score</th>
                <th>Actions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, index) => (
                <tr key={index} onClick={() => handleVersionClick(item)}>
                  <td className="history-table-version">{item.version}</td>
                  <td>{item.page}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className="history-table-badge high">{item.before}</span>
                  </td>
                  <td>{item.changes}</td>
                  <td>
                    <span className={`history-table-status ${item.status === 'Applied' ? 'applied' : 'pending'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Version Comparison */}
        <div className="history-compare-card glass-card">
          <h3 className="history-card-title">Version Comparison</h3>
          <div className="history-compare-grid">
            <div className="history-compare-previous">
              <h4 className="history-compare-label">Previous Version (v1.2)</h4>
              <div className="history-compare-mockup">
                <div className="history-compare-form">
                  <div className="history-compare-field">Full Name</div>
                  <div className="history-compare-field">Email</div>
                  <div className="history-compare-field">Phone</div>
                  <div className="history-compare-field">Address</div>
                </div>
                <div className="history-compare-friction">
                  <span>Friction Score</span>
                  <span className="history-compare-score high">72</span>
                </div>
              </div>
            </div>
            <div className="history-compare-arrow">→</div>
            <div className="history-compare-current">
              <h4 className="history-compare-label">Current Version (v1.3)</h4>
              <div className="history-compare-mockup">
                <div className="history-compare-wizard">
                  <div className="history-compare-step">
                    <span className="history-compare-step-num">1</span>
                    <span>Personal Info</span>
                  </div>
                  <div className="history-compare-step">
                    <span className="history-compare-step-num">2</span>
                    <span>Contact Details</span>
                  </div>
                  <div className="history-compare-step">
                    <span className="history-compare-step-num">3</span>
                    <span>Review & Submit</span>
                  </div>
                </div>
                <div className="history-compare-friction">
                  <span>Friction Score</span>
                  <span className="history-compare-score low">32</span>
                  <span className="history-compare-badge">Reduced</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent AI Activity */}
        <div className="history-activity-card glass-card">
          <h3 className="history-card-title">Recent AI Activity</h3>
          <div className="history-activity-feed">
            {activities.map((activity, index) => (
              <div key={index} className="history-activity-item">
                <div className="history-activity-header">
                  <span className={`history-activity-dot ${activity.type}`}></span>
                  <span className="history-activity-event">{activity.event}</span>
                  <span className="history-activity-time">{activity.time}</span>
                </div>
                <p className="history-activity-detail">{activity.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Changes */}
        <div className="history-changes-card glass-card">
          <h3 className="history-card-title">AI Changes in this Version</h3>
          <div className="history-changes-grid">
            {changes.map((change, index) => (
              <div key={index} className="history-change-item">
                <span className="history-change-icon">✔</span>
                <span className="history-change-text">{change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Generalization Data */}
        <div className="history-generalization-card glass-card">
          <h3 className="history-card-title">Generalization Data</h3>
          <div className="history-generalization-grid">
            <div className="history-generalization-item">
              <span className="history-generalization-label">AI Model</span>
              <span className="history-generalization-value">Amazon Athena v1.4</span>
            </div>
            <div className="history-generalization-item">
              <span className="history-generalization-label">Generation Time</span>
              <span className="history-generalization-value">1.8s</span>
            </div>
            <div className="history-generalization-item">
              <span className="history-generalization-label">Target Page</span>
              <span className="history-generalization-value">Pricing Page</span>
            </div>
            <div className="history-generalization-item">
              <span className="history-generalization-label">Focus</span>
              <span className="history-generalization-value">UI</span>
            </div>
            <div className="history-generalization-item">
              <span className="history-generalization-label">Tagged UIs</span>
              <span className="history-generalization-value">UI</span>
            </div>
            <div className="history-generalization-item">
              <span className="history-generalization-label">Multilingual support</span>
              <span className="history-generalization-value">Yes</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default History