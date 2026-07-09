const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Get analytics data
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find()
      .sort({ createdAt: -1 })
      .limit(100);

    const totalSessions = await Session.countDocuments();
    const avgFriction = await Session.aggregate([
      { $group: { _id: null, avg: { $avg: '$frictionScore' } } }
    ]);

    res.json({
      totalSessions,
      avgFriction: avgFriction[0]?.avg || 0,
      recentSessions: sessions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get friction data
router.get('/friction', async (req, res) => {
  try {
    const data = await Session.find()
      .select('frictionScore metrics createdAt')
      .sort({ createdAt: -1 })
      .limit(30);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;