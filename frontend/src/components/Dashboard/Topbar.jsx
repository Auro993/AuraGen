import React, { useState } from 'react'

const Topbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="dashboard-topbar">
      <div className="topbar-left">
        <span className="topbar-title">Dashboard</span>
      </div>
      <div className="topbar-right">
        <div className="topbar-search">
          <input type="text" placeholder="Search..." />
        </div>
        <button 
          className="topbar-icon" 
          onClick={() => setShowNotifications(!showNotifications)}
          title="Notifications"
        >
          🔔
        </button>
        <button 
          className="topbar-icon" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
        <div className="topbar-profile">
          <span className="profile-avatar">👤</span>
          <span className="profile-name">Aurosmita</span>
        </div>
      </div>
    </div>
  )
}

export default Topbar