const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/blogs'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Public
router.get('/', blogController.getBlogs);
router.get('/:slug', blogController.getBlogBySlug);

// Admin
router.post('/', upload.single('coverImage'), blogController.createBlog);
router.put('/:slug', upload.single('coverImage'), blogController.updateBlog);
router.delete('/:slug', blogController.deleteBlog);

module.exports = router; 