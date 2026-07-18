const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

// All analytics routes require authentication
router.use(auth);

// Get overview stats
router.get('/overview', analyticsController.getOverview);

// Get friction trend data
router.get('/friction-trend', analyticsController.getFrictionTrend);

// Get friction sources
router.get('/friction-sources', analyticsController.getFrictionSources);

// Get problematic pages
router.get('/problematic-pages', analyticsController.getProblematicPages);

// Get recent sessions
router.get('/sessions', analyticsController.getSessions);

// Get AI performance
router.get('/ai-performance', analyticsController.getAIPerformance);

// Get AI stats
router.get('/ai-stats', analyticsController.getAIStats);

module.exports = router;