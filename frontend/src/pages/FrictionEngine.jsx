import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
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
import './FrictionEngine.css'

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

const FrictionEngine = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('friction')
  const [loading, setLoading] = useState(true)
  const [frictionScore, setFrictionScore] = useState(72)
  const [kpiData, setKpiData] = useState([])
  const [chartData, setChartData] = useState(null)
  const [frictionFactors, setFrictionFactors] = useState([])
  const [events, setEvents] = useState([])
  const [recommendation, setRecommendation] = useState({})
  const [backendError, setBackendError] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  useEffect(() => {
    fetchFrictionData()
    
    const interval = setInterval(() => {
      const newScore = Math.floor(Math.random() * 40) + 50
      setFrictionScore(newScore)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchFrictionData = async () => {
    try {
      setLoading(true)
      setBackendError(false)
      
      const kpiRes = await api.get('/friction/overview')
      const kpiDataRes = kpiRes.data
      
      setKpiData([
        { 
          icon: '📊', 
          label: 'Average Friction Score', 
          value: `${kpiDataRes.avgFriction || 72} /100`, 
          change: '↑ 8.6% from last 7 days',
          positive: false,
          color: '#7C5CFF'
        },
        { 
          icon: '🔺', 
          label: 'Highest Friction Score', 
          value: `${kpiDataRes.highestFriction || 92} /100`, 
          change: kpiDataRes.highestFrictionDate || 'May 14, 2025',
          positive: false,
          color: '#EF4444'
        },
        { 
          icon: '✅', 
          label: 'Low Friction Sessions', 
          value: kpiDataRes.lowFrictionSessions?.toLocaleString() || '320', 
          change: '↑ 14.2% from last 7 days',
          positive: true,
          color: '#22C55E'
        },
        { 
          icon: '📉', 
          label: 'Friction Reduced', 
          value: `${kpiDataRes.frictionReduced || 18.6}%`, 
          change: 'after AI optimization',
          positive: true,
          color: '#3B82F6'
        },
      ])

      const trendRes = await api.get('/friction/trend')
      const trendData = trendRes.data
      
      setChartData({
        labels: trendData.labels || ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
        values: trendData.values || [65, 72, 58, 82, 70, 45, 38]
      })

      const factorsRes = await api.get('/friction/factors')
      setFrictionFactors(factorsRes.data || [
        { label: 'Too many clicks', detail: 'Users are clicking more than expected', value: 38, color: '#EF4444' },
        { label: 'Rage clicks', detail: 'Multiple rapid clicks detected', value: 28, color: '#F59E0B' },
        { label: 'Long idle time', detail: 'Users are taking too long to act', value: 20, color: '#7C5CFF' },
        { label: 'Scrolling depth', detail: 'Users not finding content easily', value: 14, color: '#22C55E' },
        { label: 'Back tracking', detail: 'Users are going back frequently', value: 10, color: '#3B82F6' },
      ])

      const eventsRes = await api.get('/friction/events')
      setEvents(eventsRes.data || [
        { time: 'May 16, 10:24 AM', user: 'John Doe', page: '/pricing', event: 'Rage Clicks', score: 85, severity: 'High' },
        { time: 'May 16, 10:21 AM', user: 'Emma Smith', page: '/checkout', event: 'Long Idle Time', score: 72, severity: 'High' },
        { time: 'May 16, 10:18 AM', user: 'Michael Brown', page: '/features', event: 'Too Many Clicks', score: 64, severity: 'Medium' },
        { time: 'May 16, 10:15 AM', user: 'Sarah Wilson', page: '/dashboard', event: 'Back Tracking', score: 48, severity: 'Medium' },
        { time: 'May 16, 10:12 AM', user: 'David Lee', page: '/profile', event: 'Long Idle Time', score: 35, severity: 'Low' },
      ])

      const recRes = await api.get('/friction/recommendation')
      setRecommendation(recRes.data || {
        insight: 'Users are experiencing high friction due to complex navigation and too many interaction steps on the pricing page.',
        recommendation: 'Simplify the pricing layout and reduce the number of steps in the checkout process.'
      })

    } catch (error) {
      console.error('Error fetching friction data:', error)
      setBackendError(true)
      
      setKpiData([
        { icon: '📊', label: 'Average Friction Score', value: '72 /100', change: '↑ 8.6% from last 7 days', positive: false, color: '#7C5CFF' },
        { icon: '🔺', label: 'Highest Friction Score', value: '92 /100', change: 'May 14, 2025', positive: false, color: '#EF4444' },
        { icon: '✅', label: 'Low Friction Sessions', value: '320', change: '↑ 14.2% from last 7 days', positive: true, color: '#22C55E' },
        { icon: '📉', label: 'Friction Reduced', value: '18.6%', change: 'after AI optimization', positive: true, color: '#3B82F6' },
      ])
      
      setChartData({
        labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
        values: [65, 72, 58, 82, 70, 45, 38]
      })
      
      setFrictionFactors([
        { label: 'Too many clicks', detail: 'Users are clicking more than expected', value: 38, color: '#EF4444' },
        { label: 'Rage clicks', detail: 'Multiple rapid clicks detected', value: 28, color: '#F59E0B' },
        { label: 'Long idle time', detail: 'Users are taking too long to act', value: 20, color: '#7C5CFF' },
        { label: 'Scrolling depth', detail: 'Users not finding content easily', value: 14, color: '#22C55E' },
        { label: 'Back tracking', detail: 'Users are going back frequently', value: 10, color: '#3B82F6' },
      ])
      
      setEvents([
        { time: 'May 16, 10:24 AM', user: 'John Doe', page: '/pricing', event: 'Rage Clicks', score: 85, severity: 'High' },
        { time: 'May 16, 10:21 AM', user: 'Emma Smith', page: '/checkout', event: 'Long Idle Time', score: 72, severity: 'High' },
        { time: 'May 16, 10:18 AM', user: 'Michael Brown', page: '/features', event: 'Too Many Clicks', score: 64, severity: 'Medium' },
        { time: 'May 16, 10:15 AM', user: 'Sarah Wilson', page: '/dashboard', event: 'Back Tracking', score: 48, severity: 'Medium' },
        { time: 'May 16, 10:12 AM', user: 'David Lee', page: '/profile', event: 'Long Idle Time', score: 35, severity: 'Low' },
      ])
      
      setRecommendation({
        insight: 'Users are experiencing high friction due to complex navigation and too many interaction steps on the pricing page.',
        recommendation: 'Simplify the pricing layout and reduce the number of steps in the checkout process.'
      })
      
    } finally {
      setLoading(false)
    }
  }

  const getFrictionColor = (score) => {
    if (score > 70) return '#EF4444'
    if (score > 40) return '#F59E0B'
    return '#22C55E'
  }

  const getFrictionLevel = (score) => {
    if (score > 70) return 'High'
    if (score > 40) return 'Medium'
    return 'Low'
  }

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return '#EF4444'
      case 'Medium': return '#F59E0B'
      case 'Low': return '#22C55E'
      default: return '#9CA3AF'
    }
  }

  // Navigate to AI Generator
  const handleGenerateUI = () => {
    navigate('/ai', { 
      state: { 
        frictionScore: frictionScore,
        recommendation: recommendation,
        from: 'friction-engine'
      } 
    })
  }

  // Chart configuration
  const chartConfig = {
    labels: chartData?.labels || ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
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

  const heatmapData = Array.from({ length: 10 }, () =>
    Array.from({ length: 14 }, () => Math.random())
  )

  if (loading) {
    return (
      <div className="friction-page">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="friction-main">
          <div className="loading-spinner">Loading friction data...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="friction-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="friction-main">
        {/* Header */}
        <div className="friction-header">
          <div>
            <h1 className="friction-title">Friction Engine</h1>
            <p className="friction-subtitle">Calculate, analyze and reduce user friction with AI-powered insights.</p>
          </div>
          <div className="friction-actions">
            <button className="btn-secondary">📅 Last 7 Days</button>
            <button className="btn-primary">Export Report</button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="friction-kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="friction-kpi-card glass-card" style={{ borderColor: kpi.color }}>
              <div className="friction-kpi-header">
                <span className="friction-kpi-icon">{kpi.icon}</span>
                <span className={`friction-kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>
                  {kpi.change}
                </span>
              </div>
              <span className="friction-kpi-value">{kpi.value}</span>
              <span className="friction-kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>

        {/* Two Column: Friction Trend & Current Friction Meter */}
        <div className="friction-two-col">
          <div className="friction-trend-card glass-card">
            <h3 className="friction-card-title">Friction Score Over Time</h3>
            <div className="friction-chart-wrapper">
              <Line data={chartConfig} options={chartOptions} />
            </div>
          </div>

          <div className="friction-meter-card glass-card">
            <h3 className="friction-card-title">Current Friction Score</h3>
            <div className="friction-meter-container">
              <div className="friction-gauge">
                <div className="friction-gauge-arc">
                  <svg viewBox="0 0 200 120">
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#1a1a2e"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke={getFrictionColor(frictionScore)}
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray={`${(frictionScore / 100) * 251.2} 251.2`}
                      strokeDashoffset="0"
                      style={{ transition: 'stroke-dasharray 1s ease' }}
                    />
                  </svg>
                  <div className="friction-gauge-center">
                    <span className="friction-gauge-value">{frictionScore}</span>
                    <span className="friction-gauge-label">/100</span>
                  </div>
                </div>
                <div className="friction-level-indicators">
                  <span className="friction-level low">Low</span>
                  <span className="friction-level medium">Medium</span>
                  <span className="friction-level high">High</span>
                </div>
              </div>
              <div className="friction-status">
                <span className="friction-status-label">
                  {getFrictionLevel(frictionScore)} Friction
                </span>
                <span className="friction-status-message">
                  {frictionScore > 70 
                    ? 'Friction is higher than usual. Users are struggling with some interactions.'
                    : frictionScore > 40
                    ? 'Moderate friction detected. Some users may be experiencing difficulty.'
                    : 'Low friction. Users are navigating smoothly.'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column: Friction Factors & High Friction Areas */}
        <div className="friction-two-col">
          <div className="friction-factors-card glass-card">
            <h3 className="friction-card-title">Friction Factors</h3>
            {frictionFactors.map((factor, index) => (
              <div key={index} className="friction-factor-item">
                <div className="friction-factor-header">
                  <span className="friction-factor-label">{factor.label}</span>
                  <span className="friction-factor-value">{factor.value}%</span>
                </div>
                <div className="friction-factor-bar-track">
                  <div 
                    className="friction-factor-bar-fill"
                    style={{ 
                      width: `${factor.value}%`,
                      background: factor.color
                    }}
                  />
                </div>
                <span className="friction-factor-detail">{factor.detail}</span>
              </div>
            ))}
          </div>

          <div className="friction-heatmap-card glass-card">
            <h3 className="friction-card-title">High Friction Areas (Heatmap)</h3>
            <div className="friction-heatmap-grid">
              {heatmapData.map((row, rowIndex) => (
                <div key={rowIndex} className="friction-heatmap-row">
                  {row.map((intensity, colIndex) => (
                    <div 
                      key={colIndex} 
                      className="friction-heatmap-cell"
                      style={{ 
                        opacity: intensity,
                        background: intensity > 0.7 ? '#EF4444' : intensity > 0.4 ? '#F59E0B' : '#22C55E'
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="friction-heatmap-legend">
              <span>Low</span>
              <div className="friction-heatmap-gradient">
                <span style={{ background: '#22C55E' }} />
                <span style={{ background: '#F59E0B' }} />
                <span style={{ background: '#EF4444' }} />
              </div>
              <span>High</span>
            </div>
            <div className="friction-heatmap-stats">
              <div className="friction-heatmap-stat">
                <span>Total</span>
                <strong>{frictionScore}/100</strong>
              </div>
              <div className="friction-heatmap-stat">
                <span>Cognitive Load</span>
                <strong>42</strong>
              </div>
              <div className="friction-heatmap-stat">
                <span>Navigation Issues</span>
                <strong>28</strong>
              </div>
              <div className="friction-heatmap-stat">
                <span>Interaction Complexity</span>
                <strong>18</strong>
              </div>
              <div className="friction-heatmap-stat">
                <span>Visual Clarity</span>
                <strong>12</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Friction Events */}
        <div className="friction-events-card glass-card">
          <h3 className="friction-card-title">Recent Friction Events</h3>
          <table className="friction-events-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Page</th>
                <th>Event</th>
                <th>Friction Score</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{event.time}</td>
                  <td>{event.user}</td>
                  <td>{event.page}</td>
                  <td>{event.event}</td>
                  <td className="friction-event-score">{event.score}</td>
                  <td>
                    <span 
                      className="friction-event-severity"
                      style={{ 
                        background: getSeverityColor(event.severity) + '20',
                        color: getSeverityColor(event.severity)
                      }}
                    >
                      {event.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Recommendation */}
        <div className="friction-recommendation-card glass-card">
          <div className="friction-recommendation-header">
            <span className="friction-recommendation-icon">💡</span>
            <h3 className="friction-recommendation-title">AI Insight & Recommendation</h3>
          </div>
          <p className="friction-recommendation-message">{recommendation.insight}</p>
          <div className="friction-recommendation-action">
            <span className="friction-recommendation-label">Recommended Action:</span>
            <span className="friction-recommendation-text">{recommendation.recommendation}</span>
          </div>
          <button 
            className="btn-primary friction-generate-btn"
            onClick={handleGenerateUI}
          >
            🚀 Generate Optimized UI
          </button>
        </div>
      </main>
    </div>
  )
}

export default FrictionEngine