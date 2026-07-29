// frontend/src/pages/History.jsx

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import { toast } from 'react-hot-toast'
import './History.css'

const History = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('history')
  const [selectedVersion, setSelectedVersion] = useState(null)
  const [showVersionModal, setShowVersionModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const kpiData = [
    { icon: '📂', label: 'Total Generations', value: '235', change: '↑ 6.6%', positive: true, color: '#7C5CFF' },
    { icon: '✅', label: 'Applied UIs', value: '180', change: '↑ 14.2%', positive: true, color: '#22C55E' },
    { icon: '🔄', label: 'Regenerated', value: '42', change: '↑ 6.3%', positive: false, color: '#F59E0B' },
    { icon: '⭐', label: 'Success Rate', value: '96%', change: '↑ 8.7%', positive: true, color: '#3B82F6' },
  ]

  const historyData = [
    { version: 'v2.3', page: 'Pricing Page', date: 'May 16, 2024', time: '10:24 AM', before: 72, after: 32, status: 'Applied', changes: 3 },
    { version: 'v2.2', page: 'Checkout Page', date: 'May 15, 2024', time: '2:15 PM', before: 64, after: 28, status: 'Applied', changes: 4 },
    { version: 'v2.1', page: 'Delivery Page', date: 'May 14, 2024', time: '9:45 AM', before: 48, after: 24, status: 'Applied', changes: 3 },
    { version: 'v2.0', page: 'Login Page', date: 'May 13, 2024', time: '11:30 AM', before: 48, after: 20, status: 'Applied', changes: 2 },
    { version: 'v1.9', page: 'Signup Page', date: 'May 12, 2024', time: '3:20 PM', before: 48, after: 22, status: 'Pending', changes: 2 },
    { version: 'v1.8', page: 'Dashboard Page', date: 'May 11, 2024', time: '8:50 AM', before: 54, after: 26, status: 'Applied', changes: 3 },
    { version: 'v1.7', page: 'Profile Page', date: 'May 10, 2024', time: '1:10 PM', before: 48, after: 20, status: 'Applied', changes: 4 },
  ]

  const timelineData = [
    { date: 'May 10', event: 'v1.0 Released' },
    { date: 'May 12', event: 'v1.2 Update' },
    { date: 'May 14', event: 'v1.5 Update' },
    { date: 'May 16', event: 'v2.0 Release' },
    { date: 'May 18', event: 'v2.2 Update' },
    { date: 'May 20', event: 'v2.3 Update' },
  ]

  const activities = [
    { 
      time: '10:24 AM', 
      event: 'UI Generated for Pricing Page', 
      detail: 'High confidence candidate. AI generated 3 variants.',
      type: 'generated'
    },
    { 
      time: '9:45 AM', 
      event: 'UI Applied Successfully', 
      detail: 'Generated UI applied to Delivery Page. Friction reduced by 50%.',
      type: 'applied'
    },
    { 
      time: '8:30 AM', 
      event: 'Version v2.2 Saved', 
      detail: 'Changes saved. New version available in history.',
      type: 'saved'
    },
    { 
      time: 'Yesterday', 
      event: 'UI Regenerated', 
      detail: 'New UI generated for Checkout Page. V2.3',
      type: 'regenerated'
    },
    { 
      time: 'Yesterday', 
      event: 'Version v2.3 Saved', 
      detail: 'Changes saved. Ready for review.',
      type: 'saved'
    },
  ]

  const changes = [
    'Converted long-form form into 3-step wizard',
    'Reduced text fields from 8 to 4',
    'Added progress indicator',
    'Improved field validation',
    'Enhanced visual hierarchy',
    'Added tooltips for complex fields',
  ]

  const handleVersionClick = (version) => {
    setSelectedVersion(version)
    setShowVersionModal(true)
    toast.info(`📋 Viewing details for ${version.version}`)
  }

  const closeVersionModal = () => {
    setShowVersionModal(false)
    setSelectedVersion(null)
  }

  const handleExport = () => {
    toast.success('📥 History exported successfully!')
  }

  const handleApplyVersion = (version) => {
    toast.success(`✅ ${version.version} applied successfully!`)
  }

  const handleRevertVersion = (version) => {
    toast.success(`🔄 Reverted to ${version.version}`)
  }

  // Filter history data
  const filteredHistory = historyData.filter(item => {
    if (filter === 'all') return true
    if (filter === 'applied') return item.status === 'Applied'
    if (filter === 'pending') return item.status === 'Pending'
    return true
  })

  return (
    <div className="history-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="history-main">
        {/* Header */}
        <div className="history-header">
          <div>
            <h1 className="history-title">📜 History</h1>
            <p className="history-subtitle">View and track all AI-generated UI versions and changes over time.</p>
          </div>
          <div className="history-actions">
            <button className="btn-secondary" onClick={() => toast.info('📅 Date filter applied')}>
              📅 Filter
            </button>
            <button className="btn-primary" onClick={handleExport}>
              📥 Export
            </button>
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

        {/* Timeline */}
        <div className="history-timeline-card glass-card">
          <h3 className="history-card-title">🕐 Version Timeline</h3>
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
          <div className="history-table-header">
            <h3 className="history-card-title">📊 Generation History</h3>
            <div className="history-table-filters">
              <button 
                className={`history-filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`history-filter-btn ${filter === 'applied' ? 'active' : ''}`}
                onClick={() => setFilter('applied')}
              >
                Applied
              </button>
              <button 
                className={`history-filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
            </div>
          </div>
          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Page</th>
                  <th>Date</th>
                  <th>Before</th>
                  <th>After</th>
                  <th>Reduction</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item, index) => (
                  <tr key={index} onClick={() => handleVersionClick(item)}>
                    <td className="history-table-version">{item.version}</td>
                    <td>{item.page}</td>
                    <td>
                      <div className="history-table-date">{item.date}</div>
                      <div className="history-table-time">{item.time}</div>
                    </td>
                    <td>
                      <span className="history-table-badge high">{item.before}</span>
                    </td>
                    <td>
                      <span className="history-table-badge low">{item.after}</span>
                    </td>
                    <td>
                      <span className="history-table-reduction">
                        -{item.before - item.after}%
                      </span>
                    </td>
                    <td>
                      <span className={`history-table-status ${item.status === 'Applied' ? 'applied' : 'pending'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="history-table-actions">
                        {item.status === 'Applied' ? (
                          <button 
                            className="history-action-btn revert"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRevertVersion(item)
                            }}
                            title="Revert"
                          >
                            ↩️
                          </button>
                        ) : (
                          <button 
                            className="history-action-btn apply"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleApplyVersion(item)
                            }}
                            title="Apply"
                          >
                            ✅
                          </button>
                        )}
                        <button 
                          className="history-action-btn view"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleVersionClick(item)
                          }}
                          title="View Details"
                        >
                          👁️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Version Comparison */}
        <div className="history-compare-card glass-card">
          <h3 className="history-card-title">📊 Version Comparison</h3>
          <div className="history-compare-grid">
            <div className="history-compare-previous">
              <h4 className="history-compare-label">Previous Version (v2.2)</h4>
              <div className="history-compare-mockup">
                <div className="history-compare-form">
                  <div className="history-compare-field">
                    <span className="field-label">Full Name</span>
                    <span className="field-value">John Doe</span>
                  </div>
                  <div className="history-compare-field">
                    <span className="field-label">Email</span>
                    <span className="field-value">john@email.com</span>
                  </div>
                  <div className="history-compare-field">
                    <span className="field-label">Phone</span>
                    <span className="field-value">+1 234 567 890</span>
                  </div>
                  <div className="history-compare-field">
                    <span className="field-label">Address</span>
                    <span className="field-value">123 Main St</span>
                  </div>
                </div>
                <div className="history-compare-friction">
                  <span>Friction Score</span>
                  <span className="history-compare-score high">64</span>
                </div>
              </div>
            </div>
            
            <div className="history-compare-arrow">→</div>
            
            <div className="history-compare-current">
              <h4 className="history-compare-label">Current Version (v2.3)</h4>
              <div className="history-compare-mockup">
                <div className="history-compare-wizard">
                  <div className="history-compare-step completed">
                    <span className="history-compare-step-num">✓</span>
                    <span>Personal Info</span>
                  </div>
                  <div className="history-compare-step active">
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
                  <span className="history-compare-badge">↓ 50%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column: Activity & Changes */}
        <div className="history-two-col">
          {/* Recent AI Activity */}
          <div className="history-activity-card glass-card">
            <h3 className="history-card-title">🔔 Recent Activity</h3>
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
            <h3 className="history-card-title">📝 Changes in v2.3</h3>
            <div className="history-changes-grid">
              {changes.map((change, index) => (
                <div key={index} className="history-change-item">
                  <span className="history-change-icon">✔</span>
                  <span className="history-change-text">{change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generalization Data */}
        <div className="history-generalization-card glass-card">
          <h3 className="history-card-title">📊 Generation Details</h3>
          <div className="history-generalization-grid">
            <div className="history-generalization-item">
              <span className="history-generalization-label">AI Model</span>
              <span className="history-generalization-value">Gemini 2.5 Flash</span>
            </div>
            <div className="history-generalization-item">
              <span className="history-generalization-label">Generation Time</span>
              <span className="history-generalization-value">2.48s</span>
            </div>
            <div className="history-generalization-item">
              <span className="history-generalization-label">Target Page</span>
              <span className="history-generalization-value">Pricing Page</span>
            </div>
            <div className="history-generalization-item">
              <span className="history-generalization-label">Confidence</span>
              <span className="history-generalization-value">94%</span>
            </div>
            <div className="history-generalization-item">
              <span className="history-generalization-label">Variants</span>
              <span className="history-generalization-value">3</span>
            </div>
            <div className="history-generalization-item">
              <span className="history-generalization-label">Multilingual</span>
              <span className="history-generalization-value">✓ Yes</span>
            </div>
          </div>
        </div>
      </main>

      {/* Version Detail Modal */}
      {showVersionModal && selectedVersion && (
        <div className="history-modal-overlay" onClick={closeVersionModal}>
          <div className="history-modal" onClick={(e) => e.stopPropagation()}>
            <div className="history-modal-header">
              <h3 className="history-modal-title">{selectedVersion.version} - {selectedVersion.page}</h3>
              <button className="history-modal-close" onClick={closeVersionModal}>×</button>
            </div>
            <div className="history-modal-body">
              <div className="history-modal-grid">
                <div className="history-modal-item">
                  <span className="history-modal-label">Date</span>
                  <span className="history-modal-value">{selectedVersion.date}</span>
                </div>
                <div className="history-modal-item">
                  <span className="history-modal-label">Time</span>
                  <span className="history-modal-value">{selectedVersion.time}</span>
                </div>
                <div className="history-modal-item">
                  <span className="history-modal-label">Before</span>
                  <span className="history-modal-value high">{selectedVersion.before}</span>
                </div>
                <div className="history-modal-item">
                  <span className="history-modal-label">After</span>
                  <span className="history-modal-value low">{selectedVersion.after}</span>
                </div>
                <div className="history-modal-item">
                  <span className="history-modal-label">Reduction</span>
                  <span className="history-modal-value reduction">-{selectedVersion.before - selectedVersion.after}%</span>
                </div>
                <div className="history-modal-item">
                  <span className="history-modal-label">Status</span>
                  <span className={`history-modal-status ${selectedVersion.status === 'Applied' ? 'applied' : 'pending'}`}>
                    {selectedVersion.status}
                  </span>
                </div>
              </div>
              <div className="history-modal-actions">
                <button className="btn-secondary" onClick={closeVersionModal}>Close</button>
                {selectedVersion.status === 'Pending' && (
                  <button className="btn-primary" onClick={() => {
                    handleApplyVersion(selectedVersion)
                    closeVersionModal()
                  }}>
                    ✅ Apply Version
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default History