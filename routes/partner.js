const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');

router.post('/api/partner', partnerController.submitPartner);
router.get('/api/partners', partnerController.getAllPartners);

module.exports = router; 