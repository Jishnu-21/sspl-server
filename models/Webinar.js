const mongoose = require('mongoose');

const WebinarSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  job: { type: String },
  companyName: { type: String },
  city: { type: String },
  country: { type: String },
  workEmail: { type: String, required: true },
  phoneNo: { type: String },
  annualRevenue: { type: String },
  employees: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Webinar', WebinarSchema); 