import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import SessionModal from '../components/Dashboard/SessionModal'
import './UserSessions.css'

const UserSessions = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('user-sessions')
  const [filterTab, setFilterTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSession, setSelectedSession] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const sessionsPerPage = 10

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const stats = [
    { 
      icon: '👥', 
      label: 'Total Sessions', 
      value: '1,248', 
      change: '+15.3%', 
      positive: true,
      color: '#7C5CFF'
    },
    { 
      icon: '🟢', 
      label: 'Active Sessions', 
      value: '128', 
      change: '+8.9%', 
      positive: true,
      color: '#22C55E'
    },
    { 
      icon: '⏱️', 
      label: 'Avg. Session Duration', 
      value: '04m 32s', 
      change: '+6.1%', 
      positive: true,
      color: '#3B82F6'
    },
    { 
      icon: '⚠️', 
      label: 'High Friction Sessions', 
      value: '320', 
      change: '+12.7%', 
      positive: false,
      color: '#EF4444'
    },
  ]

  const [sessions, setSessions] = useState([
    { 
      id: 'S-001248', 
      user: 'John Doe', 
      page: 'Dashboard', 
      friction: 82, 
      duration: '06m 24s', 
      startTime: '10:24 AM',
      status: 'Active',
      generatedUI: 'Wizard Form',
      aiStatus: 'Completed',
      mouseDistance: '1200 px',
      wrongClicks: 6,
      idleTime: '18 sec',
      visitedPages: ['Dashboard', 'Analytics', 'Pricing', 'Behaviour']
    },
    { 
      id: 'S-001247', 
      user: 'Emma Smith', 
      page: 'Tax Form', 
      friction: 37, 
      duration: '03m 12s', 
      startTime: '09:45 AM',
      status: 'Completed',
      generatedUI: 'Small Form',
      aiStatus: 'Completed',
      mouseDistance: '400 px',
      wrongClicks: 2,
      idleTime: '8 sec',
      visitedPages: ['Tax Form', 'Dashboard']
    },
    { 
      id: 'S-001246', 
      user: 'Michael Brown', 
      page: 'Registration', 
      friction: 91, 
      duration: '09m 45s', 
      startTime: '11:30 AM',
      status: 'Active',
      generatedUI: 'Top 1% Form',
      aiStatus: 'Generating',
      mouseDistance: '1800 px',
      wrongClicks: 12,
      idleTime: '25 sec',
      visitedPages: ['Registration', 'Profile Setup', 'Dashboard']
    },
    { 
      id: 'S-001245', 
      user: 'Sarah Wilson', 
      page: 'Profile Setup', 
      friction: 45, 
      duration: '04m 33s', 
      startTime: '02:15 PM',
      status: 'In Progress',
      generatedUI: 'Search Form',
      aiStatus: 'Pending',
      mouseDistance: '600 px',
      wrongClicks: 4,
      idleTime: '12 sec',
      visitedPages: ['Profile Setup', 'Dashboard']
    },
    { 
      id: 'S-001244', 
      user: 'David Lee', 
      page: 'Payment', 
      friction: 77, 
      duration: '07m 12s', 
      startTime: '03:00 PM',
      status: 'Failed',
      generatedUI: 'Wizard Form',
      aiStatus: 'Failed',
      mouseDistance: '1500 px',
      wrongClicks: 9,
      idleTime: '20 sec',
      visitedPages: ['Payment', 'Dashboard', 'Analytics']
    },
    { 
      id: 'S-001243', 
      user: 'Aurosmita Sahoo', 
      page: 'Dashboard', 
      friction: 28, 
      duration: '02m 15s', 
      startTime: '08:30 AM',
      status: 'Completed',
      generatedUI: 'None',
      aiStatus: 'Completed',
      mouseDistance: '200 px',
      wrongClicks: 1,
      idleTime: '4 sec',
      visitedPages: ['Dashboard']
    },
    { 
      id: 'S-001242', 
      user: 'Alex Johnson', 
      page: 'Analytics', 
      friction: 58, 
      duration: '05m 40s', 
      startTime: '01:20 PM',
      status: 'Active',
      generatedUI: 'Analytics View',
      aiStatus: 'Generating',
      mouseDistance: '900 px',
      wrongClicks: 5,
      idleTime: '15 sec',
      visitedPages: ['Analytics', 'Dashboard']
    },
    { 
      id: 'S-001241', 
      user: 'Priya Patel', 
      page: 'Pricing', 
      friction: 34, 
      duration: '03m 50s', 
      startTime: '12:00 PM',
      status: 'Completed',
      generatedUI: 'Pricing View',
      aiStatus: 'Completed',
      mouseDistance: '350 px',
      wrongClicks: 3,
      idleTime: '10 sec',
      visitedPages: ['Pricing', 'Features', 'Dashboard']
    },
    { 
      id: 'S-001240', 
      user: 'Robert Chen', 
      page: 'Contact', 
      friction: 62, 
      duration: '04m 20s', 
      startTime: '04:45 PM',
      status: 'In Progress',
      generatedUI: 'Contact Form',
      aiStatus: 'Pending',
      mouseDistance: '750 px',
      wrongClicks: 4,
      idleTime: '14 sec',
      visitedPages: ['Contact', 'About', 'Dashboard']
    },
    {
      id: 'S-001239',
      user: 'Lisa Kim',
      page: 'Dashboard',
      friction: 72,
      duration: '08m 10s',
      startTime: '09:15 AM',
      status: 'Active',
      generatedUI: 'Dashboard View',
      aiStatus: 'Generating',
      mouseDistance: '1100 px',
      wrongClicks: 7,
      idleTime: '16 sec',
      visitedPages: ['Dashboard', 'Analytics', 'Settings']
    },
  ])

  // Generate more sessions for pagination
  for (let i = 0; i < 200; i++) {
    const names = ['James Wilson', 'Maria Garcia', 'Thomas Lee', 'Patricia Brown', 'Christopher Davis', 'Jennifer Miller', 'Daniel Rodriguez', 'Linda Martinez', 'Paul Hernandez', 'Mark Lopez']
    const pages = ['Dashboard', 'Analytics', 'Tax Form', 'Registration', 'Profile Setup', 'Payment', 'Pricing', 'Contact', 'Settings']
    const statuses = ['Active', 'Completed', 'In Progress', 'Failed']
    const friction = Math.floor(Math.random() * 80) + 20
    
    sessions.push({
      id: `S-${String(1200 - i).padStart(6, '0')}`,
      user: names[Math.floor(Math.random() * names.length)],
      page: pages[Math.floor(Math.random() * pages.length)],
      friction: friction,
      duration: `${Math.floor(Math.random() * 10) + 2}m ${Math.floor(Math.random() * 60)}s`,
      startTime: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      generatedUI: friction > 60 ? 'Wizard Form' : 'Small Form',
      aiStatus: friction > 60 ? 'Completed' : 'Pending',
      mouseDistance: `${Math.floor(Math.random() * 1500) + 200} px`,
      wrongClicks: Math.floor(Math.random() * 10) + 1,
      idleTime: `${Math.floor(Math.random() * 20) + 5} sec`,
      visitedPages: pages.slice(0, Math.floor(Math.random() * 4) + 1),
    })
  }

  const getFrictionBadge = (score) => {
    if (score > 70) return { label: 'High', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)' }
    if (score > 40) return { label: 'Medium', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' }
    return { label: 'Low', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.15)' }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'Active': { color: '#22C55E', bg: 'rgba(34, 197, 94, 0.15)' },
      'Completed': { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.15)' },
      'In Progress': { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' },
      'Failed': { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)' },
    }
    return statusMap[status] || { color: '#9CA3AF', bg: 'rgba(156, 163, 175, 0.15)' }
  }

  const handleViewSession = (session) => {
    setSelectedSession(session)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedSession(null)
  }

  // Filter sessions
  const filteredSessions = sessions.filter(session => {
    const matchesTab = filterTab === 'all' || 
      (filterTab === 'active' && session.status === 'Active') ||
      (filterTab === 'completed' && session.status === 'Completed') ||
      (filterTab === 'high-friction' && session.friction > 70)
    
    const matchesSearch = session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.page.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  // Pagination
  const indexOfLastSession = currentPage * sessionsPerPage
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage
  const currentSessions = filteredSessions.slice(indexOfFirstSession, indexOfLastSession)
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="user-sessions-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="user-sessions-main">
        <div className="sessions-header">
          <div>
            <h1 className="sessions-title">User Sessions</h1>
            <p className="sessions-subtitle">View and analyze all user sessions and their interaction data.</p>
          </div>
          <div className="sessions-actions">
            <button className="btn-secondary">📅 Date Range</button>
            <button className="btn-secondary">👥 User Filter</button>
            <button className="btn-primary">⬇ Export</button>
          </div>
        </div>

        {/* Upgrade Card */}
        <div className="upgrade-card glass-card">
          <div className="upgrade-content">
            <div>
              <span className="upgrade-icon">⭐</span>
              <span className="upgrade-title">Upgraded to Pro</span>
              <p className="upgrade-text">Unlock advanced insights and remove limits.</p>
            </div>
            <button className="btn-primary upgrade-btn">Upgrade Now</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="sessions-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="sessions-stat-card glass-card" style={{ borderColor: stat.color }}>
              <div className="sessions-stat-header">
                <span className="sessions-stat-icon">{stat.icon}</span>
                <span className={`sessions-stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                  {stat.change}
                </span>
              </div>
              <span className="sessions-stat-value">{stat.value}</span>
              <span className="sessions-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Filter Tabs & Search */}
        <div className="sessions-controls">
          <div className="sessions-tabs">
            <button 
              className={`sessions-tab ${filterTab === 'all' ? 'active' : ''}`}
              onClick={() => { setFilterTab('all'); setCurrentPage(1); }}
            >
              All Sessions
            </button>
            <button 
              className={`sessions-tab ${filterTab === 'active' ? 'active' : ''}`}
              onClick={() => { setFilterTab('active'); setCurrentPage(1); }}
            >
              Active
            </button>
            <button 
              className={`sessions-tab ${filterTab === 'completed' ? 'active' : ''}`}
              onClick={() => { setFilterTab('completed'); setCurrentPage(1); }}
            >
              Completed
            </button>
            <button 
              className={`sessions-tab ${filterTab === 'high-friction' ? 'active' : ''}`}
              onClick={() => { setFilterTab('high-friction'); setCurrentPage(1); }}
            >
              High Friction
            </button>
          </div>
          <div className="sessions-search">
            <input 
              type="text" 
              placeholder="🔍 Search Sessions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Session Table */}
        <div className="sessions-table-container glass-card">
          <table className="sessions-table">
            <thead>
              <tr>
                <th>Session ID</th>
                <th>User</th>
                <th>Page</th>
                <th>Friction</th>
                <th>Duration</th>
                <th>Start Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentSessions.map((session) => {
                const frictionBadge = getFrictionBadge(session.friction)
                const statusBadge = getStatusBadge(session.status)
                return (
                  <tr key={session.id}>
                    <td className="session-id">{session.id}</td>
                    <td>
                      <div className="session-user">
                        <span className="session-avatar">{session.user.charAt(0)}</span>
                        <span>{session.user}</span>
                      </div>
                    </td>
                    <td>{session.page}</td>
                    <td>
                      <span className="session-friction-badge" style={{ 
                        background: frictionBadge.bg,
                        color: frictionBadge.color
                      }}>
                        {session.friction}% • {frictionBadge.label}
                      </span>
                    </td>
                    <td>{session.duration}</td>
                    <td>{session.startTime}</td>
                    <td>
                      <span className="session-status-badge" style={{ 
                        background: statusBadge.bg,
                        color: statusBadge.color
                      }}>
                        {session.status}
                      </span>
                    </td>
                    <td>
                      <button className="session-action-btn" onClick={() => handleViewSession(session)}>
                        👁
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="sessions-pagination">
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }
            return (
              <button 
                key={i} 
                className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            )
          })}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="pagination-dots">...</span>
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>

        {/* Session Modal */}
        <SessionModal 
          session={selectedSession}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      </main>
    </div>
  )
}

export default UserSessions