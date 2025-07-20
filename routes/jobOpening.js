const express = require('express');
const router = express.Router();
const jobOpeningController = require('../controllers/jobOpeningController');

// Get all job openings
router.get('/', jobOpeningController.getJobOpenings);

// Get a single job opening by slug
router.get('/slug/:slug', jobOpeningController.getJobOpeningBySlug);

// Get a single job opening by ID
router.get('/:id', jobOpeningController.getJobOpeningById);

// Create a new job opening
router.post('/', jobOpeningController.createJobOpening);

// Delete a job opening
router.delete('/:id', jobOpeningController.deleteJobOpening);

// Update a job opening
router.put('/:id', jobOpeningController.updateJobOpening);

module.exports = router;