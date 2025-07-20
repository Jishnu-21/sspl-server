const mongoose = require('mongoose');

const JobOpeningSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  location: { type: String },
  requirements: [{ type: String }],
  contactEmail: { type: String },
  contactPhone: { type: String },
  benefits: [{ type: String }],
  whoWeAre: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('JobOpening', JobOpeningSchema); 