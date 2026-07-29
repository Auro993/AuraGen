// backend/src/routes/dashboard.js

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

// All dashboard routes require authentication
router.use(auth);

router.get('/stats', dashboardController.getStats);
router.get('/chart', dashboardController.getChartData);
router.get('/sessions', dashboardController.getRecentSessions);
router.get('/timeline', dashboardController.getTimeline);
router.get('/logs', dashboardController.getLogs);
// ✅ NEW: Heatmap route
router.get('/heatmap', dashboardController.getHeatmap);

module.exports = router;