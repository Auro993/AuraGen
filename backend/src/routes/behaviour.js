const express = require('express');
const router = express.Router();
const behaviourController = require('../controllers/behaviourController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// ============ EXISTING ROUTES ============
router.get('/kpi', behaviourController.getKPI);
router.get('/distribution', behaviourController.getDistribution);
router.get('/interaction-trend', behaviourController.getInteractionTrend);
router.get('/triggers', behaviourController.getTriggers);
router.get('/timeline', behaviourController.getTimeline);
router.get('/insight', behaviourController.getInsight);
router.get('/heatmap', behaviourController.getHeatmap);

// ============ NEW ROUTES FOR DEMO PORTAL ============
// Track behaviour from Demo Portal
router.post('/track', behaviourController.trackBehaviour);

// Get all behaviour records
router.get('/all', behaviourController.getAllBehaviour);

// Get behaviour summary
router.get('/summary', behaviourController.getBehaviourSummary);

// Get behaviour by session ID
router.get('/session/:sessionId', behaviourController.getBehaviourBySession);

// Get friction by session ID
router.get('/friction/:sessionId', behaviourController.getFrictionBySession);

module.exports = router;