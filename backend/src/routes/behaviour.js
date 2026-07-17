const express = require('express');
const router = express.Router();
const behaviourController = require('../controllers/behaviourController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/kpi', behaviourController.getKPI);
router.get('/distribution', behaviourController.getDistribution);
router.get('/interaction-trend', behaviourController.getInteractionTrend);
router.get('/triggers', behaviourController.getTriggers);
router.get('/timeline', behaviourController.getTimeline);
router.get('/insight', behaviourController.getInsight);

module.exports = router;