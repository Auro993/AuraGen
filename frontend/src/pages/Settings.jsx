import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import toast from 'react-hot-toast'
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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }

  const handleReset = () => {
    toast.success('Settings reset to default!')
  }

  const tabs = [
    { id: 'general', label: '⚙ General' },
    { id: 'ai', label: '✨ AI Preferences' },
    { id: 'notifications', label: '🔔 Notifications' },
    { id: 'privacy', label: '🔒 Data & Privacy' },
    { id: 'integrations', label: '🔗 Integrations' },
    { id: 'team', label: '👥 Team' },
  ]

  const teamMembers = [
    { name: 'John Doe', role: 'Admin', avatar: '👤' },
    { name: 'Emma Smith', role: 'Editor', avatar: '👤' },
    { name: 'Michael Brown', role: 'Viewer', avatar: '👤' },
    { name: 'Sarah Wilson', role: 'Editor', avatar: '👤' },
    { name: 'David Lee', role: 'Admin', avatar: '👤' },
  ]

  return (
    <div className="settings-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="settings-main">
        {/* Header */}
        <div className="settings-header">
          <div>
            <h1 className="settings-title">⚙ Settings</h1>
            <p className="settings-subtitle">Manage your account, preferences and application settings.</p>
          </div>
          <button className="btn-secondary" onClick={handleReset}>
            Reset to Default
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
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="settings-general glass-card">
              <h3 className="settings-section-title">General Settings</h3>
              <div className="settings-form">
                <div className="settings-form-group">
                  <label className="settings-label">Organization Name</label>
                  <input 
                    type="text" 
                    className="settings-input"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                  />
                </div>
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
                  <label className="settings-label">Theme Selection</label>
                  <div className="settings-theme-grid">
                    <div 
                      className={`settings-theme-card ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => setTheme('light')}
                    >
                      <span className="settings-theme-icon">☀</span>
                      <span className="settings-theme-label">Light</span>
                    </div>
                    <div 
                      className={`settings-theme-card ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => setTheme('dark')}
                    >
                      <span className="settings-theme-icon">🌙</span>
                      <span className="settings-theme-label">Dark</span>
                    </div>
                    <div 
                      className={`settings-theme-card ${theme === 'system' ? 'active' : ''}`}
                      onClick={() => setTheme('system')}
                    >
                      <span className="settings-theme-icon">💻</span>
                      <span className="settings-theme-label">System</span>
                    </div>
                  </div>
                </div>
                <button className="btn-primary settings-save" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* AI Preferences */}
          {activeTab === 'ai' && (
            <div className="settings-ai glass-card">
              <h3 className="settings-section-title">AI Preferences</h3>
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
                    <button 
                      className={`settings-mode-btn ${aiPreferences.generationMode === 'Fast' ? 'active' : ''}`}
                      onClick={() => setAiPreferences({...aiPreferences, generationMode: 'Fast'})}
                    >
                      Fast
                    </button>
                    <button 
                      className={`settings-mode-btn ${aiPreferences.generationMode === 'Balanced' ? 'active' : ''}`}
                      onClick={() => setAiPreferences({...aiPreferences, generationMode: 'Balanced'})}
                    >
                      Balanced
                    </button>
                    <button 
                      className={`settings-mode-btn ${aiPreferences.generationMode === 'High Quality' ? 'active' : ''}`}
                      onClick={() => setAiPreferences({...aiPreferences, generationMode: 'High Quality'})}
                    >
                      High Quality
                    </button>
                  </div>
                </div>
                <div className="settings-form-group">
                  <div className="settings-toggle-group">
                    <div className="settings-toggle-item">
                      <span>Auto Apply Generated UI</span>
                      <label className="settings-switch">
                        <input 
                          type="checkbox" 
                          checked={aiPreferences.autoApply}
                          onChange={(e) => setAiPreferences({...aiPreferences, autoApply: e.target.checked})}
                        />
                        <span className="settings-slider"></span>
                      </label>
                    </div>
                    <div className="settings-toggle-item">
                      <span>Suggest UI Improvements</span>
                      <label className="settings-switch">
                        <input 
                          type="checkbox" 
                          checked={aiPreferences.suggestImprovements}
                          onChange={(e) => setAiPreferences({...aiPreferences, suggestImprovements: e.target.checked})}
                        />
                        <span className="settings-slider"></span>
                      </label>
                    </div>
                    <div className="settings-toggle-item">
                      <span>Enable Advanced Analysis</span>
                      <label className="settings-switch">
                        <input 
                          type="checkbox" 
                          checked={aiPreferences.advancedAnalysis}
                          onChange={(e) => setAiPreferences({...aiPreferences, advancedAnalysis: e.target.checked})}
                        />
                        <span className="settings-slider"></span>
                      </label>
                    </div>
                    <div className="settings-toggle-item">
                      <span>Learning Mode</span>
                      <label className="settings-switch">
                        <input 
                          type="checkbox" 
                          checked={aiPreferences.learningMode}
                          onChange={(e) => setAiPreferences({...aiPreferences, learningMode: e.target.checked})}
                        />
                        <span className="settings-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <button className="btn-primary settings-save" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="settings-notifications glass-card">
              <h3 className="settings-section-title">Notification Settings</h3>
              <div className="settings-toggle-group">
                <div className="settings-toggle-item">
                  <span>🔔 Friction Score Alerts</span>
                  <label className="settings-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.frictionAlerts}
                      onChange={(e) => setNotifications({...notifications, frictionAlerts: e.target.checked})}
                    />
                    <span className="settings-slider"></span>
                  </label>
                </div>
                <div className="settings-toggle-item">
                  <span>🔔 New UI Generated</span>
                  <label className="settings-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.newUIGenerated}
                      onChange={(e) => setNotifications({...notifications, newUIGenerated: e.target.checked})}
                    />
                    <span className="settings-slider"></span>
                  </label>
                </div>
                <div className="settings-toggle-item">
                  <span>🔔 UI Applied</span>
                  <label className="settings-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.uiApplied}
                      onChange={(e) => setNotifications({...notifications, uiApplied: e.target.checked})}
                    />
                    <span className="settings-slider"></span>
                  </label>
                </div>
                <div className="settings-toggle-item">
                  <span>📊 Weekly Reports</span>
                  <label className="settings-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.weeklyReports}
                      onChange={(e) => setNotifications({...notifications, weeklyReports: e.target.checked})}
                    />
                    <span className="settings-slider"></span>
                  </label>
                </div>
                <div className="settings-toggle-item">
                  <span>📧 Marketing Updates</span>
                  <label className="settings-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.marketingUpdates}
                      onChange={(e) => setNotifications({...notifications, marketingUpdates: e.target.checked})}
                    />
                    <span className="settings-slider"></span>
                  </label>
                </div>
              </div>
              <button className="btn-primary settings-save" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}

          {/* Data & Privacy */}
          {activeTab === 'privacy' && (
            <div className="settings-privacy glass-card">
              <h3 className="settings-section-title">Data & Privacy</h3>
              <div className="settings-privacy-list">
                <div className="settings-privacy-item">
                  <div>
                    <span className="settings-privacy-label">Data Retention</span>
                    <span className="settings-privacy-desc">Keep data for 90 days</span>
                  </div>
                  <button className="settings-privacy-arrow">›</button>
                </div>
                <div className="settings-privacy-item">
                  <div>
                    <span className="settings-privacy-label">Export My Data</span>
                    <span className="settings-privacy-desc">Download all your data</span>
                  </div>
                  <button className="settings-privacy-arrow">›</button>
                </div>
                <div className="settings-privacy-item">
                  <div>
                    <span className="settings-privacy-label">Delete My Data</span>
                    <span className="settings-privacy-desc">Permanently delete your data</span>
                  </div>
                  <button className="settings-privacy-arrow">›</button>
                </div>
                <div className="settings-privacy-item">
                  <div>
                    <span className="settings-privacy-label">Privacy Policy</span>
                    <span className="settings-privacy-desc">View our privacy policy</span>
                  </div>
                  <button className="settings-privacy-arrow">›</button>
                </div>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <div className="settings-integrations glass-card">
              <h3 className="settings-section-title">Integrations</h3>
              <div className="settings-integrations-grid">
                <div className="settings-integration-card">
                  <div className="settings-integration-header">
                    <span className="settings-integration-icon">📊</span>
                    <span className="settings-integration-name">Google Analytics</span>
                  </div>
                  <span className="settings-integration-status connected">Connected</span>
                </div>
                <div className="settings-integration-card">
                  <div className="settings-integration-header">
                    <span className="settings-integration-icon">💬</span>
                    <span className="settings-integration-name">Slack</span>
                  </div>
                  <span className="settings-integration-status">Connect</span>
                </div>
                <div className="settings-integration-card">
                  <div className="settings-integration-header">
                    <span className="settings-integration-icon">🔗</span>
                    <span className="settings-integration-name">Webhook</span>
                  </div>
                  <span className="settings-integration-status">Connect</span>
                </div>
                <div className="settings-integration-card">
                  <div className="settings-integration-header">
                    <span className="settings-integration-icon">📈</span>
                    <span className="settings-integration-name">Google Tag Manager</span>
                  </div>
                  <span className="settings-integration-status connected">Connected</span>
                </div>
              </div>
            </div>
          )}

          {/* Team Settings */}
          {activeTab === 'team' && (
            <div className="settings-team glass-card">
              <h3 className="settings-section-title">Team Settings</h3>
              <div className="settings-team-avatars">
                {teamMembers.map((member, index) => (
                  <div key={index} className="settings-team-avatar">
                    <span>{member.avatar}</span>
                    <span className="settings-team-name">{member.name}</span>
                    <span className="settings-team-role">{member.role}</span>
                  </div>
                ))}
                <div className="settings-team-add">+5</div>
              </div>
              <div className="settings-team-controls">
                <div className="settings-form-group">
                  <label className="settings-label">Role</label>
                  <select className="settings-select">
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                </div>
                <div className="settings-form-group">
                  <label className="settings-label">Permissions</label>
                  <select className="settings-select">
                    <option>Full Access</option>
                    <option>Read Only</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
              <button className="btn-primary settings-manage-team">
                Manage Team
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Settings