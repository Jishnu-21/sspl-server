const express = require('express');
const router = express.Router();
const webinarController = require('../controllers/webinarController');

router.post('/api/webinar', webinarController.submitWebinar);
router.get('/api/webinars', webinarController.getAllWebinars);

module.exports = router; 