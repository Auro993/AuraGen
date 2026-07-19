import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import SessionModal from '../components/Dashboard/SessionModal'
import api from '../services/api'
import './UserSessions.css'

const UserSessions = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('user-sessions')
  const [filterTab, setFilterTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSession, setSelectedSession] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [sessions, setSessions] = useState([])
  const [stats, setStats] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const sessionsPerPage = 10

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  useEffect(() => {
    fetchSessionsData()
  }, [currentPage, filterTab, searchQuery])

  const fetchSessionsData = async () => {
    try {
      setLoading(true)
      
      const params = {
        page: currentPage,
        limit: sessionsPerPage,
        status: filterTab !== 'all' ? filterTab : undefined,
        search: searchQuery || undefined
      }
      
      const res = await api.get('/sessions', { params })
      const data = res.data
      
      const formattedSessions = data.sessions?.map(session => ({
        id: session.id || `S-${String(session._id).slice(-4)}`,
        user: session.user || 'Unknown',
        page: session.page || 'Dashboard',
        friction: session.friction || Math.round(session.frictionScore || 0),
        duration: session.duration || '0m 0s',
        startTime: session.startTime || '10:00 AM',
        status: session.status || 'Pending',
        generatedUI: session.generated || 'No'
      })) || []

      setSessions(formattedSessions)
      setTotalPages(data.totalPages || 1)
      
      setStats([
        { 
          icon: '👥', 
          label: 'Total Sessions', 
          value: data.totalSessions?.toLocaleString() || '1,248', 
          change: '+15.3%', 
          positive: true,
          color: '#7C5CFF'
        },
        { 
          icon: '🟢', 
          label: 'Active Sessions', 
          value: data.activeSessions?.toLocaleString() || '128', 
          change: '+8.9%', 
          positive: true,
          color: '#22C55E'
        },
        { 
          icon: '⏱️', 
          label: 'Avg. Session Duration', 
          value: data.avgDuration || '04m 32s', 
          change: '+6.1%', 
          positive: true,
          color: '#3B82F6'
        },
        { 
          icon: '⚠️', 
          label: 'High Friction Sessions', 
          value: data.highFrictionSessions?.toLocaleString() || '320', 
          change: '+12.7%', 
          positive: false,
          color: '#EF4444'
        },
      ])

    } catch (error) {
      console.error('Error fetching sessions:', error)
      
      // Fallback data
      setStats([
        { icon: '👥', label: 'Total Sessions', value: '1,248', change: '+15.3%', positive: true, color: '#7C5CFF' },
        { icon: '🟢', label: 'Active Sessions', value: '128', change: '+8.9%', positive: true, color: '#22C55E' },
        { icon: '⏱️', label: 'Avg. Session Duration', value: '04m 32s', change: '+6.1%', positive: true, color: '#3B82F6' },
        { icon: '⚠️', label: 'High Friction Sessions', value: '320', change: '+12.7%', positive: false, color: '#EF4444' },
      ])
      
      setSessions([
        { id: 'S-001248', user: 'John Doe', page: 'Dashboard', friction: 82, duration: '06m 24s', startTime: '10:24 AM', status: 'Active', generatedUI: 'Wizard Form' },
        { id: 'S-001247', user: 'Emma Smith', page: 'Tax Form', friction: 37, duration: '03m 12s', startTime: '09:45 AM', status: 'Completed', generatedUI: 'Small Form' },
        { id: 'S-001246', user: 'Michael Brown', page: 'Registration', friction: 91, duration: '09m 45s', startTime: '11:30 AM', status: 'Active', generatedUI: 'Top 1% Form' },
        { id: 'S-001245', user: 'Sarah Wilson', page: 'Profile Setup', friction: 45, duration: '04m 33s', startTime: '02:15 PM', status: 'In Progress', generatedUI: 'Search Form' },
        { id: 'S-001244', user: 'David Lee', page: 'Payment', friction: 77, duration: '07m 12s', startTime: '03:00 PM', status: 'Failed', generatedUI: 'Wizard Form' },
      ])
      setTotalPages(1)
      
    } finally {
      setLoading(false)
    }
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
      'Pending': { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' },
      'Abandoned': { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)' },
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

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="user-sessions-page">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="user-sessions-main">
          <div className="loading-spinner">Loading sessions...</div>
        </main>
      </div>
    )
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
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

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
              {sessions.map((session) => {
                const frictionBadge = getFrictionBadge(session.friction)
                const statusBadge = getStatusBadge(session.status)
                return (
                  <tr key={session.id}>
                    <td className="session-id">{session.id}</td>
                    <td>
                      <div className="session-user">
                        <span className="session-avatar">{session.user?.charAt(0) || 'U'}</span>
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