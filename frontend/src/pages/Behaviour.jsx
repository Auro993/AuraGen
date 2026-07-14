import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import './Behaviour.css'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Behaviour = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('behavior')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  // KPI Data
  const kpiData = [
    { 
      icon: '🖱️', 
      label: 'Total Interactions', 
      value: '24,589', 
      change: '+1,645', 
      positive: true,
      color: '#7C5CFF'
    },
    { 
      icon: '📊', 
      label: 'Avg. Interactions / Session', 
      value: '32.4', 
      change: '+12.4%', 
      positive: true,
      color: '#3B82F6'
    },
    { 
      icon: '⚡', 
      label: 'Rage Clicks', 
      value: '1,248', 
      change: '+7,625', 
      positive: false,
      color: '#EF4444'
    },
    { 
      icon: '❌', 
      label: 'Dead Clicks', 
      value: '842', 
      change: '+4,235', 
      positive: false,
      color: '#F59E0B'
    },
  ]

  // Behaviour Distribution - Doughnut Chart
  const behaviourData = {
    labels: ['Mouse Movement', 'Wrong Clicks', 'Idle Time', 'Scroll Hesitation'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ['#7C5CFF', '#EF4444', '#F59E0B', '#22C55E'],
        borderWidth: 0,
        hoverOffset: 10,
      }
    ]
  }

  const behaviourOptions = {
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
            const label = context.label || ''
            const value = context.parsed || 0
            return `${label}: ${value}%`
          }
        }
      }
    },
    cutout: '60%',
    responsive: true,
    maintainAspectRatio: false,
  }

  const behaviourLegend = [
    { label: 'Mouse Movement', value: '40%', color: '#7C5CFF' },
    { label: 'Wrong Clicks', value: '25%', color: '#EF4444' },
    { label: 'Idle Time', value: '20%', color: '#F59E0B' },
    { label: 'Scroll Hesitation', value: '15%', color: '#22C55E' },
  ]

  // Interaction Over Time - Line Chart
  const interactionData = {
    labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
    datasets: [
      {
        label: 'Interactions',
        data: [1200, 1500, 1800, 1600, 2000, 2200, 1900],
        borderColor: '#7C5CFF',
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) {
            return null
          }
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

  const interactionOptions = {
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
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: '#6B7280', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: {
          color: '#6B7280',
          font: { size: 11 },
          callback: function(value) {
            return value.toLocaleString()
          }
        }
      }
    },
    interaction: { intersect: false, mode: 'index' },
  }

  // Top Behaviour Triggers - Horizontal Bar Chart
  const triggersData = {
    labels: ['Confusing Navigation', 'Complex Forms', 'Too Much Information', 'Small Buttons', 'Slow Loading'],
    datasets: [
      {
        label: 'Occurrences',
        data: [1248, 842, 824, 421, 312],
        backgroundColor: ['#7C5CFF', '#3B82F6', '#22C55E', '#F59E0B', '#EF4444'],
        borderRadius: 6,
      }
    ]
  }

  const triggersOptions = {
    indexAxis: 'y',
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
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: '#6B7280', font: { size: 11 } }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#9CA3AF', font: { size: 12 } }
      }
    },
  }

  // Behaviour Timeline
  const timelineEvents = [
    { time: '10:00', event: 'User Opened Dashboard', icon: '📱' },
    { time: '10:01', event: 'Scrolled Down', icon: '📜' },
    { time: '10:02', event: 'Wrong Click', icon: '❌' },
    { time: '10:03', event: 'Mouse Hesitation', icon: '🖱️' },
    { time: '10:04', event: 'AI Suggested Simpler UI', icon: '🤖' },
  ]

  // AI Insight
  const aiInsight = {
    title: '💡 AI Insight',
    message: 'Users spend most of their time searching for the navigation menu.',
    suggestion: 'Simplify the navigation and increase button visibility.'
  }

  return (
    <div className="behaviour-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="behaviour-main">
        {/* Header */}
        <div className="behaviour-header">
          <div>
            <h1 className="behaviour-title">Behaviour</h1>
            <p className="behaviour-subtitle">Understand how users interact with your application.</p>
          </div>
          <div className="behaviour-actions">
            <button className="btn-secondary">📅 Last 7 Days</button>
            <button className="btn-primary">Export Report</button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="behaviour-kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="behaviour-kpi-card glass-card" style={{ borderColor: kpi.color }}>
              <div className="behaviour-kpi-header">
                <span className="behaviour-kpi-icon">{kpi.icon}</span>
                <span className={`behaviour-kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>
                  {kpi.change}
                </span>
              </div>
              <span className="behaviour-kpi-value">{kpi.value}</span>
              <span className="behaviour-kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>

        {/* Two Column: Behaviour Distribution & Interaction Over Time */}
        <div className="behaviour-two-col">
          {/* Behaviour Distribution */}
          <div className="behaviour-distribution-card glass-card">
            <h3 className="behaviour-card-title">Behaviour Distribution</h3>
            <div className="behaviour-distribution-content">
              <div className="behaviour-donut-wrapper">
                <Doughnut data={behaviourData} options={behaviourOptions} />
              </div>
              <div className="behaviour-distribution-legend">
                {behaviourLegend.map((item, index) => (
                  <div key={index} className="behaviour-legend-item">
                    <div className="behaviour-legend-left">
                      <span className="behaviour-legend-dot" style={{ background: item.color }}></span>
                      <span className="behaviour-legend-label">{item.label}</span>
                    </div>
                    <span className="behaviour-legend-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interaction Over Time */}
          <div className="behaviour-interaction-card glass-card">
            <h3 className="behaviour-card-title">Interaction Over Time</h3>
            <div className="behaviour-chart-wrapper">
              <Line data={interactionData} options={interactionOptions} />
            </div>
          </div>
        </div>

        {/* Two Column: Top Behaviour Triggers & Mouse Heatmap */}
        <div className="behaviour-two-col">
          {/* Top Behaviour Triggers */}
          <div className="behaviour-triggers-card glass-card">
            <h3 className="behaviour-card-title">Top Behaviour Triggers</h3>
            <div className="behaviour-triggers-wrapper">
              <Bar data={triggersData} options={triggersOptions} />
            </div>
          </div>

          {/* Mouse Heatmap */}
          <div className="behaviour-heatmap-card glass-card">
            <h3 className="behaviour-card-title">Mouse Heatmap (Overview)</h3>
            <div className="behaviour-heatmap-grid">
              {Array.from({ length: 10 }).map((_, row) => (
                <div key={row} className="behaviour-heatmap-row">
                  {Array.from({ length: 14 }).map((_, col) => {
                    const intensity = Math.random()
                    return (
                      <div 
                        key={col} 
                        className="behaviour-heatmap-cell"
                        style={{ 
                          opacity: intensity,
                          background: intensity > 0.7 ? '#EF4444' : intensity > 0.4 ? '#F59E0B' : '#22C55E'
                        }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
            <div className="behaviour-heatmap-legend">
              <span>Low</span>
              <div className="behaviour-heatmap-gradient">
                <span style={{ background: '#22C55E' }}></span>
                <span style={{ background: '#F59E0B' }}></span>
                <span style={{ background: '#EF4444' }}></span>
              </div>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Behaviour Timeline */}
        <div className="behaviour-timeline-card glass-card">
          <h3 className="behaviour-card-title">Behaviour Timeline</h3>
          <div className="behaviour-timeline">
            {timelineEvents.map((event, index) => (
              <React.Fragment key={index}>
                <div className="behaviour-timeline-item">
                  <span className="behaviour-timeline-icon">{event.icon}</span>
                  <div className="behaviour-timeline-content">
                    <span className="behaviour-timeline-time">{event.time}</span>
                    <span className="behaviour-timeline-event">{event.event}</span>
                  </div>
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="behaviour-timeline-line"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="behaviour-insight-card glass-card">
          <div className="behaviour-insight-header">
            <span className="behaviour-insight-icon">💡</span>
            <h3 className="behaviour-insight-title">AI Insight</h3>
          </div>
          <p className="behaviour-insight-message">{aiInsight.message}</p>
          <div className="behaviour-insight-suggestion">
            <span className="behaviour-insight-suggestion-label">Suggestion:</span>
            <span className="behaviour-insight-suggestion-text">{aiInsight.suggestion}</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Behaviour