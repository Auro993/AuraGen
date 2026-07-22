import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import api from '../services/api'
import './GeneratedUI.css'

const GeneratedUI = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('generated')
  const [loading, setLoading] = useState(true)
  const [generatedUI, setGeneratedUI] = useState(null)
  const [stats, setStats] = useState({
    totalGenerated: 35,
    applied: 12,
    successRate: 94,
    avgFrictionReduction: 38,
    userSatisfaction: 92
  })
  const [allGenerated, setAllGenerated] = useState([])
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (location.state?.generatedUI) {
      setGeneratedUI(location.state.generatedUI)
      setLoading(false)
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      const statsRes = await api.get('/generated-ui/stats')
      setStats(statsRes.data)

      const latestRes = await api.get('/generated-ui/latest')
      setGeneratedUI(latestRes.data)

      const allRes = await api.get('/generated-ui')
      setAllGenerated(allRes.data.generatedUIs || [])

    } catch (error) {
      console.error('Error fetching generated UI data:', error)
      setStats({
        totalGenerated: 35,
        applied: 12,
        successRate: 94,
        avgFrictionReduction: 38,
        userSatisfaction: 92
      })
      setGeneratedUI({
        id: 'fallback-001',
        page: 'Tax Form',
        originalScore: 72,
        optimizedScore: 38,
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
        removedFields: 5,
        estimatedImpact: {
          taskSuccess: 27,
          completionTime: -32,
          errorRate: -41,
          satisfaction: 31,
          frictionReduced: 38
        },
        reasons: ['Too many fields', 'Long idle time', 'Wrong clicks'],
        model: 'Gemini 2.5 Flash',
        generationTime: '2.48 sec',
        confidence: 67,
        status: 'generated',
        designNotes: 'Convert the long form into a conversational step-by-step wizard.',
        summary: 'Users struggle with this form due to excessive fields.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApplyUI = async () => {
    if (!generatedUI?.id) return
    try {
      await api.post(`/generated-ui/apply/${generatedUI.id}`)
      setGeneratedUI({ ...generatedUI, status: 'applied' })
      fetchData()
    } catch (error) {
      console.error('Error applying UI:', error)
    }
  }

  const handleInputChange = (step, value) => {
    setFormData({ ...formData, [step]: value })
  }

  const statCards = [
    { label: 'Generated UIs', value: stats.totalGenerated || 35, icon: '✨', color: '#7C5CFF' },
    { label: 'Applied UIs', value: stats.applied || 12, icon: '📥', color: '#22C55E' },
    { label: 'User Satisfaction', value: `${stats.userSatisfaction || 92}%`, icon: '😊', color: '#3B82F6' },
    { label: 'Friction Reduced', value: `${stats.avgFrictionReduction || 38}%`, icon: '📉', color: '#F59E0B' },
  ]

  const originalIssues = generatedUI?.reasons || [
    'Too many fields',
    'Long scrolling',
    'High Cognitive Load',
    'No hierarchy',
    'Confusing buttons'
  ]

  const aiImprovements = generatedUI?.recommendations || [
    'Reduced Fields',
    'Better Layout',
    'Better Hierarchy',
    'Better Readability',
    'Less Scrolling'
  ]

  const changes = generatedUI?.recommendations || [
    'Reduced Fields',
    'Added Progress Bar',
    'Simplified Layout',
    'Better Typography',
    'Better Contrast',
    'Responsive'
  ]

  const impactData = [
    { label: 'Task Success', value: `+${generatedUI?.estimatedImpact?.taskSuccess || 27}%`, color: '#22C55E' },
    { label: 'Completion Time', value: `${generatedUI?.estimatedImpact?.completionTime || -32}%`, color: '#3B82F6' },
    { label: 'Error Rate', value: `${generatedUI?.estimatedImpact?.errorRate || -41}%`, color: '#EF4444' },
    { label: 'Satisfaction', value: `+${generatedUI?.estimatedImpact?.satisfaction || 31}%`, color: '#7C5CFF' },
  ]

  const wizardFields = [
    { label: 'Name', placeholder: 'Enter your full name' },
    { label: 'Email', placeholder: 'Enter your email address' },
    { label: 'Phone', placeholder: 'Enter your phone number' },
    { label: 'PAN', placeholder: 'Enter your PAN number' },
    { label: 'Income', placeholder: 'Enter your annual income' }
  ]

  const recentData = allGenerated.slice(0, 5).map(item => ({
    id: item._id?.slice(-6) || 'UI001',
    page: item.page || 'Tax Form',
    before: item.originalScore || 72,
    after: item.optimizedScore || 38,
    status: item.status || 'Generated'
  }))

  if (recentData.length === 0) {
    recentData.push(
      { id: 'UI035', page: 'Tax Form', before: 72, after: 38, status: 'Applied' },
      { id: 'UI034', page: 'Registration', before: 85, after: 28, status: 'Applied' },
      { id: 'UI033', page: 'Checkout', before: 68, after: 35, status: 'Pending' },
      { id: 'UI032', page: 'Dashboard', before: 54, after: 24, status: 'Applied' },
      { id: 'UI031', page: 'Profile Setup', before: 78, after: 30, status: 'Pending' }
    )
  }

  if (loading) {
    return (
      <div className="generated-page">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="generated-main">
          <div className="loading-spinner">Loading Generated UI...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="generated-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="generated-main">
        {/* Header */}
        <div className="generated-header">
          <div>
            <h1 className="generated-title">Generated UI</h1>
            <p className="generated-subtitle">View and manage AI-generated user interfaces.</p>
          </div>
          <button className="btn-primary generated-generate-btn" onClick={() => navigate('/ai')}>
            ✨ Generate New UI
          </button>
        </div>

        {/* KPI Cards */}
        <div className="generated-kpi-grid">
          {statCards.map((stat, index) => (
            <div key={index} className="generated-kpi-card glass-card" style={{ borderColor: stat.color }}>
              <div className="generated-kpi-header">
                <span className="generated-kpi-icon">{stat.icon}</span>
              </div>
              <span className="generated-kpi-value">{stat.value}</span>
              <span className="generated-kpi-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Split Comparison */}
        <div className="generated-compare">
          {/* Original UI - Left */}
          <div className="generated-original glass-card">
            <h3 className="generated-compare-title">Original UI</h3>
            <div className="generated-compare-content">
              <div className="generated-form-mockup">
                <div className="generated-form-field">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" disabled />
                </div>
                <div className="generated-form-field">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" disabled />
                </div>
                <div className="generated-form-field">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="Enter your phone" disabled />
                </div>
                <div className="generated-form-field">
                  <label>PAN Number</label>
                  <input type="text" placeholder="Enter PAN" disabled />
                </div>
                <div className="generated-form-field">
                  <label>Annual Income</label>
                  <input type="text" placeholder="Enter income" disabled />
                </div>
                <div className="generated-form-field">
                  <label>Investments</label>
                  <input type="text" placeholder="Enter investments" disabled />
                </div>
                <button className="generated-form-submit" disabled>Submit</button>
              </div>
              <div className="generated-compare-bottom">
                <div className="generated-issues">
                  <span className="generated-issues-title">Issues</span>
                  {originalIssues.map((issue, index) => (
                    <div key={index} className="generated-issue-item">❌ {issue}</div>
                  ))}
                </div>
                <div className="generated-friction-score">
                  <span className="generated-friction-label">Friction Score</span>
                  <span className="generated-friction-value high">{generatedUI?.originalScore || 72}/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="generated-arrow">
            <span className="generated-arrow-icon">➡</span>
          </div>

          {/* AI Generated UI - Right */}
          <div className="generated-ai glass-card">
            <h3 className="generated-compare-title">AI Generated UI</h3>
            <div className="generated-compare-content">
              <div className="generated-wizard-mockup">
                <div className="generated-wizard-badge">
                  <span className="generated-wizard-layout">{generatedUI?.layout || 'Wizard'}</span>
                  <span className="generated-wizard-steps">{generatedUI?.steps || 3} Steps</span>
                  <span className="generated-wizard-fields">-{generatedUI?.removedFields || 5} Fields</span>
                </div>
                
                {Array.from({ length: Math.min(generatedUI?.steps || 3, 3) }).map((_, i) => (
                  <div key={i} className="generated-wizard-step">
                    <span className="generated-wizard-number">{i + 1}</span>
                    <div className="generated-wizard-content">
                      <h4>Step {i + 1}</h4>
                      <p>{generatedUI?.recommendations?.[i] || `Enter your ${['name', 'email', 'details'][i]}`}</p>
                      <input 
                        type="text" 
                        placeholder={wizardFields[i]?.placeholder || `Enter ${['name', 'email', 'details'][i]}`}
                        className="generated-wizard-input"
                        value={formData[`step${i + 1}`] || ''}
                        onChange={(e) => handleInputChange(`step${i + 1}`, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="generated-wizard-progress">
                  <span>Progress</span>
                  <div className="generated-progress-bar">
                    <div className="generated-progress-fill" style={{ width: '33%' }}></div>
                  </div>
                </div>
                <button className="generated-wizard-next">Continue →</button>
              </div>
              <div className="generated-compare-bottom">
                <div className="generated-improvements">
                  <span className="generated-improvements-title">Improvements</span>
                  {aiImprovements.slice(0, 5).map((improvement, index) => (
                    <div key={index} className="generated-improvement-item">✅ {improvement}</div>
                  ))}
                </div>
                <div className="generated-friction-score">
                  <span className="generated-friction-label">Friction Score</span>
                  <span className="generated-friction-value low">{generatedUI?.optimizedScore || 38}/100</span>
                  <span className="generated-friction-badge low">↓ Reduced</span>
                </div>
              </div>
            </div>
            <div className="generated-apply-section">
              {generatedUI?.status === 'applied' ? (
                <span className="generated-applied-badge">✅ Applied</span>
              ) : (
                <button className="btn-primary generated-apply-btn" onClick={handleApplyUI}>
                  ✅ Apply UI
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Grid: Generation Details, Changes, Impact */}
        <div className="generated-bottom-grid">
          <div className="generated-details-card glass-card">
            <h3 className="generated-card-title">Generation Details</h3>
            <div className="generated-details-grid">
              <div className="generated-detail-item">
                <span className="generated-detail-label">Generated On</span>
                <span className="generated-detail-value">
                  {generatedUI?.createdAt ? new Date(generatedUI.createdAt).toLocaleDateString() : 'May 16, 2026'}
                </span>
              </div>
              <div className="generated-detail-item">
                <span className="generated-detail-label">Target Page</span>
                <span className="generated-detail-value">{generatedUI?.page || 'Tax Form'}</span>
              </div>
              <div className="generated-detail-item">
                <span className="generated-detail-label">AI Model</span>
                <span className="generated-detail-value">{generatedUI?.model || 'Gemini 2.5 Flash'}</span>
              </div>
              <div className="generated-detail-item">
                <span className="generated-detail-label">Generation Time</span>
                <span className="generated-detail-value">{generatedUI?.generationTime || '2.48 sec'}</span>
              </div>
              <div className="generated-detail-item">
                <span className="generated-detail-label">Reason</span>
                <span className="generated-detail-value">{generatedUI?.reasons?.[0] || 'High Cognitive Load'}</span>
              </div>
              <div className="generated-detail-item">
                <span className="generated-detail-label">Confidence</span>
                <span className="generated-detail-value">{generatedUI?.confidence || 67}%</span>
              </div>
            </div>
          </div>

          <div className="generated-changes-card glass-card">
            <h3 className="generated-card-title">Changes Implemented</h3>
            {changes.slice(0, 6).map((change, index) => (
              <div key={index} className="generated-change-item">
                <span className="generated-change-icon">✔</span>
                <span className="generated-change-text">{change}</span>
              </div>
            ))}
          </div>

          <div className="generated-impact-card glass-card">
            <h3 className="generated-card-title">Estimated Impact</h3>
            <div className="generated-impact-grid">
              {impactData.map((item, index) => (
                <div key={index} className="generated-impact-item">
                  <span className="generated-impact-value" style={{ color: item.color }}>{item.value}</span>
                  <span className="generated-impact-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Generated UI Table */}
        <div className="generated-table-card glass-card">
          <h3 className="generated-card-title">Recent Generated UI</h3>
          <table className="generated-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Page</th>
                <th>Generated On</th>
                <th>Before</th>
                <th>After</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentData.map((item, index) => (
                <tr key={index}>
                  <td className="generated-table-id">{item.id}</td>
                  <td>{item.page}</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td>
                    <span className="generated-table-badge high">{item.before}</span>
                  </td>
                  <td>
                    <span className="generated-table-badge low">{item.after}</span>
                  </td>
                  <td>
                    <span className={`generated-table-status ${item.status === 'Applied' ? 'applied' : 'pending'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="generated-table-action">👁</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default GeneratedUI