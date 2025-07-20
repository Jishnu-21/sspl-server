const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g. 'home', 'about', 'careers'
  mediaUrl: { type: String, required: true }, // path to uploaded file (image or video)
  fileType: { type: String, required: false }, // MIME type of the file (optional)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Banner', BannerSchema); 