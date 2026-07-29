// backend/src/routes/heatmapRoutes.js

const express = require('express');
const router = express.Router();
const heatmapController = require('../controllers/heatmapController');
const auth = require('../middleware/auth');

// All heatmap routes require authentication
router.use(auth);

router.get('/', heatmapController.getHeatmapData);

module.exports = router;