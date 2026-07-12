import React from 'react'

const AIStatus = () => {
  const statuses = [
    { label: 'Tracking Score', status: 'Active', color: '#7C5CFF' },
    { label: 'Detecting Friction', status: 'Active', color: '#F59E0B' },
    { label: 'Generating UI', status: 'Ready', color: '#22C55E' },
    { label: 'Updating Interface', status: 'Standby', color: '#EF4444' },
  ]

  return (
    <div className="ai-status-card glass-card">
      <h3 className="ai-status-title">AI Engine Status</h3>
      <div className="ai-status-grid">
        {statuses.map((item, index) => (
          <div key={index} className="ai-status-item">
            <span className="ai-status-dot" style={{ background: item.color }}></span>
            <span className="ai-status-label">{item.label}</span>
            <span className="ai-status-value">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AIStatus