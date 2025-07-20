const Partner = require('../models/Partner');

exports.submitPartner = async (req, res) => {
  try {
    const { fullName, phone, email, message, partnerType } = req.body;
    if (!fullName || !phone || !email || !message || !partnerType) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const partner = new Partner({ fullName, phone, email, message, partnerType });
    await partner.save();
    res.status(201).json({ message: 'Partner form submitted successfully.' });
  } catch (err) {
    console.error('Error saving partner:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (err) {
    console.error('Error fetching partners:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}; 