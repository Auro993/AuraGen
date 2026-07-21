const express = require('express');
const router = express.Router();
const aiGeneratorController = require('../controllers/aiGeneratorController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/generate', aiGeneratorController.generateUI);
router.get('/generated', aiGeneratorController.getGeneratedUIs);
router.get('/stats', aiGeneratorController.getStats);
router.get('/:id', aiGeneratorController.getGeneratedUI);
router.post('/apply/:id', aiGeneratorController.applyUI);

module.exports = router;