import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import Topbar from '../components/Dashboard/Topbar'
import StatCard from '../components/Dashboard/StatCard'
import FrictionChart from '../components/Dashboard/FrictionChart'
import HeatMap from '../components/Dashboard/HeatMap'
import AIStatus from '../components/Dashboard/AIStatus'
import SessionTable from '../components/Dashboard/SessionTable'
import Timeline from '../components/Dashboard/Timeline'
import Logs from '../components/Dashboard/Logs'
import '../components/Dashboard/Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [frictionScore, setFrictionScore] = useState(72.4)

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  // Simulate live friction updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newScore = (Math.random() * 40 + 50).toFixed(1)
      setFrictionScore(parseFloat(newScore))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Stats data
  const stats = [
    { 
      icon: '👤', 
      label: 'Active Users', 
      value: '1,248', 
      change: '+12%', 
      positive: true 
    },
    { 
      icon: '📊', 
      label: 'Avg. Friction Score', 
      value: `${frictionScore}%`, 
      change: '+8.5%', 
      positive: false 
    },
    { 
      icon: '🎨', 
      label: 'Generated UIs', 
      value: '320', 
      change: '+10.5%', 
      positive: true 
    },
    { 
      icon: '✅', 
      label: 'Success Rate', 
      value: '89.6%', 
      change: '+10%', 
      positive: true 
    }
  ]

  // Updated chart data for Chart.js
  const chartData = {
    labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
    values: [65, 82, 68, 61, 86, 66, 71]
  }

  const heatmapData = [
    { intensity: 0.8 }, { intensity: 0.6 }, { intensity: 0.4 }, { intensity: 0.2 },
    { intensity: 0.9 }, { intensity: 0.7 }, { intensity: 0.5 }, { intensity: 0.3 },
    { intensity: 0.6 }, { intensity: 0.8 }, { intensity: 0.9 }, { intensity: 0.7 },
    { intensity: 0.3 }, { intensity: 0.5 }, { intensity: 0.7 }, { intensity: 0.9 },
  ]

  const sessions = [
    { id: '#5-0012', user: 'John Doe', friction: '85%', status: 'High', generated: 'Wizard Form' },
    { id: '#5-0013', user: 'Emma Smith', friction: '45%', status: 'Medium', generated: 'Small Form' },
    { id: '#5-0014', user: 'Michael Brown', friction: '87%', status: 'High', generated: 'Top 1% Form' },
    { id: '#5-0015', user: 'Sarah Wilson', friction: '37%', status: 'Low', generated: 'Search Form' },
    { id: '#5-0016', user: 'David Lee', friction: '77%', status: 'High', generated: 'Wizard Form' },
  ]

  const timelineEvents = [
    { time: '10:01', event: 'User Started Session', color: '#7C5CFF' },
    { time: '10:03', event: 'High Friction Detected', color: '#EF4444' },
    { time: '10:05', event: 'AI Generation Triggered', color: '#22C55E' },
    { time: '10:06', event: 'New UI Generated', color: '#4F8CFF' },
    { time: '10:07', event: 'User Completed Form', color: '#F59E0B' },
  ]

  const logs = [
    { time: '10:01:23', message: 'User session started - ID: #5-0012', type: 'info' },
    { time: '10:03:45', message: 'Friction score detected: 72.4%', type: 'warning' },
    { time: '10:05:12', message: 'AI generation triggered for user #5-0012', type: 'success' },
    { time: '10:06:34', message: 'New UI generated: Wizard Form', type: 'success' },
    { time: '10:07:01', message: 'User completed form successfully', type: 'info' },
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Dashboard Header */}
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">Real-time analytics and user insights</p>
              </div>
              <div className="dashboard-actions">
                <button className="btn-secondary">Export</button>
                <button className="btn-primary">Refresh</button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Charts Row - Pass chartData correctly */}
            <div className="dashboard-two-col">
              <FrictionChart data={chartData} />
              <HeatMap data={heatmapData} />
            </div>

            {/* AI Status */}
            <AIStatus />

            {/* Session Table */}
            <SessionTable sessions={sessions} />

            {/* Bottom Grid - Timeline & Logs */}
            <div className="dashboard-bottom-grid">
              <Timeline events={timelineEvents} />
              <Logs logs={logs} />
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
              <span>AuraGen v1.0</span>
              <span>© 2026 AuraGen. All rights reserved.</span>
            </footer>
          </>
        )
      default:
        return (
          <div className="dashboard-header">
            <h1 className="dashboard-title">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="dashboard-subtitle">Content coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <main className="dashboard-main">
        <Topbar />
        {renderContent()}
      </main>
    </div>
  )
}

export default Dashboard