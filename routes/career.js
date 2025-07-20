const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads/resumes directory exists
const uploadDir = path.join(__dirname, '../uploads/resumes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Get all career submissions
router.get('/', careerController.getCareers);

// Create a new career submission (with file upload and job title/position)
router.post('/', upload.single('resume'), careerController.createCareer);

module.exports = router; 