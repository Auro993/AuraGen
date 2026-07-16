const express = require('express')
const router = express.Router()
const Session = require('../models/Session')
const GeneratedComponent = require('../models/GeneratedComponent')

// Get overview stats
router.get('/overview', async (req, res) => {
  try {
    // In production, fetch from database
    // For now, return dummy data with real DB structure
    const totalSessions = await Session.countDocuments()
    const avgFriction = await Session.aggregate([
      { $group: { _id: null, avg: { $avg: '$frictionScore' } } }
    ])
    
    res.json({
      activeUsers: 1248,
      avgFriction: avgFriction[0]?.avg || 72,
      generatedUI: await GeneratedComponent.countDocuments(),
      successRate: 95,
      changes: {
        activeUsers: '+12%',
        avgFriction: '+8.5%',
        generatedUI: '+10.5%',
        successRate: '+10%'
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get friction trend
router.get('/friction-trend', async (req, res) => {
  try {
    // Return dummy data for now
    res.json({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [65, 72, 58, 82, 70, 45, 38]
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get behaviour data
router.get('/behaviour', async (req, res) => {
  try {
    res.json({
      labels: ['Mouse Movement', 'Wrong Clicks', 'Idle Time', 'Scroll Hesitation'],
      data: [40, 25, 20, 15],
      colors: ['#7C5CFF', '#EF4444', '#F59E0B', '#22C55E']
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get problematic pages
router.get('/problematic-pages', async (req, res) => {
  try {
    res.json([
      { page: 'Tax Form', views: 1248, friction: 89 },
      { page: 'Registration', views: 982, friction: 76 },
      { page: 'Profile Setup', views: 760, friction: 58 },
      { page: 'Payment', views: 642, friction: 81 },
      { page: 'Settings', views: 310, friction: 32 },
    ])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router