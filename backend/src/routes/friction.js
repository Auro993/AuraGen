const express = require('express');
const router = express.Router();
const frictionController = require('../controllers/frictionController');
const auth = require('../middleware/auth');

// All friction routes require authentication
router.use(auth);

router.get('/overview', frictionController.getOverview);
router.get('/trend', frictionController.getTrend);
router.get('/factors', frictionController.getFactors);
router.get('/events', frictionController.getEvents);
router.get('/recommendation', frictionController.getRecommendation);
router.get('/current', frictionController.getCurrentScore);
router.post('/calculate', frictionController.calculateFriction);

module.exports = router;