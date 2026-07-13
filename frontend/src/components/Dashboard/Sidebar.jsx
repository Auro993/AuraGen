import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'sessions', label: 'User Sessions', icon: '👥' },
    { id: 'behavior', label: 'Behaviour', icon: '🖱️' },
    { id: 'friction', label: 'Friction Engine', icon: '⚡' },
    { id: 'ai', label: 'AI Generator', icon: '🤖' },
    { id: 'generated', label: 'Generated UI', icon: '🧩' },
    { id: 'history', label: 'History', icon: '📜' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'docs', label: 'Help & Docs', icon: '📄' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo-icon">✦</div>
        <span className="sidebar-brand-name">AuraGen</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(item.id)
              // Navigate to the corresponding page
              if (item.id === 'dashboard') navigate('/dashboard')
              else if (item.id === 'analytics') navigate('/analytics')
            }}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={handleLogout}>
          <span className="sidebar-icon">🚪</span>
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar