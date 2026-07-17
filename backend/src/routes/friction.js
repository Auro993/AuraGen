const express = require('express');
const router = express.Router();
const frictionController = require('../controllers/frictionController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/overview', frictionController.getOverview);
router.get('/trend', frictionController.getTrend);
router.get('/factors', frictionController.getFactors);
router.get('/events', frictionController.getEvents);
router.get('/recommendation', frictionController.getRecommendation);

module.exports = router;