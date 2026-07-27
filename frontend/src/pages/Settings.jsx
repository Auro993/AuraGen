// frontend/src/pages/Settings.jsx

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Sidebar from '../components/Dashboard/Sidebar'
import './Settings.css'

const Settings = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('general')
  const [theme, setTheme] = useState('dark')
  const [formData, setFormData] = useState({
    organizationName: 'AuraGen Inc.',
    timeZone: 'GMT +5:30',
    language: 'English',
    dateFormat: 'DD/MM/YYYY',
  })
  const [aiPreferences, setAiPreferences] = useState({
    model: 'Gemini 2.5 Flash',
    generationMode: 'Balanced',
    autoApply: true,
    suggestImprovements: true,
    advancedAnalysis: true,
    learningMode: false,
  })
  const [notifications, setNotifications] = useState({
    frictionAlerts: true,
    newUIGenerated: true,
    uiApplied: true,
    weeklyReports: false,
    marketingUpdates: false,
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success('✨ Settings saved successfully!')
    }, 1000)
  }

  const handleReset = () => {
    toast.success('🔄 Settings reset to default!')
  }

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'ai', label: 'AI Preferences', icon: '✨' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'team', label: 'Team', icon: '👥' },
  ]

  const teamMembers = [
    { name: 'John Doe', role: 'Admin', avatar: '👤', color: '#7C5CFF' },
    { name: 'Emma Smith', role: 'Editor', avatar: '👤', color: '#22C55E' },
    { name: 'Michael Brown', role: 'Viewer', avatar: '👤', color: '#3B82F6' },
    { name: 'Sarah Wilson', role: 'Editor', avatar: '👤', color: '#F59E0B' },
  ]

  const integrations = [
    { name: 'Google Analytics', icon: '📊', status: 'Connected', connected: true },
    { name: 'Slack', icon: '💬', status: 'Connect', connected: false },
    { name: 'Webhook', icon: '🔗', status: 'Connect', connected: false },
    { name: 'Google Tag Manager', icon: '📈', status: 'Connected', connected: true },
    { name: 'Segment', icon: '📦', status: 'Connect', connected: false },
    { name: 'Mixpanel', icon: '📊', status: 'Connect', connected: false },
  ]

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <span className="settings-section-icon">⚙️</span>
        <h3 className="settings-section-title">General Settings</h3>
      </div>
      <div className="settings-form">
        <div className="settings-form-group">
          <label className="settings-label">Organization Name</label>
          <input 
            type="text" 
            className="settings-input"
            value={formData.organizationName}
            onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
            placeholder="Enter organization name"
          />
        </div>
        <div className="settings-form-row">
          <div className="settings-form-group">
            <label className="settings-label">Time Zone</label>
            <select 
              className="settings-select"
              value={formData.timeZone}
              onChange={(e) => setFormData({...formData, timeZone: e.target.value})}
            >
              <option>GMT +5:30</option>
              <option>GMT +0:00</option>
              <option>GMT -5:00</option>
              <option>GMT +8:00</option>
            </select>
          </div>
          <div className="settings-form-group">
            <label className="settings-label">Language</label>
            <select 
              className="settings-select"
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Date Format</label>
          <select 
            className="settings-select"
            value={formData.dateFormat}
            onChange={(e) => setFormData({...formData, dateFormat: e.target.value})}
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY/MM/DD</option>
          </select>
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Theme</label>
          <div className="settings-theme-grid">
            {[
              { id: 'light', icon: '☀️', label: 'Light' },
              { id: 'dark', icon: '🌙', label: 'Dark' },
              { id: 'system', icon: '💻', label: 'System' }
            ].map((t) => (
              <div 
                key={t.id}
                className={`settings-theme-card ${theme === t.id ? 'active' : ''}`}
                onClick={() => setTheme(t.id)}
              >
                <span className="settings-theme-icon">{t.icon}</span>
                <span className="settings-theme-label">{t.label}</span>
                {theme === t.id && <span className="settings-theme-check">✓</span>}
              </div>
            ))}
          </div>
        </div>
        <button 
          className={`btn-primary settings-save-btn ${isSaving ? 'saving' : ''}`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : '💾 Save Changes'}
        </button>
      </div>
    </div>
  )

  const renderAISettings = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <span className="settings-section-icon">✨</span>
        <h3 className="settings-section-title">AI Preferences</h3>
      </div>
      <div className="settings-form">
        <div className="settings-form-group">
          <label className="settings-label">AI Model</label>
          <select className="settings-select" value={aiPreferences.model}>
            <option>Gemini 2.5 Flash</option>
            <option>Gemini 2.0 Pro</option>
            <option>GPT-4o</option>
            <option>Claude 3.5</option>
          </select>
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Generation Mode</label>
          <div className="settings-mode-grid">
            {['Fast', 'Balanced', 'High Quality'].map((mode) => (
              <button 
                key={mode}
                className={`settings-mode-btn ${aiPreferences.generationMode === mode ? 'active' : ''}`}
                onClick={() => setAiPreferences({...aiPreferences, generationMode: mode})}
              >
                {mode}
                {aiPreferences.generationMode === mode && <span className="mode-check">✓</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="settings-form-group">
          <label className="settings-label">AI Features</label>
          <div className="settings-toggle-group">
            {[
              { key: 'autoApply', label: 'Auto Apply Generated UI' },
              { key: 'suggestImprovements', label: 'Suggest UI Improvements' },
              { key: 'advancedAnalysis', label: 'Enable Advanced Analysis' },
              { key: 'learningMode', label: 'Learning Mode (Experimental)' }
            ].map((item) => (
              <div key={item.key} className="settings-toggle-item">
                <span>{item.label}</span>
                <label className="settings-switch">
                  <input 
                    type="checkbox" 
                    checked={aiPreferences[item.key]}
                    onChange={(e) => setAiPreferences({...aiPreferences, [item.key]: e.target.checked})}
                  />
                  <span className="settings-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-primary settings-save-btn" onClick={handleSave}>
          💾 Save Changes
        </button>
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <span className="settings-section-icon">🔔</span>
        <h3 className="settings-section-title">Notification Preferences</h3>
      </div>
      <div className="settings-toggle-group">
        {[
          { key: 'frictionAlerts', label: 'Friction Score Alerts', desc: 'Get notified when friction is detected' },
          { key: 'newUIGenerated', label: 'New UI Generated', desc: 'When AI generates a new UI' },
          { key: 'uiApplied', label: 'UI Applied', desc: 'When a UI is successfully applied' },
          { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive weekly performance reports' },
          { key: 'marketingUpdates', label: 'Marketing Updates', desc: 'Product updates and announcements' }
        ].map((item) => (
          <div key={item.key} className="settings-toggle-item">
            <div>
              <span>{item.label}</span>
              <span className="settings-toggle-desc">{item.desc}</span>
            </div>
            <label className="settings-switch">
              <input 
                type="checkbox" 
                checked={notifications[item.key]}
                onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
              />
              <span className="settings-slider"></span>
            </label>
          </div>
        ))}
      </div>
      <button className="btn-primary settings-save-btn" onClick={handleSave}>
        💾 Save Changes
      </button>
    </div>
  )

  const renderPrivacy = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <span className="settings-section-icon">🔒</span>
        <h3 className="settings-section-title">Data & Privacy</h3>
      </div>
      <div className="settings-privacy-list">
        {[
          { label: 'Data Retention', desc: 'Keep data for 90 days' },
          { label: 'Export My Data', desc: 'Download all your data in JSON format' },
          { label: 'Delete My Data', desc: 'Permanently delete all your data' },
          { label: 'Privacy Policy', desc: 'View our privacy policy' }
        ].map((item, index) => (
          <div key={index} className="settings-privacy-item">
            <div className="settings-privacy-left">
              <span className="settings-privacy-label">{item.label}</span>
              <span className="settings-privacy-desc">{item.desc}</span>
            </div>
            <button className="settings-privacy-btn">
              {item.label === 'Delete My Data' ? 'Delete' : 'Manage'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderIntegrations = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <span className="settings-section-icon">🔗</span>
        <h3 className="settings-section-title">Integrations</h3>
      </div>
      <div className="settings-integrations-grid">
        {integrations.map((item, index) => (
          <div key={index} className="settings-integration-card">
            <div className="settings-integration-left">
              <span className="settings-integration-icon">{item.icon}</span>
              <span className="settings-integration-name">{item.name}</span>
            </div>
            <button className={`settings-integration-status ${item.connected ? 'connected' : ''}`}>
              {item.connected ? '✅ Connected' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTeam = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <span className="settings-section-icon">👥</span>
        <h3 className="settings-section-title">Team Management</h3>
      </div>
      <div className="settings-team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="settings-team-member">
            <div className="settings-team-avatar" style={{ background: member.color + '20' }}>
              {member.avatar}
            </div>
            <div className="settings-team-info">
              <span className="settings-team-name">{member.name}</span>
              <span className="settings-team-role" style={{ color: member.color }}>
                {member.role}
              </span>
            </div>
            <button className="settings-team-action">⋮</button>
          </div>
        ))}
        <div className="settings-team-add">
          <button className="settings-add-btn">+ Add Team Member</button>
        </div>
      </div>
      <div className="settings-team-controls">
        <div className="settings-form-group">
          <label className="settings-label">Default Role</label>
          <select className="settings-select">
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Default Permissions</label>
          <select className="settings-select">
            <option>Full Access</option>
            <option>Read Only</option>
            <option>Custom</option>
          </select>
        </div>
      </div>
      <button className="btn-secondary settings-manage-btn">
        Manage Team
      </button>
    </div>
  )

  const renderContent = () => {
    switch(activeTab) {
      case 'general': return renderGeneralSettings()
      case 'ai': return renderAISettings()
      case 'notifications': return renderNotifications()
      case 'privacy': return renderPrivacy()
      case 'integrations': return renderIntegrations()
      case 'team': return renderTeam()
      default: return renderGeneralSettings()
    }
  }

  return (
    <div className="settings-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="settings-main">
        {/* Header */}
        <div className="settings-header">
          <div>
            <h1 className="settings-title">⚙️ Settings</h1>
            <p className="settings-subtitle">Manage your account, preferences and application settings.</p>
          </div>
          <button className="btn-secondary reset-btn" onClick={handleReset}>
            🔄 Reset to Default
          </button>
        </div>

        {/* Tabs */}
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="settings-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default Settings