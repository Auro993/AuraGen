import React from 'react'

const StatCard = ({ icon, label, value, change, positive, color }) => {
  return (
    <div className="stat-card glass-card">
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <span className={`stat-change ${positive ? 'positive' : 'negative'}`}>
          {change}
        </span>
      </div>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default StatCard