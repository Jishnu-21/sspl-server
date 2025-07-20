const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');
const { getAllContacts } = require('../controllers/contactController');

router.post('/api/contact', submitContact);
router.get('/api/contacts', getAllContacts);

module.exports = router; 