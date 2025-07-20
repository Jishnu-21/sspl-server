const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  position: { type: String }, // Job title or jobId
  resumeUrl: { type: String }, // Path to uploaded file
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Career', CareerSchema); 