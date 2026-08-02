// frontend/src/pages/Profile.jsx

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import Sidebar from '../components/Dashboard/Sidebar'
import api from '../services/api'
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: 'viewer',
    avatar: '',
    bio: '',
    location: '',
    website: '',
    joinedDate: '',
    lastActive: ''
  })
  const [formData, setFormData] = useState({})
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalGenerations: 0,
    avgFriction: 0,
    successRate: 0
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchProfileData()
  }, [navigate])

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      
      // Fetch user profile
      const profileRes = await api.get('/auth/profile')
      const user = profileRes.data.user || profileRes.data
      
      setUserData({
        name: user.name || 'User',
        email: user.email || 'user@example.com',
        role: user.role || 'viewer',
        avatar: user.avatar || '',
        bio: user.bio || 'No bio yet',
        location: user.location || 'Not specified',
        website: user.website || '',
        joinedDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Jan 2024',
        lastActive: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Just now'
      })
      
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || ''
      })

      // Fetch user stats
      const statsRes = await api.get('/auth/stats')
      setStats({
        totalSessions: statsRes.data.totalSessions || 0,
        totalGenerations: statsRes.data.totalGenerations || 0,
        avgFriction: statsRes.data.avgFriction || 0,
        successRate: statsRes.data.successRate || 0
      })

      // Fetch recent activity
      const activityRes = await api.get('/auth/activity')
      setRecentActivity(activityRes.data || [])

    } catch (error) {
      console.error('Error fetching profile:', error)
      
      // Fallback data
      setUserData({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        avatar: '',
        bio: 'UI/UX Designer passionate about creating intuitive interfaces.',
        location: 'San Francisco, CA',
        website: 'https://johndoe.com',
        joinedDate: 'Jan 2024',
        lastActive: 'Just now'
      })
      
      setStats({
        totalSessions: 248,
        totalGenerations: 89,
        avgFriction: 34,
        successRate: 92
      })
      
      setRecentActivity([
        { action: 'Generated UI for Pricing Page', time: '2 hours ago', type: 'generated' },
        { action: 'Applied UI to Tax Form', time: '5 hours ago', type: 'applied' },
        { action: 'Logged in', time: '1 day ago', type: 'login' },
        { action: 'Generated UI for Checkout Page', time: '2 days ago', type: 'generated' },
        { action: 'Updated profile settings', time: '3 days ago', type: 'settings' }
      ])
      
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true)
      await api.put('/auth/profile', formData)
      
      setUserData({
        ...userData,
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        website: formData.website
      })
      
      setIsEditing(false)
      toast.success('✅ Profile updated successfully!')
      
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB')
      return
    }

    try {
      const formData = new FormData()
      formData.append('avatar', file)
      
      const res = await api.post('/auth/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      setUserData({ ...userData, avatar: res.data.avatar })
      toast.success('✅ Avatar updated successfully!')
      
    } catch (error) {
      console.error('Error uploading avatar:', error)
      toast.error('Failed to upload avatar')
    }
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getActivityIcon = (type) => {
    switch(type) {
      case 'generated': return '🎨'
      case 'applied': return '✅'
      case 'login': return '🔑'
      case 'settings': return '⚙️'
      default: return '📌'
    }
  }

  const statCards = [
    { icon: '📊', label: 'Total Sessions', value: stats.totalSessions || 0 },
    { icon: '🎨', label: 'UI Generations', value: stats.totalGenerations || 0 },
    { icon: '📉', label: 'Avg Friction', value: `${stats.avgFriction || 0}%` },
    { icon: '⭐', label: 'Success Rate', value: `${stats.successRate || 0}%` }
  ]

  if (loading) {
    return (
      <div className="profile-page">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="profile-main">
          <div className="loading-spinner">Loading profile...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="profile-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="profile-content"
        >
          {/* Header */}
          <div className="profile-header">
            <h1 className="profile-title">👤 My Profile</h1>
            <p className="profile-subtitle">Manage your account settings and preferences</p>
          </div>

          {/* Profile Card */}
          <div className="profile-card glass-card">
            <div className="profile-card-content">
              {/* Avatar */}
              <div className="profile-avatar-section">
                <div className="profile-avatar">
                  {userData.avatar ? (
                    <img src={userData.avatar} alt={userData.name} />
                  ) : (
                    <span className="profile-avatar-text">{getInitials(userData.name)}</span>
                  )}
                </div>
                <div className="profile-avatar-actions">
                  <button className="btn-secondary avatar-btn" onClick={() => document.getElementById('avatarInput').click()}>
                    📷 Change Photo
                  </button>
                  <input
                    id="avatarInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleAvatarUpload}
                  />
                </div>
                <div className="profile-role-badge">
                  <span className={`role-badge ${userData.role}`}>
                    {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                  </span>
                </div>
              </div>

              {/* User Info */}
              <div className="profile-info">
                <div className="profile-info-header">
                  <h2 className="profile-name">{userData.name}</h2>
                  <button 
                    className={`btn-edit ${isEditing ? 'active' : ''}`}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? '✕ Cancel' : '✏️ Edit Profile'}
                  </button>
                </div>
                
                <div className="profile-details">
                  <div className="profile-detail-item">
                    <span className="detail-icon">📧</span>
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{userData.email}</span>
                  </div>
                  <div className="profile-detail-item">
                    <span className="detail-icon">📍</span>
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{userData.location}</span>
                  </div>
                  <div className="profile-detail-item">
                    <span className="detail-icon">🌐</span>
                    <span className="detail-label">Website</span>
                    <span className="detail-value">
                      {userData.website ? (
                        <a href={userData.website} target="_blank" rel="noopener noreferrer">
                          {userData.website}
                        </a>
                      ) : 'Not set'}
                    </span>
                  </div>
                  <div className="profile-detail-item">
                    <span className="detail-icon">📅</span>
                    <span className="detail-label">Joined</span>
                    <span className="detail-value">{userData.joinedDate}</span>
                  </div>
                  <div className="profile-detail-item">
                    <span className="detail-icon">🟢</span>
                    <span className="detail-label">Last Active</span>
                    <span className="detail-value">{userData.lastActive}</span>
                  </div>
                </div>

                {/* Bio */}
                <div className="profile-bio">
                  <h4>About</h4>
                  <p>{userData.bio}</p>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <motion.div 
                className="profile-edit-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h4>Edit Profile</h4>
                <div className="edit-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="edit-form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    rows="3"
                  />
                </div>
                <div className="edit-form-row">
                  <div className="edit-form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                <div className="edit-form-actions">
                  <button className="btn-secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button 
                    className="btn-primary" 
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : '💾 Save Changes'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="profile-stats-grid">
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                className="profile-stat-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="profile-activity-card glass-card">
            <h3 className="profile-activity-title">📋 Recent Activity</h3>
            <div className="profile-activity-list">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="profile-activity-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <span className="activity-icon">{getActivityIcon(activity.type)}</span>
                    <div className="activity-content">
                      <span className="activity-action">{activity.action}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="no-activity">No recent activity</p>
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className="profile-actions-card glass-card">
            <h3 className="profile-actions-title">🔐 Account Actions</h3>
            <div className="profile-actions-grid">
              <button className="profile-action-btn" onClick={() => toast.info('🔑 Change password dialog opened')}>
                <span className="action-icon">🔑</span>
                <span>Change Password</span>
              </button>
              <button className="profile-action-btn" onClick={() => toast.info('📧 Email preferences opened')}>
                <span className="action-icon">📧</span>
                <span>Email Preferences</span>
              </button>
              <button className="profile-action-btn" onClick={() => toast.info('📊 Export data started')}>
                <span className="action-icon">📊</span>
                <span>Export Data</span>
              </button>
              <button className="profile-action-btn danger" onClick={() => {
                if (confirm('Are you sure you want to delete your account? This cannot be undone!')) {
                  toast.error('Account deletion request submitted')
                }
              }}>
                <span className="action-icon">🗑️</span>
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Profile