const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

// All dashboard routes require authentication
router.use(auth);

// Dashboard routes
router.get('/stats', dashboardController.getStats);
router.get('/chart', dashboardController.getChartData);
router.get('/sessions', dashboardController.getRecentSessions);
router.get('/timeline', dashboardController.getTimeline);
router.get('/logs', dashboardController.getLogs);

module.exports = router;