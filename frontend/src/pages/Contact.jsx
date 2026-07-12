import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import toast from 'react-hot-toast'
import './Contact.css'

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Thank you for your message! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  const contactInfo = [
    { icon: '📧', title: 'Email', detail: 'hello@auragen.ai' },
    { icon: '📍', title: 'Location', detail: 'San Francisco, CA' },
    { icon: '📱', title: 'Phone', detail: '+1 (555) 123-4567' },
    { icon: '🐦', title: 'Twitter', detail: '@AuraGenAI' },
  ]

  return (
    <div className="page contact-page">
      <Navbar />
      
      <div className="contact-hero">
        <div className="container">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">Have questions? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-wrapper">
          {/* Contact Info */}
          <div className="contact-info-section glass-card">
            <h2 className="contact-info-title">📬 Contact Information</h2>
            <p className="contact-info-desc">
              Feel free to reach out to us anytime. We'll get back to you as soon as possible.
            </p>
            
            <div className="contact-info-grid">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-info-item">
                  <span className="contact-info-icon">{item.icon}</span>
                  <div className="contact-info-detail">
                    <span className="contact-info-label">{item.title}</span>
                    <span className="contact-info-value">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-social">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">📸</a>
                <a href="#" className="social-icon">💼</a>
                <a href="#" className="social-icon">📺</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form-section glass-card" onSubmit={handleSubmit}>
            <h2 className="contact-form-title">✉️ Send us a message</h2>
            
            <div className="contact-form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                id="name"
                type="text" 
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                id="subject"
                type="text" 
                placeholder="Enter subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message"
                rows="5"
                placeholder="Tell us what you're thinking..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-primary contact-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact