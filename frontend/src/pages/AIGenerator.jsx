import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import api from '../services/api'
import './AIGenerator.css'

const AIGenerator = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('ai')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [stats, setStats] = useState({
    totalGenerated: 0,
    successRate: 0,
    avgGenerationTime: '0 sec',
    usersImpacted: 0
  })
  const [generatedUI, setGeneratedUI] = useState(null)
  const [frictionScore, setFrictionScore] = useState(72)
  const [reasons, setReasons] = useState(['Complex form', 'Too many fields'])
  const [error, setError] = useState(null)

  // Get friction data from navigation state
  useEffect(() => {
    if (location.state?.frictionScore) {
      setFrictionScore(location.state.frictionScore)
      if (location.state.recommendation?.insight) {
        setReasons([location.state.recommendation.insight])
      }
    }
  }, [location])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await api.get('/ai/stats')
      setStats(res.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching AI stats:', error)
      setError('Failed to load stats. Using fallback data.')
      // Set fallback stats
      setStats({
        totalGenerated: 128,
        successRate: 94,
        avgGenerationTime: '2.48 sec',
        usersImpacted: 320
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateUI = async () => {
    setGenerating(true)
    setError(null)
    
    try {
      console.log('📤 Generating UI...')
      
      const payload = {
        sessionId: location.state?.sessionId || `demo-${Date.now()}`,
        frictionScore: frictionScore,
        reasons: reasons
      }
      
      console.log('📤 Payload:', payload)
      
      const res = await api.post('/ai/generate', payload)
      
      console.log('✅ Response:', res.data)
      
      if (res.data?.generatedUI) {
        setGeneratedUI(res.data.generatedUI)
        // Refresh stats after generation
        await fetchStats()
      } else {
        setError('No UI generated. Please try again.')
      }
    } catch (error) {
      console.error('❌ Error generating UI:', error)
      setError(error.response?.data?.message || 'Failed to generate UI. Using fallback data.')
      
      // Set fallback UI data
      setGeneratedUI({
        id: `fallback-${Date.now()}`,
        layout: 'Wizard',
        steps: 3,
        buttonSize: 'Large',
        recommendations: [
          'Split form into three steps',
          'Highlight required fields',
          'Reduce optional inputs',
          'Increase button size',
          'Add progress bar'
        ],
        estimatedReduction: 38,
        frictionScore: frictionScore,
        designNotes: 'Convert the long form into a conversational step-by-step wizard.',
        summary: 'Users struggle with this form due to excessive fields.'
      })
    } finally {
      setGenerating(false)
    }
  }

  const handleApplyUI = async () => {
    if (!generatedUI?.id) return
    try {
      await api.post(`/ai/apply/${generatedUI.id}`)
      navigate('/generated', { 
        state: { generatedUI: generatedUI }
      })
    } catch (error) {
      console.error('Error applying UI:', error)
    }
  }

  const kpiData = [
    { icon: '🤖', label: 'UI Generated', value: stats.totalGenerated || 128, change: '+12%', positive: true, color: '#7C5CFF' },
    { icon: '✅', label: 'Success Rate', value: `${stats.successRate || 94}%`, change: '+8%', positive: true, color: '#22C55E' },
    { icon: '⏱️', label: 'Avg Generation Time', value: stats.avgGenerationTime || '2.48 sec', change: '-0.3s', positive: true, color: '#3B82F6' },
    { icon: '👥', label: 'Users Impacted', value: stats.usersImpacted || 320, change: '+15%', positive: true, color: '#F59E0B' },
  ]

  const frictionData = [
    { label: 'Cognitive Load', value: frictionScore, max: 100, color: frictionScore > 70 ? '#EF4444' : frictionScore > 40 ? '#F59E0B' : '#22C55E' },
    { label: 'Navigation Issues', value: Math.min(Math.round(frictionScore * 0.7), 100), max: 100, color: '#F59E0B' },
    { label: 'Interaction Complexity', value: Math.min(Math.round(frictionScore * 0.5), 100), max: 100, color: '#7C5CFF' },
    { label: 'Visual Clarity', value: Math.min(Math.round(frictionScore * 0.3), 100), max: 100, color: '#22C55E' },
  ]

  const changes = generatedUI?.recommendations || [
    'Reduced Fields',
    'Step-by-Step Form',
    'Better Typography',
    'Better Button Placement',
    'Simplified Navigation',
  ]

  const impactData = [
    { label: 'Friction Reduced', value: `-${generatedUI?.estimatedReduction || 38}%`, color: '#22C55E' },
    { label: 'Task Success', value: '+27%', color: '#7C5CFF' },
    { label: 'Completion Time', value: '-32%', color: '#3B82F6' },
    { label: 'User Satisfaction', value: '+31%', color: '#F59E0B' },
  ]

  if (loading) {
    return (
      <div className="ai-page">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="ai-main">
          <div className="loading-spinner">Loading AI Generator...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="ai-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ai-main">
        <div className="ai-header">
          <div>
            <h1 className="ai-title">AI Generator</h1>
            <p className="ai-subtitle">Generate adaptive interfaces using AI.</p>
          </div>
          <div className="ai-actions">
            <button className="btn-secondary">📅 Last 7 Days</button>
            <button className="btn-primary">Export Report</button>
          </div>
        </div>

        <div className="ai-kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="ai-kpi-card glass-card" style={{ borderColor: kpi.color }}>
              <div className="ai-kpi-header">
                <span className="ai-kpi-icon">{kpi.icon}</span>
                <span className={`ai-kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>
                  {kpi.change}
                </span>
              </div>
              <span className="ai-kpi-value">{kpi.value}</span>
              <span className="ai-kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="ai-error-banner">
            <span>⚠️</span>
            <span>{error}</span>
            <button className="btn-primary" onClick={handleGenerateUI}>Retry</button>
          </div>
        )}

        <div className="ai-main-grid">
          <div className="ai-friction-card glass-card">
            <h3 className="ai-card-title">Friction Summary</h3>
            {frictionData.map((item, index) => (
              <div key={index} className="ai-friction-item">
                <div className="ai-friction-header">
                  <span className="ai-friction-label">{item.label}</span>
                  <span className="ai-friction-value">{item.value}/{item.max}</span>
                </div>
                <div className="ai-friction-bar-track">
                  <div 
                    className="ai-friction-bar-fill"
                    style={{ 
                      width: `${(item.value / item.max) * 100}%`,
                      background: item.color
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="ai-friction-total">
              <span className="ai-friction-total-label">Overall Score</span>
              <span className="ai-friction-total-value">{frictionScore}/100</span>
              <span className={`ai-friction-total-badge ${frictionScore > 70 ? 'high' : frictionScore > 40 ? 'medium' : 'low'}`}>
                {frictionScore > 70 ? '🔴 High' : frictionScore > 40 ? '🟡 Medium' : '🟢 Low'}
              </span>
            </div>
          </div>

          <div className="ai-preview-card glass-card">
            <h3 className="ai-card-title">Generated UI Preview</h3>
            <div className="ai-preview-container">
              {generating ? (
                <div className="ai-generating">
                  <div className="ai-spinner"></div>
                  <p>🤖 AI is generating optimized UI...</p>
                  <p className="ai-generating-sub">Analyzing friction data</p>
                </div>
              ) : generatedUI ? (
                <div className="ai-preview-content">
                  <div className="ai-preview-header">
                    <span className="ai-preview-badge">✨ AI Generated</span>
                    <span className="ai-preview-layout">{generatedUI.layout || 'Wizard'}</span>
                  </div>
                  <div className="ai-preview-wizard">
                    {Array.from({ length: Math.min(generatedUI.steps || 3, 4) }).map((_, i) => (
                      <div key={i} className="ai-preview-step">
                        <span className="ai-preview-step-number">{i + 1}</span>
                        <div className="ai-preview-step-content">
                          <h4>Step {i + 1}</h4>
                          <p>{generatedUI.recommendations?.[i] || `Enter your ${['name', 'email', 'details', 'review'][i]}`}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="ai-preview-next">Next →</button>
                </div>
              ) : (
                <div className="ai-preview-placeholder">
                  <span className="ai-preview-icon">🤖</span>
                  <h3>Click "Generate UI" to create AI UI</h3>
                  <p>Gemini will analyze friction and suggest improvements</p>
                </div>
              )}
            </div>
            <div className="ai-preview-actions">
              <button 
                className="btn-primary" 
                onClick={handleGenerateUI}
                disabled={generating}
              >
                {generating ? '⏳ Generating...' : '🔄 Generate UI'}
              </button>
              {generatedUI && (
                <>
                  <button className="btn-secondary">📊 Compare</button>
                  <button className="btn-success" onClick={handleApplyUI}>✅ Apply UI</button>
                </>
              )}
            </div>
          </div>

          <div className="ai-config-card glass-card">
            <h3 className="ai-card-title">AI Configuration</h3>
            <div className="ai-config-group">
              <label className="ai-config-label">Target Page</label>
              <select className="ai-config-select" value="Tax Form">
                <option>Tax Form</option>
                <option>Registration</option>
                <option>Checkout</option>
                <option>Profile</option>
              </select>
            </div>
            <div className="ai-config-group">
              <label className="ai-config-label">Goal</label>
              <select className="ai-config-select" value="Reduce Cognitive Load">
                <option>Reduce Cognitive Load</option>
                <option>Increase Conversions</option>
                <option>Simplify Navigation</option>
              </select>
            </div>
            <div className="ai-config-group">
              <label className="ai-config-label">Layout</label>
              <select className="ai-config-select" value={generatedUI?.layout || 'Wizard'}>
                <option>Wizard</option>
                <option>Grid</option>
                <option>List</option>
                <option>Cards</option>
              </select>
            </div>
            <div className="ai-config-options">
              <label className="ai-config-checkbox">
                <input type="checkbox" checked />
                <span>Reduce Form Fields</span>
              </label>
              <label className="ai-config-checkbox">
                <input type="checkbox" checked />
                <span>Improve Hierarchy</span>
              </label>
              <label className="ai-config-checkbox">
                <input type="checkbox" checked />
                <span>Progressive Disclosure</span>
              </label>
            </div>
          </div>
        </div>

        <div className="ai-bottom-grid">
          <div className="ai-reason-card glass-card">
            <h3 className="ai-card-title">Why AI Generated This</h3>
            <div className="ai-reason-item" style={{ borderColor: '#EF4444' }}>
              <span className="ai-reason-icon">⚠️</span>
              <span className="ai-reason-text">High Friction Score: {frictionScore}/100</span>
            </div>
            {reasons.map((reason, index) => (
              <div key={index} className="ai-reason-item" style={{ borderColor: '#F59E0B' }}>
                <span className="ai-reason-icon">⚠️</span>
                <span className="ai-reason-text">{reason}</span>
              </div>
            ))}
            <div className="ai-recommendation">
              <span className="ai-recommendation-icon">💡</span>
              <span className="ai-recommendation-text">{generatedUI?.designNotes || 'Use Wizard Layout'}</span>
            </div>
          </div>

          <div className="ai-changes-card glass-card">
            <h3 className="ai-card-title">Changes Implemented</h3>
            {changes.map((change, index) => (
              <div key={index} className="ai-change-item">
                <span className="ai-change-icon">✔</span>
                <span className="ai-change-text">{change}</span>
              </div>
            ))}
          </div>

          <div className="ai-impact-card glass-card">
            <h3 className="ai-card-title">Estimated Impact</h3>
            <div className="ai-impact-grid">
              {impactData.map((item, index) => (
                <div key={index} className="ai-impact-item">
                  <span className="ai-impact-value" style={{ color: item.color }}>{item.value}</span>
                  <span className="ai-impact-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ai-status-card glass-card">
          <div className="ai-status-content">
            <div className="ai-status-left">
              <span className="ai-status-icon">🧠</span>
              <div className="ai-status-info">
                <h4 className="ai-status-title">AuraGen Adaptive Engine</h4>
                <span className="ai-status-subtitle">AI Model: Gemini 2.5 Flash</span>
              </div>
            </div>
            <div className="ai-status-right">
              <div className="ai-status-item">
                <span className="ai-status-label">Status</span>
                <span className="ai-status-value running">🟢 Running</span>
              </div>
              <div className="ai-status-item">
                <span className="ai-status-label">Model</span>
                <span className="ai-status-value">Gemini</span>
              </div>
              <div className="ai-status-item">
                <span className="ai-status-label">Last Generation</span>
                <span className="ai-status-value">{stats.avgGenerationTime || '2.48 sec'}</span>
              </div>
              <div className="ai-status-item">
                <span className="ai-status-label">Confidence</span>
                <span className="ai-status-value">{stats.successRate || 94}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AIGenerator