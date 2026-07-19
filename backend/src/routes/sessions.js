const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', sessionController.getAllSessions);
router.get('/stats', sessionController.getStats);
router.get('/:id', sessionController.getSessionById);

module.exports = router;