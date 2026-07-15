import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { id: 'analytics', label: 'Analytics', icon: '📊', path: '/analytics' },
    { id: 'user-sessions', label: 'User Sessions', icon: '👥', path: '/user-sessions' },
    { id: 'behavior', label: 'Behaviour', icon: '🖱️', path: '/behavior' },
    { id: 'friction', label: 'Friction Engine', icon: '⚡', path: '/friction' },
   { id: 'ai', label: 'AI Generator', icon: '🤖', path: '/ai' },
    { id: 'generated', label: 'Generated UI', icon: '🧩', path: '/generated' },
    { id: 'history', label: 'History', icon: '📜', path: '/history' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
    { id: 'docs', label: 'Help & Docs', icon: '📄', path: '/docs' },
    
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleNavigation = (item) => {
    setActiveTab(item.id)
    navigate(item.path)
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
            onClick={() => handleNavigation(item)}
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