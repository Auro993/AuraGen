import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import BehaviourChart from '../components/Dashboard/BehaviourChart'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import api from '../services/api'
import './Analytics.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Analytics = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('analytics')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState([])
  const [chartData, setChartData] = useState(null)
  const [frictionSources, setFrictionSources] = useState([])
  const [problematicPages, setProblematicPages] = useState([])
  const [sessions, setSessions] = useState([])
  const [aiPerformance, setAiPerformance] = useState({})
  const [aiStats, setAiStats] = useState([])
  const [backendError, setBackendError] = useState(false)
  const [dateRange, setDateRange] = useState('last7days')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  useEffect(() => {
    fetchAnalyticsData()
  }, [dateRange])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      setBackendError(false)
      
      // Fetch overview stats
      const statsRes = await api.get('/analytics/overview')
      const statsData = statsRes.data
      
      setStats([
        { 
          label: 'Active Users', 
          value: statsData.activeUsers?.toLocaleString() || '0', 
          change: statsData.changes?.activeUsers || '+12%', 
          positive: true, 
          icon: '👤' 
        },
        { 
          label: 'Avg Friction', 
          value: `${statsData.avgFriction || 0}%`, 
          change: statsData.changes?.avgFriction || '+8.5%', 
          positive: false, 
          icon: '📊' 
        },
        { 
          label: 'AI Generated UI', 
          value: statsData.generatedUI?.toLocaleString() || '0', 
          change: statsData.changes?.generatedUI || '+10.5%', 
          positive: true, 
          icon: '🎨' 
        },
        { 
          label: 'Success Rate', 
          value: `${statsData.successRate || 0}%`, 
          change: statsData.changes?.successRate || '+10%', 
          positive: true, 
          icon: '✅' 
        },
      ])

      // Fetch friction trend
      const trendRes = await api.get('/analytics/friction-trend')
      const trendData = trendRes.data
      
      setChartData({
        labels: trendData.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: trendData.data || [65, 72, 58, 82, 70, 45, 38]
      })

      // Fetch friction sources
      const sourcesRes = await api.get('/analytics/friction-sources')
      setFrictionSources(sourcesRes.data || [
        { label: 'Wrong Clicks', value: 38, color: '#EF4444' },
        { label: 'Idle Time', value: 28, color: '#F59E0B' },
        { label: 'Form Errors', value: 20, color: '#7C5CFF' },
        { label: 'Rage Clicks', value: 14, color: '#4F8CFF' },
      ])

      // Fetch problematic pages
      const pagesRes = await api.get('/analytics/problematic-pages')
      setProblematicPages(pagesRes.data || [
        { page: 'Tax Form', views: '1,248', friction: '89%', status: 'High' },
        { page: 'Registration', views: '982', friction: '76%', status: 'High' },
        { page: 'Profile Setup', views: '760', friction: '58%', status: 'Medium' },
        { page: 'Payment', views: '642', friction: '81%', status: 'High' },
        { page: 'Settings', views: '310', friction: '32%', status: 'Low' },
      ])

      // Fetch sessions
      const sessionsRes = await api.get('/analytics/sessions')
      setSessions(sessionsRes.data || [
        { id: 'S-001', user: 'John Doe', friction: '82%', duration: '6m 24s', generated: 'Yes', status: 'Completed' },
        { id: 'S-002', user: 'Emma Smith', friction: '37%', duration: '3m 12s', generated: 'No', status: 'Pending' },
        { id: 'S-003', user: 'Sarah Wilson', friction: '91%', duration: '9m 45s', generated: 'Yes', status: 'Active' },
        { id: 'S-004', user: 'David Lee', friction: '54%', duration: '4m 33s', generated: 'No', status: 'Pending' },
        { id: 'S-005', user: 'Michael Brown', friction: '78%', duration: '7m 12s', generated: 'Yes', status: 'Completed' },
      ])

      // Fetch AI performance
      const perfRes = await api.get('/analytics/ai-performance')
      setAiPerformance(perfRes.data || {
        requests: 520,
        avgResponse: '1.8 sec',
        successRate: 98,
        failureRate: 2,
      })

      // Fetch AI stats
      const aiStatsRes = await api.get('/analytics/ai-stats')
      setAiStats(aiStatsRes.data || [
        { label: 'UI Generated Today', value: '45', icon: '🎨' },
        { label: 'Avg. Generation Time', value: '1.4 sec', icon: '⏱️' },
        { label: 'Successful Transformations', value: '93%', icon: '✅' },
      ])

    } catch (error) {
      console.error('Error fetching analytics data:', error)
      setBackendError(true)
      
      // Set fallback data
      setStats([
        { label: 'Active Users', value: '1,248', change: '+12%', positive: true, icon: '👤' },
        { label: 'Avg Friction', value: '87%', change: '+8.5%', positive: false, icon: '📊' },
        { label: 'AI Generated UI', value: '320', change: '+10.5%', positive: true, icon: '🎨' },
        { label: 'Success Rate', value: '95%', change: '+10%', positive: true, icon: '✅' },
      ])
      
      setChartData({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [65, 72, 58, 82, 70, 45, 38]
      })
      
    } finally {
      setLoading(false)
    }
  }

  const getFrictionColor = (value) => {
    if (value > 70) return '#EF4444'
    if (value > 50) return '#F59E0B'
    return '#22C55E'
  }

  const getFrictionText = (value) => {
    if (value > 70) return 'High'
    if (value > 50) return 'Medium'
    return 'Low'
  }

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'completed': 'completed',
      'active': 'active',
      'pending': 'pending',
      'abandoned': 'abandoned',
      'in progress': 'pending'
    }
    return statusMap[status?.toLowerCase()] || 'pending'
  }

  // Get status display text
  const getStatusText = (status) => {
    if (!status) return 'Pending'
    const statusMap = {
      'completed': 'Completed',
      'active': 'Active',
      'pending': 'Pending',
      'abandoned': 'Abandoned',
      'in progress': 'In Progress'
    }
    return statusMap[status.toLowerCase()] || status
  }

  // Chart configuration
  const chartConfig = {
    labels: chartData?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Friction Score',
        data: chartData?.values || [65, 72, 58, 82, 70, 45, 38],
        borderColor: '#7C5CFF',
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, 'rgba(124, 92, 255, 0.3)')
          gradient.addColorStop(0.5, 'rgba(124, 92, 255, 0.1)')
          gradient.addColorStop(1, 'rgba(124, 92, 255, 0)')
          return gradient
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#7C5CFF',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        borderWidth: 3,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#FFFFFF',
        bodyColor: '#9CA3AF',
        borderColor: 'rgba(124, 92, 255, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `Friction: ${context.parsed.y}%`
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: '#6B7280', font: { size: 11 } }
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: {
          color: '#6B7280',
          font: { size: 11 },
          stepSize: 25,
          callback: function(value) {
            return value + '%'
          }
        }
      }
    },
    interaction: { intersect: false, mode: 'index' },
  }

  if (loading) {
    return (
      <div className="analytics-page">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="analytics-main">
          <div className="loading-spinner">Loading analytics...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="analytics-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="analytics-main">
        {/* Header */}
        <div className="analytics-header">
          <div>
            <h1 className="analytics-title">Analytics</h1>
            <p className="analytics-subtitle">Detailed insights and reports about user behaviour and AI performance.</p>
          </div>
          <div className="analytics-actions">
            <button className="btn-secondary">Export CSV</button>
            <button className="btn-secondary">Export PDF</button>
            <button className="btn-primary">Download Report</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="analytics-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="analytics-stat-card glass-card">
              <div className="analytics-stat-header">
                <span className="analytics-stat-icon">{stat.icon}</span>
                <span className={`analytics-stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                  {stat.change}
                </span>
              </div>
              <span className="analytics-stat-value">{stat.value}</span>
              <span className="analytics-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Date Range Filter */}
        <div className="analytics-date-range glass-card">
          <span className="analytics-date-label">📅 Date Range:</span>
          <select 
            className="analytics-date-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last14days">Last 14 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>

        {/* User Friction Trend */}
        <div className="analytics-chart-card glass-card">
          <div className="chart-header">
            <h3 className="chart-title">User Friction Trend</h3>
            <select className="chart-dropdown">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="chart-container-wrapper">
            <Line data={chartConfig} options={chartOptions} />
          </div>
        </div>

        {/* Two Column: Friction Sources & AI Performance */}
        <div className="analytics-two-col">
          {/* Friction Sources */}
          <div className="analytics-friction-sources glass-card">
            <h3 className="analytics-friction-title">Friction Sources</h3>
            {frictionSources.map((source, index) => (
              <div key={index} className="analytics-friction-item">
                <span className="analytics-friction-label">{source.label}</span>
                <div className="analytics-friction-bar-track">
                  <div 
                    className="analytics-friction-bar-fill"
                    style={{ 
                      width: `${source.value}%`,
                      background: source.color
                    }}
                  ></div>
                </div>
                <span className="analytics-friction-value">{source.value}%</span>
              </div>
            ))}
          </div>

          {/* AI Performance */}
          <div className="analytics-ai-performance glass-card">
            <h3 className="analytics-ai-performance-title">AI Performance</h3>
            <div className="analytics-ai-performance-grid">
              <div className="analytics-ai-performance-item">
                <span className="analytics-ai-performance-icon">📊</span>
                <span className="analytics-ai-performance-value">{aiPerformance.requests}</span>
                <span className="analytics-ai-performance-label">Requests</span>
              </div>
              <div className="analytics-ai-performance-item">
                <span className="analytics-ai-performance-icon">⏱️</span>
                <span className="analytics-ai-performance-value">{aiPerformance.avgResponse}</span>
                <span className="analytics-ai-performance-label">Avg Response</span>
              </div>
              <div className="analytics-ai-performance-item">
                <span className="analytics-ai-performance-icon">✅</span>
                <span className="analytics-ai-performance-value">{aiPerformance.successRate}%</span>
                <span className="analytics-ai-performance-label">Success</span>
              </div>
              <div className="analytics-ai-performance-item">
                <span className="analytics-ai-performance-icon">❌</span>
                <span className="analytics-ai-performance-value">{aiPerformance.failureRate}%</span>
                <span className="analytics-ai-performance-label">Failures</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Transformation Statistics */}
        <div className="analytics-ai-stats glass-card">
          <h3 className="analytics-ai-stats-title">AI Transformation Statistics</h3>
          <div className="analytics-ai-stats-grid">
            {aiStats.map((stat, index) => (
              <div key={index} className="analytics-ai-stat-item">
                <span className="analytics-ai-stat-icon">{stat.icon}</span>
                <span className="analytics-ai-stat-value">{stat.value}</span>
                <span className="analytics-ai-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Problematic Pages */}
        <div className="analytics-problematic glass-card">
          <h3 className="analytics-problematic-title">Top Problematic Pages</h3>
          <table className="analytics-problematic-table">
            <thead>
              <tr>
                <th>Page Name</th>
                <th>Views</th>
                <th>Avg. Friction Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {problematicPages.map((page, index) => (
                <tr key={index}>
                  <td>{page.page}</td>
                  <td>{page.views}</td>
                  <td>
                    <span className="analytics-friction-badge" style={{ 
                      background: getFrictionColor(parseInt(page.friction)) + '20',
                      color: getFrictionColor(parseInt(page.friction))
                    }}>
                      {page.friction}
                    </span>
                  </td>
                  <td>
                    <span className={`analytics-status-badge ${page.status?.toLowerCase() || 'medium'}`}>
                      {page.status || 'Medium'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Sessions */}
        <div className="analytics-sessions glass-card">
          <h3 className="analytics-sessions-title">Recent Sessions</h3>
          <table className="analytics-sessions-table">
            <thead>
              <tr>
                <th>Session ID</th>
                <th>User</th>
                <th>Friction Score</th>
                <th>Duration</th>
                <th>Generated UI</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={index}>
                  <td>{session.id}</td>
                  <td>{session.user}</td>
                  <td className="analytics-friction-value">{session.friction}</td>
                  <td>{session.duration}</td>
                  <td>
                    <span className={`analytics-generated-badge ${session.generated === 'Yes' ? 'yes' : 'no'}`}>
                      {session.generated}
                    </span>
                  </td>
                  <td>
                    <span className={`analytics-status-badge ${getStatusBadgeClass(session.status)}`}>
                      {getStatusText(session.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="analytics-footer">
          <span>AuraGen v1.0</span>
          <span>© 2026 AuraGen. All rights reserved.</span>
          <span>Last 7 Days • May 10, 2025 - May 16, 2025</span>
        </footer>
      </main>
    </div>
  )
}

export default Analytics