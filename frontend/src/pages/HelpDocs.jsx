// frontend/src/pages/HelpDocs.jsx

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Sidebar from '../components/Dashboard/Sidebar'
import './HelpDocs.css'

const HelpDocs = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('docs')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast.success(`Searching for: "${searchQuery}"`)
    } else {
      toast.error('Please enter a search term')
    }
  }

  const handleContactSupport = () => {
    toast.success('Opening support chat... 🎧')
    navigate('/contact')
  }

  const handleVisitCommunity = () => {
    toast.success('Redirecting to community... 👥')
  }

  const handleSubmitTicket = () => {
    toast.success('Opening ticket submission... 📩')
    navigate('/contact')
  }

  const handleViewStatus = () => {
    toast.info('Loading system status... 📊')
  }

  const handlePlayVideo = (title) => {
    toast.success(`Playing: ${title} 🎬`)
  }

  const handleArticleClick = (title) => {
    toast.info(`Loading article: ${title} 📄`)
  }

  const handleQuickLink = (label) => {
    toast.info(`Navigating to: ${label}`)
  }

  const handleGuideClick = (title) => {
    toast.info(`Opening guide: ${title}`)
  }

  const handleTagClick = (tag) => {
    setSearchQuery(tag)
    toast.info(`Searching for: ${tag}`)
  }

  const quickLinks = [
    { icon: '🚀', label: 'Getting Started' },
    { icon: '📹', label: 'Video Tutorials' },
    { icon: '🔗', label: 'API Documentation' },
    { icon: '📝', label: 'Release Notes' },
    { icon: '📊', label: 'System Status' },
  ]

  const guides = [
    {
      icon: '🚀',
      title: 'Getting Started',
      desc: 'Learn the basics of AuraGen and set up your first project.',
      btnText: 'Read Guide →'
    },
    {
      icon: '📊',
      title: 'Dashboard Overview',
      desc: 'Understand your dashboard and key metrics.',
      btnText: 'Read Guide →'
    },
    {
      icon: '🎯',
      title: 'Friction Engine',
      desc: 'Learn how friction is detected, calculated and visualized.',
      btnText: 'Read Guide →'
    },
    {
      icon: '🤖',
      title: 'AI Generator',
      desc: 'Generate simplified UIs using AI based on friction data.',
      btnText: 'Read Guide →'
    },
    {
      icon: '💻',
      title: 'API Documentation',
      desc: 'Integrate AuraGen with your apps using our API.',
      btnText: 'Read Docs →'
    },
  ]

  const articles = [
    {
      title: 'How AuraGen Detects User Friction',
      desc: 'Understand the signals and algorithms used to detect user struggle.',
      category: 'Friction Engine',
      icon: '📄'
    },
    {
      title: 'How AI Generates Simplified UI',
      desc: 'Step-by-step process of AI-powered UI generation.',
      category: 'AI Generator',
      icon: '📄'
    },
    {
      title: 'Comparing and Applying Generated UIs',
      desc: 'Learn how to compare versions and apply the best UI.',
      category: 'Generated UI',
      icon: '📄'
    },
    {
      title: 'Understanding Friction Scores',
      desc: 'What is a friction score and how is it calculated?',
      category: 'Friction Engine',
      icon: '📄'
    },
    {
      title: 'Connecting Google Analytics',
      desc: 'Track user behavior by integrating Google Analytics.',
      category: 'Integrations',
      icon: '📄'
    },
  ]

  const videos = [
    { title: 'Friction Engine Explained', duration: '5:24' },
    { title: 'AI Generator Deep Dive', duration: '8:15' },
    { title: 'UI Comparison Tool', duration: '6:47' },
  ]

  const whatsNew = [
    { title: 'Advanced AI Model Gemini 2.5', date: 'May 15, 2025', type: 'New' },
    { title: 'Improved Friction Engine Accuracy', date: 'May 12, 2025', type: 'New' },
    { title: 'UI Comparison Tool', date: 'May 10, 2025', type: 'New' },
  ]

  const popularTags = ['Getting Started', 'Dashboard', 'Friction Engine', 'AI Generator', 'API']

  return (
    <div className="docs-page">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="docs-main">
        {/* Header */}
        <div className="docs-header">
          <div>
            <h1 className="docs-title">📖 Help & Docs</h1>
            <p className="docs-subtitle">Find guides, documentation and support for AuraGen.</p>
          </div>
          <div className="docs-search-top">
            <input 
              type="text" 
              placeholder="🔍 Search documentation..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="docs-hero glass-card">
          <div className="docs-hero-left">
            <h2 className="docs-hero-title">How can we help you today?</h2>
            <p className="docs-hero-subtitle">Search documentation, tutorials and guides.</p>
            <form className="docs-hero-search" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="🔍 Search documentation, tutorials and guides..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn-primary">Search</button>
            </form>
            <div className="docs-hero-tags">
              {popularTags.map((tag, index) => (
                <span 
                  key={index} 
                  className="docs-hero-tag"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="docs-hero-right">
            <span className="docs-hero-icon">📖</span>
          </div>
        </div>

        {/* Quick Links + System Status */}
        <div className="docs-top-grid">
          <div className="docs-quick-links glass-card">
            <h3 className="docs-section-title">Quick Links</h3>
            <div className="docs-quick-links-grid">
              {quickLinks.map((link, index) => (
                <div 
                  key={index} 
                  className="docs-quick-link"
                  onClick={() => handleQuickLink(link.label)}
                >
                  <span className="docs-quick-icon">{link.icon}</span>
                  <span className="docs-quick-label">{link.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="docs-status glass-card">
            <h3 className="docs-section-title">System Status</h3>
            <div className="docs-status-content">
              <div className="docs-status-header">
                <span className="docs-status-dot">🟢</span>
                <span className="docs-status-text">All Systems Operational</span>
              </div>
              <span className="docs-status-time">Last updated: May 16, 2025 10:30 AM</span>
              <button 
                className="btn-secondary docs-status-btn" 
                onClick={handleViewStatus}
              >
                View Status Page
              </button>
            </div>
          </div>
        </div>

        {/* Guides */}
        <div className="docs-guides">
          <h3 className="docs-section-title">Guides & Documentation</h3>
          <div className="docs-guides-grid">
            {guides.map((guide, index) => (
              <div key={index} className="docs-guide-card glass-card">
                <span className="docs-guide-icon">{guide.icon}</span>
                <h4 className="docs-guide-title">{guide.title}</h4>
                <p className="docs-guide-desc">{guide.desc}</p>
                <button 
                  className="docs-guide-link"
                  onClick={() => handleGuideClick(guide.title)}
                >
                  {guide.btnText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Articles + Videos */}
        <div className="docs-middle-grid">
          <div className="docs-articles glass-card">
            <h3 className="docs-section-title">Popular Articles</h3>
            {articles.map((article, index) => (
              <div 
                key={index} 
                className="docs-article-item"
                onClick={() => handleArticleClick(article.title)}
              >
                <span className="docs-article-icon">{article.icon}</span>
                <div className="docs-article-content">
                  <span className="docs-article-title">{article.title}</span>
                  <span className="docs-article-desc">{article.desc}</span>
                  <span className="docs-article-category">{article.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="docs-videos glass-card">
            <h3 className="docs-section-title">Video Tutorials</h3>
            {videos.map((video, index) => (
              <div 
                key={index} 
                className="docs-video-item"
                onClick={() => handlePlayVideo(video.title)}
              >
                <div className="docs-video-thumb">
                  <span className="docs-video-play">▶</span>
                </div>
                <div className="docs-video-info">
                  <span className="docs-video-title">{video.title}</span>
                  <span className="docs-video-duration">{video.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support + What's New */}
        <div className="docs-bottom-grid">
          <div className="docs-support glass-card">
            <h3 className="docs-section-title">Contact Support</h3>
            <p className="docs-support-text">Can't find what you're looking for? We're here to help!</p>
            <div className="docs-support-actions">
              <button className="btn-primary" onClick={handleContactSupport}>
                Contact Support
              </button>
              <span className="docs-support-email">support@auragen.ai</span>
            </div>
          </div>

          <div className="docs-whatsnew glass-card">
            <h3 className="docs-section-title">What's New</h3>
            {whatsNew.map((item, index) => (
              <div key={index} className="docs-whatsnew-item">
                <span className="docs-whatsnew-badge">{item.type}</span>
                <span className="docs-whatsnew-title">{item.title}</span>
                <span className="docs-whatsnew-date">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="docs-cta glass-card">
          <h3 className="docs-cta-title">Still Need Help?</h3>
          <div className="docs-cta-buttons">
            <button className="btn-primary" onClick={handleVisitCommunity}>
              👥 Visit Community
            </button>
            <button className="btn-secondary" onClick={handleContactSupport}>
              🎧 Contact Support
            </button>
            <button className="btn-secondary" onClick={handleSubmitTicket}>
              📩 Submit a Ticket
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HelpDocs