const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads/banners directory exists
const uploadDir = path.join(__dirname, '../uploads/banners');
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

// Upload or update a banner
router.post('/upload', upload.single('image'), bannerController.uploadBanner);

// Get a banner by key
router.get('/:key', bannerController.getBanner);

module.exports = router; 