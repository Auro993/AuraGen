// frontend/src/pages/FrictionEngine.jsx

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
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
import { exportFrictionReport } from '../services/pdfExport'
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

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
}

const FrictionEngine = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('friction')
  const [loading, setLoading] = useState(true)
  const [frictionScore, setFrictionScore] = useState(0)
  const [kpiData, setKpiData] = useState([])
  const [chartData, setChartData] = useState(null)
  const [frictionFactors, setFrictionFactors] = useState([])
  const [scoreBreakdown, setScoreBreakdown] = useState([])
  const [events, setEvents] = useState([])
  const [recommendation, setRecommendation] = useState({})
  const [dataSource, setDataSource] = useState('loading')
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchFrictionData()
  }, [navigate])

  const fetchFrictionData = async () => {
    try {
      setLoading(true)
      
      const response = await api.get('/friction/analytics')
      const data = response.data
      
      if (data && data.totalScore !== undefined) {
        processRealData(data)
        setDataSource('live')
        toast.success('📊 Real data loaded from backend')
      } else {
        processDemoData()
        setDataSource('demo')
        toast.info('📋 Using demo data')
      }
      
    } catch (error) {
      console.error('Error fetching friction data:', error)
      processDemoData()
      setDataSource('demo')
      toast.error('⚠️ Using demo data (backend unavailable)')
    } finally {
      setLoading(false)
    }
  }

  const processRealData = (data) => {
    const totalScore = data.totalScore || 0
    setFrictionScore(totalScore)

    setKpiData([
      { icon: '📊', label: 'Average Friction Score', value: `${data.avgScore || 0}/100`, change: data.trendChange || '↑ 0%', positive: false, color: '#7C5CFF' },
      { icon: '🔺', label: 'Highest Friction Score', value: `${data.highestScore || 0}/100`, change: data.highestFrictionDate || 'No data', positive: false, color: '#EF4444' },
      { icon: '✅', label: 'Low Friction Sessions', value: data.lowFrictionSessions || 0, change: data.lowFrictionTrend || 'No data', positive: true, color: '#22C55E' },
      { icon: '📉', label: 'Friction Reduced', value: `${data.frictionReduced || 0}%`, change: 'after AI optimization', positive: true, color: '#3B82F6' }
    ])

    setFrictionFactors(data.factors || [
      { label: 'Rage clicks', detail: 'Multiple rapid clicks detected', value: 0, color: '#EF4444' },
      { label: 'Too many clicks', detail: 'Users are clicking more than expected', value: 0, color: '#EC4899' },
      { label: 'Long idle time', detail: 'Users are taking too long to act', value: 0, color: '#F59E0B' },
      { label: 'Scrolling depth', detail: 'Users not finding content easily', value: 0, color: '#22C55E' },
      { label: 'Back tracking', detail: 'Users are going back frequently', value: 0, color: '#3B82F6' }
    ])

    setScoreBreakdown(data.breakdown || [
      { label: 'Wrong Clicks', value: 0, contribution: '+0', icon: '❌', color: '#EF4444', description: 'No data' },
      { label: 'Idle Time', value: 0, contribution: '+0', icon: '⏱️', color: '#F59E0B', description: 'No data' },
      { label: 'Scroll Depth', value: 0, contribution: '+0', icon: '📜', color: '#22C55E', description: 'No data' },
      { label: 'Mouse Movement', value: 0, contribution: '+0', icon: '🖱️', color: '#7C5CFF', description: 'No data' },
      { label: 'Completion Time', value: 0, contribution: '+0', icon: '⏳', color: '#3B82F6', description: 'No data' }
    ])

    setChartData({
      labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
      values: [65, 72, 58, 82, 70, 45, 38]
    })

    setEvents(data.events || [
      { time: 'No events', user: '-', page: '-', event: 'No data', score: 0, severity: 'Low' }
    ])

    setRecommendation(data.recommendation || {
      insight: 'No significant friction detected. Users are navigating smoothly.',
      recommendation: 'Continue monitoring for any emerging issues.'
    })
  }

  const processDemoData = () => {
    const totalScore = 81
    setFrictionScore(totalScore)

    setKpiData([
      { icon: '📊', label: 'Average Friction Score', value: '72/100', change: '↑ 8.6%', positive: false, color: '#7C5CFF' },
      { icon: '🔺', label: 'Highest Friction Score', value: '92/100', change: 'May 14', positive: false, color: '#EF4444' },
      { icon: '✅', label: 'Low Friction Sessions', value: '320', change: '↑ 14.2%', positive: true, color: '#22C55E' },
      { icon: '📉', label: 'Friction Reduced', value: '18.6%', change: 'after AI', positive: true, color: '#3B82F6' }
    ])

    setFrictionFactors([
      { label: 'Rage clicks', detail: 'Multiple rapid clicks detected', value: 25, color: '#EF4444' },
      { label: 'Too many clicks', detail: 'Users are clicking more than expected', value: 30, color: '#EC4899' },
      { label: 'Long idle time', detail: 'Users are taking too long to act', value: 22, color: '#F59E0B' },
      { label: 'Scrolling depth', detail: 'Users not finding content easily', value: 24, color: '#22C55E' },
      { label: 'Back tracking', detail: 'Users are going back frequently', value: 10, color: '#3B82F6' }
    ])

    setScoreBreakdown([
      { label: 'Wrong Clicks', value: 25, contribution: '+25', icon: '❌', color: '#EF4444', description: 'Users clicking wrong elements' },
      { label: 'Idle Time', value: 22, contribution: '+22', icon: '⏱️', color: '#F59E0B', description: 'Users taking too long to act' },
      { label: 'Scroll Depth', value: 15, contribution: '+15', icon: '📜', color: '#22C55E', description: 'Users not finding content' },
      { label: 'Mouse Movement', value: 12, contribution: '+12', icon: '🖱️', color: '#7C5CFF', description: 'Erratic mouse movement' },
      { label: 'Completion Time', value: 7, contribution: '+7', icon: '⏳', color: '#3B82F6', description: 'Time taken to complete tasks' }
    ])

    setChartData({
      labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
      values: [65, 72, 58, 82, 70, 45, 38]
    })

    setEvents([
      { time: 'May 16, 10:24 AM', user: 'John Doe', page: '/pricing', event: 'Rage Clicks', score: 85, severity: 'High' },
      { time: 'May 16, 10:21 AM', user: 'Emma Smith', page: '/checkout', event: 'Long Idle Time', score: 72, severity: 'High' },
      { time: 'May 16, 10:18 AM', user: 'Michael Brown', page: '/features', event: 'Too Many Clicks', score: 64, severity: 'Medium' }
    ])

    setRecommendation({
      insight: 'Users are experiencing high friction due to complex navigation.',
      recommendation: 'Simplify the layout and reduce the number of steps.'
    })
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
    const colors = { High: '#EF4444', Medium: '#F59E0B', Low: '#22C55E' }
    return colors[severity] || '#9CA3AF'
  }

  const handleGenerateUI = () => {
    navigate('/ai', { 
      state: { frictionScore, recommendation, from: 'friction-engine' } 
    })
  }

  const handleRefresh = () => {
    fetchFrictionData()
    toast.success('🔄 Refreshing data...')
  }

  // ✅ PDF Export Handler
  const handleExportReport = async () => {
    try {
      setIsExporting(true)
      const data = {
        totalScore: frictionScore,
        factors: frictionFactors,
        breakdown: scoreBreakdown,
        events: events,
        timestamp: new Date().toISOString()
      }
      await exportFrictionReport(data, 'Friction_Engine_Report')
      toast.success('📄 Report exported successfully!')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export report')
    } finally {
      setIsExporting(false)
    }
  }

  const chartConfig = {
    labels: chartData?.labels || ['No Data'],
    datasets: [{
      label: 'Friction Score',
      data: chartData?.values || [0],
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
    }]
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="friction-page"
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="friction-main">
          <div className="loading-spinner">Loading friction data...</div>
        </main>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="friction-page"
    >
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="friction-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="friction-header"
        >
          <div>
            <h1 className="friction-title">Friction Engine</h1>
            <p className="friction-subtitle">
              Calculate, analyze and reduce user friction with AI-powered insights.
              {dataSource === 'live' && <span className="data-badge live">📊 Live</span>}
              {dataSource === 'demo' && <span className="data-badge demo">📋 Demo</span>}
            </p>
          </div>
          <div className="friction-actions">
            <button className="btn-secondary" onClick={handleRefresh}>🔄 Refresh</button>
            <button className="btn-secondary" onClick={handleGenerateUI}>🚀 Generate UI</button>
            <button 
              className="btn-primary" 
              onClick={handleExportReport}
              disabled={isExporting}
            >
              {isExporting ? '⏳ Exporting...' : '📄 Export Report'}
            </button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div 
          className="friction-kpi-grid"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {kpiData.map((kpi, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="friction-kpi-card glass-card"
              style={{ borderColor: kpi.color }}
            >
              <div className="friction-kpi-header">
                <span className="friction-kpi-icon">{kpi.icon}</span>
                <span className={`friction-kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>
                  {kpi.change}
                </span>
              </div>
              <span className="friction-kpi-value">{kpi.value}</span>
              <span className="friction-kpi-label">{kpi.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column: Friction Trend & Current Friction Meter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="friction-two-col"
        >
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
                    <motion.path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke={getFrictionColor(frictionScore)}
                      strokeWidth="20"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '0 251.2' }}
                      animate={{ strokeDasharray: `${(frictionScore / 100) * 251.2} 251.2` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="friction-gauge-center">
                    <motion.span 
                      className="friction-gauge-value"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {frictionScore}
                    </motion.span>
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
                    : frictionScore > 0
                    ? 'Low friction. Users are navigating smoothly.'
                    : 'No friction data available. Start using the demo portal.'
                  }
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two Column: Friction Factors & Score Breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="friction-two-col"
        >
          <div className="friction-factors-card glass-card">
            <h3 className="friction-card-title">Friction Factors</h3>
            {frictionFactors.map((factor, index) => (
              <motion.div 
                key={index} 
                className="friction-factor-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="friction-factor-header">
                  <span className="friction-factor-label">{factor.label}</span>
                  <span className="friction-factor-value">{factor.value}%</span>
                </div>
                <div className="friction-factor-bar-track">
                  <motion.div 
                    className="friction-factor-bar-fill"
                    style={{ width: `${factor.value}%`, background: factor.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.value}%` }}
                    transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                  />
                </div>
                <span className="friction-factor-detail">{factor.detail}</span>
              </motion.div>
            ))}
          </div>

          <div className="friction-breakdown-card glass-card">
            <h3 className="friction-card-title">📊 Friction Score Breakdown</h3>
            <div className="friction-breakdown-list">
              {scoreBreakdown.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="friction-breakdown-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="friction-breakdown-left">
                    <span className="friction-breakdown-icon">{item.icon}</span>
                    <div className="friction-breakdown-info">
                      <span className="friction-breakdown-label">{item.label}</span>
                      <span className="friction-breakdown-desc">{item.description}</span>
                    </div>
                  </div>
                  <div className="friction-breakdown-right">
                    <span className="friction-breakdown-value" style={{ color: item.color }}>
                      {item.value}
                    </span>
                    <span className="friction-breakdown-contribution" style={{ color: item.color }}>
                      {item.contribution}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="friction-breakdown-total">
              <span className="friction-breakdown-total-label">TOTAL</span>
              <span className="friction-breakdown-total-value" style={{ color: getFrictionColor(frictionScore) }}>
                {frictionScore}/100
              </span>
            </div>
          </div>
        </motion.div>

        {/* Recent Friction Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="friction-events-card glass-card"
        >
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
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
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
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* AI Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="friction-recommendation-card glass-card"
        >
          <div className="friction-recommendation-header">
            <span className="friction-recommendation-icon">💡</span>
            <h3 className="friction-recommendation-title">AI Insight & Recommendation</h3>
          </div>
          <p className="friction-recommendation-message">{recommendation.insight}</p>
          <div className="friction-recommendation-action">
            <span className="friction-recommendation-label">Recommended Action:</span>
            <span className="friction-recommendation-text">{recommendation.recommendation}</span>
          </div>
          <motion.button 
            className="btn-primary friction-generate-btn"
            onClick={handleGenerateUI}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🚀 Generate Optimized UI
          </motion.button>
        </motion.div>
      </main>
    </motion.div>
  )
}

export default FrictionEngine