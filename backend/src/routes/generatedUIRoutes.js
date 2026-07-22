const express = require('express');
const router = express.Router();
const generatedUIController = require('../controllers/generatedUIController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', generatedUIController.getAll);
router.get('/latest', generatedUIController.getLatest);
router.get('/stats', generatedUIController.getStats);
router.get('/:id', generatedUIController.getById);
router.post('/apply/:id', generatedUIController.apply);

module.exports = router;